import { db } from '@/lib/prisma'

export async function GET() {
  const banners = await db.banner.findMany({})
  return Response.json(banners, {
    status: 200,
  })
}
