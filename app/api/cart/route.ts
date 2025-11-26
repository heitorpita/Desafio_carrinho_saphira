import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies(); 
    const token = cookieStore.get("cart_token")?.value;

    if (!token) {
      return NextResponse.json({ cart: null });
    }

    const cart = await prisma.cart.findUnique({
      where: { token },
      include: {
        items: { include: { product: true } },
      },
    });

    return NextResponse.json(cart || { cart: null });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erro ao buscar carrinho" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { productId, quantity } = await request.json();

    const cookieStore = await cookies();
    let token = cookieStore.get("cart_token")?.value;

    if (!token) {
      token = crypto.randomUUID();

      const res = NextResponse.json({ created: true });

      res.cookies.set("cart_token", token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });

      await prisma.cart.create({
        data: {
          token,
          subtotal: 0,
          total: 0,
        },
      });

      return res;
    }

    // Item existente?
    const existingItem = await prisma.cartItem.findFirst({
      where: { cart: { token }, productId },
    });

    const cartItem = existingItem
      ? await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + quantity },
        })
      : await prisma.cartItem.create({
          data: {
            cart: { connect: { token } },
            product: { connect: { id: productId } },
            quantity,
          },
        });

    // Atualiza subtotal e total
    const cart = await prisma.cart.findUnique({
      where: { token },
      include: { items: { include: { product: true } } },
    });

    const subtotal = cart!.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    await prisma.cart.update({
      where: { token },
      data: { subtotal, total: subtotal },
    });

    return NextResponse.json(cartItem);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Erro ao adicionar item ao carrinho" },
      { status: 500 }
    );
  }
}
