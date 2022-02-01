import { CreditCardDirective } from "./directives/credit-card.directive";
import { PhoneNumberDirective } from "./directives/phone-number.directive";
import { UserComponent } from "./directives/user.component";
import { Angular, Framework } from "./framework";
import { NumberFormatter } from "./services/number-formatter";
import { FrameworkZone } from "./zone";

FrameworkZone.run(() => {
  Angular.bootstrap({
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
