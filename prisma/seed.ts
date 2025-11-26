import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
});
  const productsData: Prisma.ProductCreateInput[] = [
    {
      name: 'Tênis Esportivo',
      price: 299.90,
      image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
    },
    {
      name: 'Fone Bluetooth',
      price: 159.00,
      image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    },
    {
      name: 'Relógio Smart',
      price: 899.00,
      image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    },
    {
      name: 'Mochila Tech',
      price: 249.50,
      image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
    },
    {
      name: 'Óculos de Sol',
      price: 129.90,
      image_url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80',
    },
    {
      name: 'Câmera Retro',
      price: 1200.00,
      image_url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80',
    }
  ]

 export async function main() {
  for (const p of productsData) {
    await prisma.product.create({ data: p });
  }
}

main();