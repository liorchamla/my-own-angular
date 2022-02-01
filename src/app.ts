import { CreditCardDirective } from "./directives/credit-card.directive";
import { PhoneNumberDirective } from "./directives/phone-number.directive";

const declarations = [CreditCardDirective, PhoneNumberDirective];

declarations.forEach((directive) => {
  const selector = directive.selector;

  document.querySelectorAll(selector).forEach((element) => {
    const instance = new directive(element as HTMLInputElement);
    instance.init();
  });
});
