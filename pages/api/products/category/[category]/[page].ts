import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, category as categoryType } from '@prisma/client'
import { CardItemProps } from "@/components/views/CardView";
import { GetProductPictureURL } from "@/components/views/ProductView";

function GetProductsByCategory(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient()
    const { category, page } = req.query

    async function query() {
        return prisma.product.findMany({
            where: {
                category: category as categoryType
            },
            skip: 20 * (parseInt(page as string) - 1),
            take: 20
        })
    }

    query()
        .then(async products => {
            await prisma.$disconnect()
            res.status(200).json(products.map(value => {
                const formattedValue: CardItemProps = {
                    id: value.id,
                    image: GetProductPictureURL(value.id, 0),
                    price: value.price.toNumber(),
                    title: value.name,
                    rarity: value.rarity,
                    colors: value.colors
                }
                return formattedValue
            }))
            res.end()
        })
        .catch(async error => {
            await prisma.$disconnect()
            res.status(500).json([])
            res.end()
        })
}

export default GetProductsByCategory
