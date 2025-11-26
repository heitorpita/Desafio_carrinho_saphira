"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function CartPage() {
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Carregar o carrinho ao abrir a página
  useEffect(() => {
    async function loadCart() {
      try {
        const res = await axios.get("/api/cart");
        setCart(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadCart();
  }, []);

  // Recalcular subtotal e total sempre que os items mudarem
  useEffect(() => {
    if (!cart) return;

    let subtotal = 0;
    cart.items.forEach((item: any) => {
      subtotal += item.product.price * item.quantity;
    });

    const total = subtotal;

    setCart((prev: any) => ({
      ...prev,
      subtotal,
      total,
    }));
  }, [cart?.items]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-black"></div>
      </div>
    );
  }

  if (!cart || !cart.items?.length) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-2xl font-bold mb-4">Seu carrinho está vazio 😢</h1>
        <a
          href="/products"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Voltar para os produtos
        </a>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Seu Carrinho</h1>

      <div className="space-y-4">
        {cart.items.map((item: any) => (
          <div
            key={item.id}
            className="flex items-center justify-between border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <div>
              <h2 className="font-semibold text-lg">{item.product.name}</h2>
              <p className="text-gray-600">
                Preço:{" "}
                <span className="font-medium">
                  R$ {item.product.price.toFixed(2)}
                </span>
              </p>
              <p className="text-gray-600">
                Quantidade:{" "}
                <span className="font-medium">{item.quantity}</span>
              </p>
            </div>

            <div className="flex gap-3">
              {/* Botão Remover */}
              <button
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
                onClick={async () => {
                  await axios.delete(`/api/cart/${item.id}`);
                  setCart({
                    ...cart,
                    items: cart.items.filter((i: any) => i.id !== item.id),
                  });
                }}
              >
                Remover
              </button>

              {/* Botão Aumentar */}
              <button
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm"
                onClick={async () => {
                  await axios.patch(`/api/cart/${item.id}`);

                  setCart({
                    ...cart,
                    items: cart.items.map((i: any) =>
                      i.id === item.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                    ),
                  });
                }}
              >
                +
              </button>

             
              <button
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm"
                onClick={async () => {
                  if (item.quantity > 1) {
                    await axios.patch(`/api/cart/${item.id}?action=decrease`);

                    setCart({
                      ...cart,
                      items: cart.items.map((i: any) =>
                        i.id === item.id
                          ? { ...i, quantity: i.quantity - 1 }
                          : i
                      ),
                    });
                  }
                }}
              >
                -
              </button>
            
            </div>
          </div>
        ))}
      </div>

      {/* Totais */}
      <div className="border-t mt-6 pt-4">
        <div className="flex justify-between text-lg mb-2">
          <span>Subtotal:</span>
          <span className="font-medium">R$ {cart.subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-2xl font-bold">
          <span>Total:</span>
          <span>R$ {cart.total.toFixed(2)}</span>
        </div>
      </div>

      <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg font-bold">
        Finalizar Compra
      </button>
      <a
          href="/products"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Voltar para os produtos
        </a>
    </div>
    
  );
}
