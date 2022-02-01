import { CreditCardDirective } from "./directives/credit-card.directive";
import { PhoneNumberDirective } from "./directives/phone-number.directive";
import { Framework } from "./framework";
import { NumberFormatter } from "./services/number-formatter";
import { FrameworkZone } from "./zone";

const app = new Framework();

FrameworkZone.run(() => {
  app.bootstrap({
    declarations: [CreditCardDirective, PhoneNumberDirective],
    providers: [
      {
        provide: "formatter",
        factory: () => {
          return new NumberFormatter();
        },
      },
    ],
  });
});
