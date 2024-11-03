import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: 'Caixa Eu Te Amo',
        description: 'Gift box with a "I Love You" design.',
        category: 'Gift',
        retailPrice: new Prisma.Decimal(20.99),
        wholesalePrice: new Prisma.Decimal(13.99),
        minQuantity: 5,
        imageUrl:
          'https://rpe3c59juxn54zf2.public.blob.vercel-storage.com/Caixa eu te amo-1730479989702-307Y7RWu3ET3IoveI9NUTdF7VsGrou.png',
        status: true,
        CreatedAt: new Date(),
      },
      {
        name: 'Copo Stanley Rosa',
        description: 'Pink Stanley cup with high durability.',
        category: 'Drinkware',
        retailPrice: new Prisma.Decimal(34.99),
        wholesalePrice: new Prisma.Decimal(24.99),
        minQuantity: 5,
        imageUrl:
          'https://rpe3c59juxn54zf2.public.blob.vercel-storage.com/Copo stanely rosa-1729636033892-6MGcPwe1k8nOzZWueqnkTZWrmtPw0R.png',
        status: true,
        CreatedAt: new Date(),
      },
      {
        name: 'Placa de Pix Personalizada',
        description: 'Custom Pix plaque for easy payment display.',
        category: 'Customizable',
        retailPrice: new Prisma.Decimal(18.99),
        wholesalePrice: new Prisma.Decimal(12.99),
        minQuantity: 10,
        imageUrl:
          'https://rpe3c59juxn54zf2.public.blob.vercel-storage.com/Placa de Pix Personalizada-1730480013089-N14FgGH3JiLzwV2qrZDvexSW9v3ufo.png',
        status: true,
        CreatedAt: new Date(),
      },
      {
        name: 'Troféu',
        description: 'Customized trophy for events and awards.',
        category: 'Awards',
        retailPrice: new Prisma.Decimal(25.99),
        wholesalePrice: new Prisma.Decimal(17.99),
        minQuantity: 3,
        imageUrl:
          'https://rpe3c59juxn54zf2.public.blob.vercel-storage.com/Trofeu-FR90lDYMV7ZcmsYfFafYD1nY1WRe4g.png',
        status: true,
        CreatedAt: new Date(),
      },
      {
        name: 'Caixa Meus Lacinhos',
        description: 'Box for organizing bows and small items.',
        category: 'Organization',
        retailPrice: new Prisma.Decimal(15.49),
        wholesalePrice: new Prisma.Decimal(10.49),
        minQuantity: 10,
        imageUrl:
          'https://rpe3c59juxn54zf2.public.blob.vercel-storage.com/caixa meus lacinhos-XxYF7RqnSh2QvrNsucl1XOlBWDrBh5.png',
        status: true,
        CreatedAt: new Date(),
      },
      {
        name: 'Chaveiro Personalizado',
        description: 'Custom keychain with unique designs.',
        category: 'Accessories',
        retailPrice: new Prisma.Decimal(8.99),
        wholesalePrice: new Prisma.Decimal(5.99),
        minQuantity: 15,
        imageUrl:
          'https://rpe3c59juxn54zf2.public.blob.vercel-storage.com/chaveiro-BoJ4ZSwpg7KBITIodM1CZdPq36K1qy.png',
        status: true,
        CreatedAt: new Date(),
      },
      {
        name: 'Gravação em Copo',
        description: 'Custom engraving on glass cups.',
        category: 'Customizable',
        retailPrice: new Prisma.Decimal(12.99),
        wholesalePrice: new Prisma.Decimal(8.99),
        minQuantity: 8,
        imageUrl:
          'https://rpe3c59juxn54zf2.public.blob.vercel-storage.com/gravação em copo-tf4MtyAboaRiD3C2vyERP8gnuR8vtz.png',
        status: true,
        CreatedAt: new Date(),
      },
      {
        name: 'Lembrancinha Feliz Dia das Mães',
        description: 'Mother’s Day souvenir with custom text.',
        category: 'Gifts',
        retailPrice: new Prisma.Decimal(5.99),
        wholesalePrice: new Prisma.Decimal(3.99),
        minQuantity: 20,
        imageUrl:
          'https://rpe3c59juxn54zf2.public.blob.vercel-storage.com/lemb feliz dia das maes-tAkqayXx4Rl5QGBdonmr5sifT1zguM.png',
        status: true,
        CreatedAt: new Date(),
      },
      {
        name: 'Lembrancinha São Cosme',
        description: 'Souvenir with a design celebrating Saint Cosme.',
        category: 'Religious',
        retailPrice: new Prisma.Decimal(6.99),
        wholesalePrice: new Prisma.Decimal(4.99),
        minQuantity: 15,
        imageUrl:
          'https://rpe3c59juxn54zf2.public.blob.vercel-storage.com/lembSaoCosmo-IOv9VPHbqlvLhufswlhHqpP2Ehc42O.png',
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
