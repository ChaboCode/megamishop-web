import styles from "@/styles/ProductList.module.css"
import ProductCard from "@/components/checkout/ProductCard";
import { useEffect, useState } from "react";
import { ICart } from "@/interfaces/cart";
import { useSession } from "next-auth/react";

import getConfig from "next/config"
const { publicRuntimeConfig } = getConfig()
const { MINIO_ENDPOINT } = publicRuntimeConfig

interface PremadeParams {
    list: JSX.Element
}

// FIXME: It should be PreviewProductList, not PremadeProductList
export function PremadeProductList({ list }: PremadeParams) {
    return (
        <div className={`${styles['container']} ${styles['premade']}`}>
            {list}
        </div>
    )
}

function ProductList() {
    const { data: session } = useSession()
    const [cart, setCart] = useState<ICart>()
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const uid = session?.user.id
        if (uid == undefined) {
            setLoading(false)
            return
        }
        fetch(`/api/user/cart/`)
            .then(res => res.json())
            .then(res => {
                setCart(res)
                setLoading(false)
            })
    }, [session?.user.id])

    let list: JSX.Element
    if (isLoading) {
        list = <span>Loading cart...</span>
    } else {
        list = <>{cart?.products.map(product => {
            const { productID: id, title, price, quantity } = product
            return <ProductCard key={id} picture={`http://${MINIO_ENDPOINT}/web/${id}_0.png`} productID={id} title={title}
                price={price} quantity={quantity} />
        })}</>
    }

    return (
        <div className={styles['container']}>
            {list}
        </div>
    )
}

export default ProductList
