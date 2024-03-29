import styles from "@/styles/Purchase.module.css"
import Link from "next/link"
import Image from "next/image"
import HeaderUser from "./HeaderUser"

import { yoruka } from "@/types/fonts"

interface Params {
    subtitle?: string
}

function Header({ subtitle }: Params) {
    return (
        <div className={styles["container"]}>
            <div className={styles["title"]}>
                <Link href={"/"} className={styles.headerTitle}>
                    <Image src={"/megami.svg"} alt={""} width={90} height={65} />
                </Link>
                <p className={yoruka.className}>MegamiShop</p>
                <span className={styles["subtitle"]}>{subtitle}</span>
            </div>
            <div>
                <HeaderUser />
            </div>
        </div>
    )
}

export default Header
