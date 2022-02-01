import { CreditCardDirective } from "./directives/credit-card.directive";
import { PhoneNumberDirective } from "./directives/phone-number.directive";
import { Framework } from "./framework";
import { NumberFormatter } from "./services/number-formatter";

const declarations = [CreditCardDirective, PhoneNumberDirective];
const providers = [
  {
    provide: "formatter",
    factory: () => {
      return new NumberFormatter();
    },
  },
];

const app = new Framework(declarations, providers);

app.bootstrap();
