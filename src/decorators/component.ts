import { ComponentMetadata } from "../types";

export const Component = (metadata: ComponentMetadata) => {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    constructor["selector"] = metadata.selector;
    constructor["providers"] = metadata.providers || [];

    constructor.prototype.proceedInterpolations = function (template: string) {
      const interpolations = template.match(/\{\{(.+?)\}\}/g);

      interpolations.forEach((variable) => {
        const name = variable.match(/\{\{(.+?)\}\}/)[1].trim();

        template = template.replace(variable, this[name]);
      });

      return template;
    };

    constructor.prototype.createEventBindings = function (
      template: string,
      listeners: any[]
    ) {
      const bindings = template.match(/(<.+\((.+?)\)="(.+?)".+)/g);

      if (bindings) {
        bindings.forEach((binding) => {
          const [str, start, event, method] = binding.match(
            /(<.+[ ])\((.+?)\)="(.+?)\(\)".+?/
          );
          const id = "binding-" + Math.ceil(Math.random() * Date.now());
          const finalMarkup = str.replace(start, start + ` id="${id}"`);
          template = template.replace(str, finalMarkup);
          listeners.push({
            id,
            event,
            method,
          });
        });
      }

      return template;
    };

    constructor.prototype.render = function () {
      let template = metadata.template;

      template = this.proceedInterpolations(template);

      const listeners = [];

      this["element"].innerHTML = this.createEventBindings(template, listeners);

      listeners.forEach((listener) => {
        this["element"]
          .querySelector("#" + listener.id)
          .addEventListener(listener.event, () => {
            this[listener.method]();
          });
      });
    };

    return constructor;
  };
};
