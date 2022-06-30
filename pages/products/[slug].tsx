
import {Layout} from "@components/common";
import {getConfig} from "@framework/api/config";
import {GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType} from "next";
import {getProduct, getAllProductsPaths} from "@framework/product";
import {ProductView} from "@components/product";


//fetch all of the prodcuts slugs
export const getStaticPaths: GetStaticPaths= async ()=> {
    const config = getConfig();
    const {products} = await getAllProductsPaths(config);
    return {
        paths: products.map(p=>({params:{slug: p.slug}})),
        fallback:false
    }
}

//prodvide
export const getStaticProps = async ({params}: GetStaticPropsContext<{slug:string}>)=> {
    const config = getConfig();

    const {product} = await getProduct({
        config,
        variables:{slug:params?.slug}
    });

    return {
        props:{
            product
        }
    }
}


export default function ProductSlug(
    {product}:InferGetStaticPropsType<typeof getStaticProps>
){

    return (
            <>
                {product && <ProductView product={product} />}
            </>
    )
}

ProductSlug.Layout = Layout;
