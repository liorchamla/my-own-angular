import { Directive } from "../decorators/directive";
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
        10,
        2,
        this.withSpaces
      );
    });
  }
}
