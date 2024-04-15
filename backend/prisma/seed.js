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

const roles = [
    { roleName: 'Administrador'}, //Ver y editar todo
    { roleName: 'Inventario' }, //Ver y editar inventario
    { roleName: 'Cocina' }, //Ver comandas e inventario, ver y editar platillos
    { roleName: 'Servicio' }, //Ver y editar comandas
    { roleName: 'Contabilidad' }, //Ver y editar compras
    { roleName: 'Recursos humanos' }, //Ver y editar empleados
]

const permisos = [
    { action: 'VER', area: 'COMANDAS' },
    { action: 'EDITAR', area: 'COMANDAS' },
    { action: 'VER', area: 'EMPLEADOS' },
    { action: 'EDITAR', area: 'EMPLEADOS' },
    { action: 'VER', area: 'PRODUCTOS' },
    { action: 'EDITAR', area: 'PRODUCTOS' },
    { action: 'VER', area: 'PLATILLOS' },
    { action: 'EDITAR', area: 'PLATILLOS' },
    { action: 'VER', area: 'COMPRAS' },
    { action: 'EDITAR', area: 'COMPRAS' },
    { action: 'VER', area: 'USUARIOS' },
    { action: 'EDITAR', area: 'USUARIOS' },
]

const permisosEnRoles = [
    { roleId: 2, permitId:  1 },
    { roleId: 2, permitId:  2 },
    { roleId: 2, permitId:  3 },
    { roleId: 2, permitId:  4 },
    { roleId: 2, permitId:  5 },
    { roleId: 2, permitId:  6 },
    { roleId: 2, permitId:  7 },
    { roleId: 2, permitId:  8 },
    { roleId: 2, permitId:  9 },
    { roleId: 2, permitId:  10 },
    { roleId: 2, permitId:  11 },
    { roleId: 2, permitId:  12 },
    { roleId: 3, permitId:  5 },
    { roleId: 3, permitId:  6 },
    { roleId: 4, permitId:  1 },
    { roleId: 4, permitId:  5 },
    { roleId: 4, permitId:  7 },
    { roleId: 4, permitId:  8 },
    { roleId: 5, permitId:  1 },
    { roleId: 5, permitId:  2 },
    { roleId: 6, permitId:  9 },
    { roleId: 6, permitId:  10 },
    { roleId: 7, permitId:  11 },
    { roleId: 7, permitId:  12 },
]
async function main() {
    // const categoryImages = await prisma.imagenes.createMany({
    //     data: catImages
    // })
    // await prisma.roles.createMany({
    //     data: roles
    // })

    // await prisma.permits.createMany({
    //     data: permisos
    // })

//     await prisma.permitsInRole.createMany({
//         data: permisosEnRoles
//     })
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