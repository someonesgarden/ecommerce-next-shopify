import {ReactNode} from "react";
import {
    ApiProvider as CoreApiProvider,
    useApiProvider as useCoreApiProvider
} from "@common";

import {shopifyHooks} from "@framework/hooks";
import {getConfig} from "./api/config";
const config = getConfig();

console.log("getConfig",config);

interface ShopifyApiProviderProps {
    children: ReactNode | ReactNode[]
}

export const ApiProvider = ({children}:ShopifyApiProviderProps) => {

 return (
     <CoreApiProvider
         config={{...config}}
         hooks={shopifyHooks}>
         {children}
     </CoreApiProvider>
 )
}

export const useApiProvider =()=> useCoreApiProvider()
