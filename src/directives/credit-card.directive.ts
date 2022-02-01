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

  constructor(private formatter: NumberFormatter) {}

  @HostListener("input")
  formatValue(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    target.value = this.formatter.format(target.value, 16, 4, this.withSpaces);
  }
}
