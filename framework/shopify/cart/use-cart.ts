import { useApiProvider } from "@common";
import useCart, {UseCart} from "@common/cart/use-cart";
import {
    checkoutToCart,
    createCheckout,
    getCheckoutQuery} from "@framework/utils";
import {Checkout, CheckoutLineItemsAddPayload} from "@framework/schema";
import {useMemo} from "react";
import {Cart} from "@common/types/cart";
import {SWRHook} from "@common/types/hooks";
import Cookies from "js-cookie";


export type UseCartHookDescriptor = {
    fetcherInput :{
        checkoutId:string
    }
    fetcherOutput: {
        node: Checkout
    }
    data: Cart
}

export default useCart as UseCart<typeof handler>



export const handler: SWRHook<UseCartHookDescriptor>= {
    fetcherOptions: {
        //get checkout query
        query: getCheckoutQuery
    },
    async fetcher({
                      fetch,
                      options,
                      input: {checkoutId}
    }) {

        let checkout: Checkout;

        if(checkoutId) {
            const {data} = await fetch({
                ...options,
                variables:{
                    checkoutId
                }
            })
            checkout = data.node;
        }else {
            checkout = await createCheckout(fetch as any);
        }

        const cart = checkoutToCart(checkout);
        //Normalize checkout
        return cart;
    },
    useHook:({useData}) => () => {
        const {checkoutCookie} = useApiProvider();
        let result = useData({
            swrOptions:{
                revalidateOnFocus: false
            }
        })

        if(result.data?.completedAt){
            Cookies.remove(checkoutCookie);
        }

        return useMemo(()=> {
            return {
                ...result,
                isEmpty : (result?.data?.lineItems.length ?? 0) <= 0
            }
        }, [result, result.data?.completedAt])
    }
}
