import { db } from '@/lib/prisma'

// routes/products/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = parseInt(params.id)

  const product = await db.product.findUnique({
    where: { id }, // Ajuste a condição conforme necessário
  })

  if (!product) {
    return new Response('Produto não encontrado', { status: 404 })
  }

  return Response.json(product, { status: 200 })
}
