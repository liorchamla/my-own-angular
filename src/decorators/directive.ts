import { DirectiveMetadata } from "../types";

export const Directive = (metadata: DirectiveMetadata) => {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    constructor["selector"] = metadata.selector;
    constructor["providers"] = metadata.providers || [];

    return constructor;
  };
};
