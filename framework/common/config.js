
const path = require("path");
const fs = require("fs");
const merge = require("deepmerge");
const prettier = require("prettier");

const ALLOWED_FW = ["shopify", "shopify_local",　"bigcommerce"];
const FALLBACK_FW = "shopify";

function withFrameworkConfig(defaultConfig={}){
     let framework = defaultConfig?.framework?.name;

    if(!framework) {
        throw new Error("The api framework is missing, please add a valid provider!");
    }

    if(!ALLOWED_FW.includes(framework)){
        throw new Error(`The api framework:${framework} is not alloed`);
    }

    if(framework === "shopify_local") {
        framework = FALLBACK_FW; //shopify
    }

    const frameworkNextConfig = require(path.join("../",framework,"next.config"));
    const config = merge(defaultConfig, frameworkNextConfig);

    //const tsConfig = require(path.join(process.cwd(), "tsconfig.json"));

    const tsPath = path.join(process.cwd(), "tsconfig.json");
    const tsConfig = require(tsPath);

    tsConfig.compilerOptions.paths["@framework"] = [`framework/${framework}`];
    tsConfig.compilerOptions.paths["@framework/*"] = [`framework/${framework}/*`];

    fs.writeFileSync(
        tsPath,
        prettier.format(
            JSON.stringify(tsConfig), {parser: "json"}
        )
    )

    return config
}


module.exports = {withFrameworkConfig}
