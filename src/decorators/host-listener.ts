export const HostListener = (eventName: string) => {
  return (decoratedClass, propertyKey) => {
    const originalInit: Function = decoratedClass["init"] || function () {};

    const decoratedMethod = decoratedClass[propertyKey];

    const decoratedInit = function () {
      this.element.addEventListener(eventName, (eventDetails) => {
        decoratedMethod.call(this, eventDetails);
      });

      originalInit.call(this);
    };

    decoratedClass["init"] = decoratedInit;
  };
};
