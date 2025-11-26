import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;  // <-- OBRIGATÓRIO
    const itemId = Number(id);

    if (isNaN(itemId)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      );
    }

    const item = await prisma.cartItem.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      return NextResponse.json(
        { error: 'Item não encontrado no carrinho' },
        { status: 404 }
      );
    }

    await prisma.cartItem.delete({
      where: { id: itemId },
    });

    return NextResponse.json({ message: 'Item removido com sucesso' });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erro ao remover item do carrinho' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const itemId = Number(id);

  try {
    const item = await prisma.cartItem.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      return NextResponse.json(
        { error: "Item não encontrado" },
        { status: 404 }
      );
    }

    const updated = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity: item.quantity + 1 },
    });

    return NextResponse.json(updated);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Erro ao atualizar quantidade" },
      { status: 500 }
    );
  }
}