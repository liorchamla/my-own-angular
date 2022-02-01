export class CreditCardDirective {
  static selector = "[credit-card]";

  withSpaces = true;
  constructor(private element: HTMLInputElement) {}

  init() {
    let withSpacesAttr = this.element.getAttribute("with-spaces") || "true";
    this.withSpaces = withSpacesAttr === "true";

    this.element.addEventListener("input", () => {
      let value = this.element.value;
      value = value.replace(/[^\d+]/g, "").substring(0, 16);

      const numbersGroups = [];

      for (let i = 0; i < value.length; i += 4) {
        numbersGroups.push(value.substring(i, i + 4));
      }

      this.element.value = numbersGroups.join(this.withSpaces ? " " : "");
    });
  }
}
