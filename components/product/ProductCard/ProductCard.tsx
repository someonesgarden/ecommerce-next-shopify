import {Product} from "@common/types/product";
import Link from "next/link";
import Image from "next/image";
import s from "./ProductCard.module.scss";
import {FC} from "react";

interface Props {
    product: Product
    variant?: "simple" | "slim"
}

const placeholiderImage = "/product-image-placeholder.svg";
const ProductCard: FC<Props> = ({product, variant = "simple"}) => {


    return (
        <Link href={`/products/${product.slug}`}>
            <a className={s.root}>
                {
                    variant === "slim" ?
                       <>
                           <div className="inset-0 flex items-center justify-center absolute z-20">
                               <span className="bg-black text-white p-3 font-bold text-xl">
                                   {product.name}
                               </span>
                           </div>
                           {
                               product.images && (
                                   <Image
                                       className={s.productImage}
                                       alt={product.name ?? "Product Image"}
                                       src={product.images[0].url ?? placeholiderImage}
                                       height={320}
                                       width={320}
                                       quality="85"
                                       layout="fixed"
                                   />
                               )
                           }
                       </> :
                        (
                            <>
                                <div className={s.productBg}/>
                                <div className={s.productTag}>
                                    <h3 className={s.productTitle}>
                                        <span>{product?.name}</span>
                                    </h3>
                                    <span className={s.productPrice}>
                        {product.price.value} {product.price.currencyCode}
                    </span>
                                </div>
                                {
                                    product.images && (
                                        <Image
                                            className={s.productImage}
                                            alt={product.name ?? "Product Image"}
                                            src={product.images[0].url ?? placeholiderImage}
                                            height={540}
                                            width={540}
                                            quality="85"
                                            layout="responsive"
                                        />
                                    )
                                }
                            </>
                        )
                }

            </a>
        </Link>

    )
}


export default ProductCard;
