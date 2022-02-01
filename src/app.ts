import { CreditCardDirective } from "./directives/credit-card.directive";
import { PhoneNumberDirective } from "./directives/phone-number.directive";
import { NumberFormatter } from "./services/number-formatter";

const declarations = [CreditCardDirective, PhoneNumberDirective];

function getDirectiveParamsNames(directive): string[] {
  // First match everything inside the function argument parens.
  const hasConstructor = directive.toString().match(/constructor\((.+)\)\s*\{/);

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

function getParamsForDirectiveConstructor(directive, element) {
  const params = [];

  const paramNames = getDirectiveParamsNames(directive);

  paramNames.forEach((paramName) => {
    if (paramName === "element") {
      params.push(element);
      return;
    }

    const provider = directive.providers.find((p) => p.provide === paramName);

    if (!provider) {
      throw new Error(`Aucun fournisseur pour le service "${paramName}" !`);
    }

    const service = provider.factory();
    params.push(service);
  });

  return params;
}

declarations.forEach((directive) => {
  const selector = directive.selector;

  document.querySelectorAll(selector).forEach((element) => {
    const params = getParamsForDirectiveConstructor(directive, element);

    const instance = Reflect.construct(directive, params);
    instance.init();
  });
});
