export class Observer {
  constructor(
    public instance: any,
    public propertyKey: string,
    public attrName: string
  ) {}
}

type Observers = Observer[];

class ChangeDetector {
  observers: Observers = [];

  addObserver(observer: Observer) {
    this.observers.push(observer);
  }

  digest() {
    this.observers.forEach((observer) => {
      const element = observer.instance.element as HTMLElement;
      const value = observer.instance[observer.propertyKey];
      element[observer.attrName] = value;
    });
  }
}

export const Detector = new ChangeDetector();
