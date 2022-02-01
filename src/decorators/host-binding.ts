import { Detector, Observer } from "../change-detection";

export const HostBinding = (attrName: string) => {
  return function (decoratedClass, propertyKey) {
    const originalInit: Function = decoratedClass["init"] || function () {};

    const decoratedInit = function () {
      this.element.setAttribute(attrName, this[propertyKey]);

      Detector.addObserver(new Observer(this, propertyKey, attrName));

      originalInit.call(this);
    };

    decoratedClass["init"] = decoratedInit;
  };
};
