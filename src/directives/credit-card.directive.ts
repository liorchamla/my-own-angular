import { Directive } from "../decorators/directive";
import { HostListener } from "../decorators/host-listener";
import { Input } from "../decorators/input";
import { NumberFormatter } from "../services/number-formatter";

@Directive({
  selector: "[credit-card]",
})
export class CreditCardDirective {
  @Input("with-spaces")
  withSpaces = true;

  constructor(
    private element: HTMLInputElement,
    private formatter: NumberFormatter
  ) {}

  @HostListener("input")
  formatValue() {
    this.element.value = this.formatter.format(
      this.element.value,
      16,
      4,
      this.withSpaces
    );
  }
}
