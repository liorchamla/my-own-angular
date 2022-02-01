import { Directive } from "../decorators/directive";
import { Input } from "../decorators/input";
import { NumberFormatter } from "../services/number-formatter";

@Directive({
  selector: "[phone-number]",
  providers: [
    {
      provide: "formatter",
      factory: () => {
        return new NumberFormatter();
      },
    },
  ],
})
export class PhoneNumberDirective {
  @Input("with-spaces")
  withSpaces = true;

  constructor(
    private element: HTMLInputElement,
    private formatter: NumberFormatter
  ) {}

  init() {
    this.element.addEventListener("input", () => {
      this.element.value = this.formatter.format(
        this.element.value,
        10,
        2,
        this.withSpaces
      );
    });
  }
}
