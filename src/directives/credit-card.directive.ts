import { Directive } from "../decorators/directive";
import { NumberFormatter } from "../services/number-formatter";

@Directive({
  selector: "[credit-card]",
})
export class CreditCardDirective {
  withSpaces = true;
  constructor(
    private element: HTMLInputElement,
    private formatter: NumberFormatter
  ) {}

  init() {
    let withSpacesAttr = this.element.getAttribute("with-spaces") || "true";
    this.withSpaces = withSpacesAttr === "true";

    this.element.addEventListener("input", () => {
      this.element.value = this.formatter.format(
        this.element.value,
        16,
        4,
        this.withSpaces
      );
    });
  }
}
