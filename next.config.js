const {withFrameworkConfig} = require("./framework/common/config");
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = withFrameworkConfig({
        framework: {
            name: process.env.NEXT_PUBLIC_FRAMEWORK
        },
        i18n: {
            locales: ['ja-JP', "en-US"],
            defaultLocale: 'ja-JP'
        },
        sassOptions: {
            includePaths: [path.join(__dirname, 'styles')],
        },
        trailingSlash: true,

    },
)

module.exports = nextConfig


console.log("next.config.js", JSON.stringify(module.exports, null, 2));



