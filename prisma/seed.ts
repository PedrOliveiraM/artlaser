import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.product.createMany({
    data: [
      {
        id: 1,
        name: 'Wireless Bluetooth Earbuds',
        description: 'Compact wireless earbuds with high-quality sound.',
        category: 'Electronics',
        retailPrice: new Prisma.Decimal(49.99),
        wholesalePrice: new Prisma.Decimal(29.99),
        minQuantity: 5,
        imageUrl:
          'https://rpe3c59juxn54zf2.public.blob.vercel-storage.com/Captura%20de%20tela%202024-10-30%20152923-DNdky9CS2wOESlp8z1f7bCn3gqjkLv.png',
        status: true,
        CreatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Eco-friendly Water Bottle',
        description: 'Reusable water bottle made from sustainable materials.',
        category: 'Lifestyle',
        retailPrice: new Prisma.Decimal(24.99),
        wholesalePrice: new Prisma.Decimal(15.99),
        minQuantity: 10,
        imageUrl:
          'https://rpe3c59juxn54zf2.public.blob.vercel-storage.com/Captura%20de%20tela%202024-10-30%20153122-Yjo4Bbch92yLAMw8IbWYm4jADeEXmT.png',
        status: true,
        CreatedAt: new Date(),
      },
      {
        id: 3,
        name: 'Gaming Mouse',
        description: 'Ergonomic gaming mouse with customizable DPI settings.',
        category: 'Electronics',
        retailPrice: new Prisma.Decimal(59.99),
        wholesalePrice: new Prisma.Decimal(39.99),
        minQuantity: 3,
        imageUrl:
          'https://rpe3c59juxn54zf2.public.blob.vercel-storage.com/Captura%20de%20tela%202024-10-30%20153122-Yjo4Bbch92yLAMw8IbWYm4jADeEXmT.png',
        status: true,
        CreatedAt: new Date(),
      },
      {
        id: 4,
        name: 'Yoga Mat',
        description: 'Non-slip yoga mat for safe and comfortable workouts.',
        category: 'Fitness',
        retailPrice: new Prisma.Decimal(35.99),
        wholesalePrice: new Prisma.Decimal(22.99),
        minQuantity: 8,
        imageUrl:
          'https://rpe3c59juxn54zf2.public.blob.vercel-storage.com/Captura%20de%20tela%202024-10-30%20153618-yO6BufRdHMGRtEOSF8RzbPVPSu9fw7.png',
        status: true,
        CreatedAt: new Date(),
      },
      {
        id: 5,
        name: 'LED Desk Lamp',
        description: 'Adjustable LED lamp with three brightness settings.',
        category: 'Home',
        retailPrice: new Prisma.Decimal(29.99),
        wholesalePrice: new Prisma.Decimal(18.99),
        minQuantity: 4,
        imageUrl:
          'https://rpe3c59juxn54zf2.public.blob.vercel-storage.com/Copo%20stanely%20rosa-1729636033892-6MGcPwe1k8nOzZWueqnkTZWrmtPw0R.png',
        status: true,
        CreatedAt: new Date(),
      },
      {
        id: 6,
        name: 'Smartphone Stand',
        description:
          'Durable stand for holding smartphones at an ideal viewing angle.',
        category: 'Accessories',
        retailPrice: new Prisma.Decimal(14.99),
        wholesalePrice: new Prisma.Decimal(9.99),
        minQuantity: 12,
        imageUrl:
          'https://rpe3c59juxn54zf2.public.blob.vercel-storage.com/Captura%20de%20tela%202024-10-30%20153618-yO6BufRdHMGRtEOSF8RzbPVPSu9fw7.png',
        status: true,
        CreatedAt: new Date(),
      },
      {
        id: 7,
        name: 'Portable Charger',
        description: 'High-capacity power bank for charging devices on the go.',
        category: 'Electronics',
        retailPrice: new Prisma.Decimal(39.99),
        wholesalePrice: new Prisma.Decimal(25.99),
        minQuantity: 6,
        imageUrl:
          'https://rpe3c59juxn54zf2.public.blob.vercel-storage.com/Captura%20de%20tela%202024-10-30%20153618-yO6BufRdHMGRtEOSF8RzbPVPSu9fw7.png',
        status: true,
        CreatedAt: new Date(),
      },
      {
        id: 8,
        name: 'Ceramic Coffee Mug',
        description: '12 oz ceramic mug with a modern design.',
        category: 'Kitchen',
        retailPrice: new Prisma.Decimal(12.99),
        wholesalePrice: new Prisma.Decimal(6.99),
        minQuantity: 15,
        imageUrl:
          'https://rpe3c59juxn54zf2.public.blob.vercel-storage.com/Copo%20stanely%20rosa-1729636033892-6MGcPwe1k8nOzZWueqnkTZWrmtPw0R.png',
        status: true,
        CreatedAt: new Date(),
      },
      {
        id: 9,
        name: 'Wireless Keyboard',
        description: 'Compact wireless keyboard for easy typing on any device.',
        category: 'Electronics',
        retailPrice: new Prisma.Decimal(45.99),
        wholesalePrice: new Prisma.Decimal(28.99),
        minQuantity: 7,
        imageUrl:
          'https://rpe3c59juxn54zf2.public.blob.vercel-storage.com/Copo%20stanely%20rosa-1729636033892-6MGcPwe1k8nOzZWueqnkTZWrmtPw0R.png',
        status: true,
        CreatedAt: new Date(),
      },
      {
        id: 10,
        name: 'Running Shoes',
        description:
          'Lightweight and comfortable running shoes for all terrains.',
        category: 'Footwear',
        retailPrice: new Prisma.Decimal(74.99),
        wholesalePrice: new Prisma.Decimal(49.99),
        minQuantity: 4,
        imageUrl:
          'https://rpe3c59juxn54zf2.public.blob.vercel-storage.com/Copo%20stanely%20rosa-1729636033892-6MGcPwe1k8nOzZWueqnkTZWrmtPw0R.png',
        status: true,
        CreatedAt: new Date(),
      },
      {
        id: 11,
        name: 'Wireless Bluetooth Earbuds',
        description: 'Compact wireless earbuds with high-quality sound.',
        category: 'Electronics',
        retailPrice: new Prisma.Decimal(49.99),
        wholesalePrice: new Prisma.Decimal(29.99),
        minQuantity: 5,
        imageUrl:
          'https://rpe3c59juxn54zf2.public.blob.vercel-storage.com/Captura%20de%20tela%202024-10-30%20152923-DNdky9CS2wOESlp8z1f7bCn3gqjkLv.png',
        status: true,
        CreatedAt: new Date(),
      },
      {
        id: 12,
        name: 'Eco-friendly Water Bottle',
        description: 'Reusable water bottle made from sustainable materials.',
        category: 'Lifestyle',
        retailPrice: new Prisma.Decimal(24.99),
        wholesalePrice: new Prisma.Decimal(15.99),
        minQuantity: 10,
        imageUrl:
          'https://rpe3c59juxn54zf2.public.blob.vercel-storage.com/Captura%20de%20tela%202024-10-30%20153122-Yjo4Bbch92yLAMw8IbWYm4jADeEXmT.png',
        status: true,
        CreatedAt: new Date(),
      },
      {
        id: 13,
        name: 'Gaming Mouse',
        description: 'Ergonomic gaming mouse with customizable DPI settings.',
        category: 'Electronics',
        retailPrice: new Prisma.Decimal(59.99),
        wholesalePrice: new Prisma.Decimal(39.99),
        minQuantity: 3,
        imageUrl:
          'https://rpe3c59juxn54zf2.public.blob.vercel-storage.com/Captura%20de%20tela%202024-10-30%20153122-Yjo4Bbch92yLAMw8IbWYm4jADeEXmT.png',
        status: true,
        CreatedAt: new Date(),
      },
      {
        id: 14,
        name: 'Yoga Mat',
        description: 'Non-slip yoga mat for safe and comfortable workouts.',
        category: 'Fitness',
        retailPrice: new Prisma.Decimal(35.99),
        wholesalePrice: new Prisma.Decimal(22.99),
        minQuantity: 8,
        imageUrl:
          'https://rpe3c59juxn54zf2.public.blob.vercel-storage.com/Captura%20de%20tela%202024-10-30%20153618-yO6BufRdHMGRtEOSF8RzbPVPSu9fw7.png',
        status: true,
        CreatedAt: new Date(),
      },
    ],
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
