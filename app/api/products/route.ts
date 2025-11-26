import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 });
  }
}
