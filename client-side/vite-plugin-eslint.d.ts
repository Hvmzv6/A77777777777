declare module "vite-plugin-eslint" {
  import { Plugin } from "vite";

  interface ESLintPluginOptions {
    emitWarning?: boolean;
    emitError?: boolean;
  }

  function eslint(options?: ESLintPluginOptions): Plugin;

  export default eslint;
}
