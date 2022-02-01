import { CreditCardDirective } from "./directives/credit-card.directive";
import { PhoneNumberDirective } from "./directives/phone-number.directive";
import { NumberFormatter } from "./services/number-formatter";

const declarations = [CreditCardDirective, PhoneNumberDirective];

declarations.forEach((directive) => {
  const selector = directive.selector;

  document.querySelectorAll(selector).forEach((element) => {
    const formatter = new NumberFormatter();

    const instance = new directive(element as HTMLInputElement, formatter);
    instance.init();
  });
});
