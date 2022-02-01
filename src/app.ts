import { CreditCardDirective } from "./directives/credit-card.directive";
import { PhoneNumberDirective } from "./directives/phone-number.directive";

document.querySelectorAll("[phone-number]").forEach((element) => {
  const instance = new PhoneNumberDirective(element as HTMLInputElement);
  instance.init();
});

document.querySelectorAll("[credit-card]").forEach((element) => {
  const instance = new CreditCardDirective(element as HTMLInputElement);
  instance.init();
});
