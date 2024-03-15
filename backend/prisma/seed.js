const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const catImages = [
    { tipo: 'image/png', url: 'Burger.png' },
    { tipo: 'image/png', url: 'Coffee.png' },
    { tipo: 'image/png', url: 'Taco.png' },
    { tipo: 'image/png', url: 'Pizza.png' },
    { tipo: 'image/png', url: 'Soda.png' },
    { tipo: 'image/png', url: 'Sandwich.png' },
]
async function main() {
    const categoryImages = await prisma.imagenes.createMany({
        data: catImages
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