import { Detector } from "./change-detection";
import { FramewokMetadata, Providers } from "./types";

export class Framework {
  declarations: any[] = [];
  providers: Providers = [];
  instances: any[] = [];

  digest() {
    Detector.digest();
    this.instances.forEach((instance) => {
      if (instance["render"]) {
        instance["render"]();
      }
    });
  }

  bootstrap(frameworkMetadata: FramewokMetadata) {
    this.declarations = frameworkMetadata.declarations;
    this.providers = frameworkMetadata.providers || [];

    this.declarations.forEach((directive) => {
      const selector = directive.selector;

      document.querySelectorAll(selector).forEach((element) => {
        const params = this.getParamsForDirectiveConstructor(
          directive,
          element
        );

        const instance = Reflect.construct(directive, params);

        this.instances.push(instance);

        instance.element = element;

        if (instance.init) {
          instance.init();
        }

        if (instance.render) {
          instance.render();
        }
      });
    });
  }

  getDirectiveParamsNames(directive): string[] {
    // First match everything inside the function argument parens.
    const hasConstructor = directive
      .toString()
      .match(/constructor\((.+)\)\s*\{/);

    if (!hasConstructor) {
      return [];
    }

    const args = directive.toString().match(/constructor\((.+)\)\s*\{/)[1];

    // Split the arguments string into an array comma delimited.
    return args
      .split(",")
      .map((arg) => {
        // Ensure no inline comments are parsed and trim the whitespace.
        return arg.replace(/\/\*.*\*\//, "").trim();
      })
      .filter((arg) => {
        // Ensure no undefined values are added.
        return arg;
      });
  }

  getParamsForDirectiveConstructor(directive, element) {
    const params = [];

    const paramNames = this.getDirectiveParamsNames(directive);

    paramNames.forEach((paramName) => {
      if (paramName === "element") {
        params.push(element);
        return;
      }

      const provider = directive.providers.find((p) => p.provide === paramName);

      if (provider) {
        const service = provider.factory();
        params.push(service);
        return;
      }

      const globalProvider = this.providers.find(
        (p) => p.provide === paramName
      );

      if (globalProvider) {
        const service = globalProvider.factory();
        params.push(service);
        return;
      }

      throw new Error(`Aucun fournisseur pour le service "${paramName}" !`);
    });

    return params;
  }
}

export const Angular = new Framework();
