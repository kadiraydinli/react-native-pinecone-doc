import * as path from "path";
import FaviconsWebpackPlugin from "favicons-webpack-plugin";

const PUBLIC = path.resolve(__dirname, "public");
const SRC = path.resolve(__dirname, "src");

/*
console.log("laaaaaa",PUBLIC);


const modifyBundlerConfig = (config) => {
  /* config.resolve.alias = Object.assign({}, config.resolve.alias, {
    "@fonts": `${PUBLIC}/fonts`,
    "@images": `${PUBLIC}/images`,
    "@components": `${SRC}/theme/components`,
    "@styles": `${SRC}/theme/styles`,
  }); */

  /*config.plugins.push(
    new FaviconsWebpackPlugin({
      logo: `${PUBLIC}/favicon.ico`,
      inject: true,
    })
  );

  return config;
};*/

export default {
  title: "React Native Pinecone",
  description: "Cross Platform React Native UI Toolkit",
  dest: "./docs",
  base: "/react-native-pinecone",
  public: "./public",
  indexHtml: "public/index.html",
  htmlContext: {
    favicon: "/public/images/pinecone.ico",
  },
  //modifyBundlerConfig,
  menu: [
    "Getting Started",
    {
      name: "Components",
      menu: ["Avatar", "Badge"],
    },
  ],
  onCreateWebpackChain: (config) => {
    config.resolve.alias
      .set("@fonts", `${PUBLIC}/fonts`)
      .set("@images", `${PUBLIC}/images`);

    return config;
  },
};