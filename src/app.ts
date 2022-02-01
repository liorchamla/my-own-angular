import { CreditCardDirective } from "./directives/credit-card.directive";
import { PhoneNumberDirective } from "./directives/phone-number.directive";
import { UserComponent } from "./directives/user.component";
import { Framework } from "./framework";
import { NumberFormatter } from "./services/number-formatter";
import { FrameworkZone } from "./zone";

const app = new Framework();

FrameworkZone.run(() => {
  app.bootstrap({
    declarations: [CreditCardDirective, PhoneNumberDirective, UserComponent],
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
