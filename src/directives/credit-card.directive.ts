import { NumberFormatter } from "../services/number-formatter";

export class CreditCardDirective {
  static selector = "[credit-card]";
  static providers = [
    {
      provide: "formatter",
      factory: () => {
        return new NumberFormatter();
      },
    },
  ];

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
