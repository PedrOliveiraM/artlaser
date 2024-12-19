import { db } from '@/lib/prisma'

export async function GET() {
  const categories = await db.product.findMany({
    select: { category: true },
    distinct: ['category'],
    orderBy: { category: 'asc' },
  })

  const categoryNames = categories.map(category => category.category)

  return Response.json(categoryNames, {
    status: 200,
  })
}
