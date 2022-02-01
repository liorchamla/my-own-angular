import { ComponentMetadata } from "../types";

export const Component = (metadata: ComponentMetadata) => {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      static selector = metadata.selector;
      static providers = metadata.providers;

      private proceedInterpolations(template: string) {
        const interpolations = template.match(/\{\{(.+?)\}\}/g);

        interpolations.forEach((variable) => {
          const name = variable.match(/\{\{(.+?)\}\}/)[1].trim();

          template = template.replace(variable, this[name]);
        });

        return template;
      }

      render() {
        let template = metadata.template;

        this["element"].innerHTML = this.proceedInterpolations(template);
      }

      init() {
        if (super["init"]) {
          super["init"]();
        }

        this.render();
      }
    };
  };
};
