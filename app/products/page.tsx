import prisma from "@/lib/prisma";
import HomeClient from "./HomeClient";

export default async function ProdutosPage() {
  const products = await prisma.product.findMany();

  return <HomeClient products={products} />;
}
