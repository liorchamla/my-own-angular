import { CreditCardDirective } from "./directives/credit-card.directive";
import { PhoneNumberDirective } from "./directives/phone-number.directive";
import { Framework } from "./framework";
import { NumberFormatter } from "./services/number-formatter";

const app = new Framework();

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
