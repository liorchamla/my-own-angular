export const Input = (attrName: string = "") => {
  return function (decoratedClass, propertyKey) {
    const originalInit: Function = decoratedClass["init"] || function () {};

    const decoratedInit = function () {
      if (!attrName) {
        attrName = propertyKey;
      }

      if (this.element.hasAttribute(`[${attrName}]`)) {
        this[propertyKey] = eval(this.element.getAttribute(`[${attrName}]`));
      } else if (this.element.hasAttribute(attrName)) {
        this[propertyKey] = this.element.getAttribute(attrName);
      }

      originalInit.call(this);
    };

    decoratedClass["init"] = decoratedInit;
  };
};
