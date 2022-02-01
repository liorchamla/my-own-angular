export const HostBinding = (attrName: string) => {
  return function (decoratedClass, propertyKey) {
    const originalInit: Function = decoratedClass["init"] || function () {};

    const decoratedInit = function () {
      this.element.setAttribute(attrName, this[propertyKey]);

      originalInit.call(this);
    };

    decoratedClass["init"] = decoratedInit;
  };
};
