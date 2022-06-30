import {ApiConfig} from "@common/types/api";
import {Product} from "@common/types/product";
import getAllProductPathQuery from "@framework/utils/queries/get-all-products-paths";
import {ProductConnection} from "@framework/schema";

type ReturnType = {
    products: Pick<Product, "slug">[]
}

const getAllProductsPaths = async (config: ApiConfig): Promise<ReturnType> => {
    const {data} = await config.fetch<{products:ProductConnection}>(
        {
            query:getAllProductPathQuery
        });
    const products = data.products.edges.map(({node:{handle}})=> {
        return {
            slug:handle
        }
    })
    return {products}
}

export default getAllProductsPaths;

