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
          'https://rpe3c59juxn54zf2.public.blob.vercel-storage.com/caixa%20eu%20te%20amo-zPWG7EVNyAIGlL0otCwrvdjV9gOElY.png',
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
          'https://rpe3c59juxn54zf2.public.blob.vercel-storage.com/CopoStanley-85rMlNRh1cfMbkJW8PeDx4t7y4Ue4O.png',
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
          'https://rpe3c59juxn54zf2.public.blob.vercel-storage.com/plaquinha%20de%20pix-2AvU6cnwLH1d8UYJRDCf99CZIJ4RwF.png',
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
          'https://rpe3c59juxn54zf2.public.blob.vercel-storage.com/Trofeu-kh0Mgkp9Go2Nt02PYFDqsA7TnwEz7L.png',
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
          'https://rpe3c59juxn54zf2.public.blob.vercel-storage.com/caixa%20meus%20lacinhos-xwNg6c48JznU4L6xu7JGDUdRdmr5lO.png',
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
          'https://rpe3c59juxn54zf2.public.blob.vercel-storage.com/chaveiro-oonmvh8zbEHws4JB0UISc31Zj8lLq3.png',
        status: true,
        CreatedAt: new Date(),
      },
      {
        name: 'Chaveiro Personalizado De Almofada',
        description: 'Custom keychain with unique designs.',
        category: 'Accessories',
        retailPrice: new Prisma.Decimal(8.99),
        wholesalePrice: new Prisma.Decimal(5.99),
        minQuantity: 15,
        imageUrl:
          'https://rpe3c59juxn54zf2.public.blob.vercel-storage.com/chaveiros%20amofada-urEMfHEOemlkdX9VXBYqVKUlzT38QB.png',
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
          'https://rpe3c59juxn54zf2.public.blob.vercel-storage.com/lemb%20feliz%20dia%20das%20maes-4u12hxqyWN1MPmOblnkQMWrUrpAM4t.png',
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
          'https://rpe3c59juxn54zf2.public.blob.vercel-storage.com/lembSaoCosmo-T6TQtrkw6hKDAXlAfzx9VvWJbvXWGR.png',
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
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
