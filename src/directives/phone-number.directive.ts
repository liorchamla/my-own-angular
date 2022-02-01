import { Directive } from "../decorators/directive";
import { HostListener } from "../decorators/host-listener";
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

  @HostListener("input")
  formatValue() {
    this.element.value = this.formatter.format(
      this.element.value,
      10,
      2,
      this.withSpaces
    );
  }

  constructor(
    private element: HTMLInputElement,
    private formatter: NumberFormatter
  ) {}
}
