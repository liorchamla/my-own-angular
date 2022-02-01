export class PhoneNumberDirective {
  withSpaces = true;

  constructor(private element: HTMLInputElement) {}

  init() {
    let withSpacesAttr = this.element.getAttribute("with-spaces") || "true";
    this.withSpaces = withSpacesAttr === "true";

    this.element.addEventListener("input", () => {
      let value = this.element.value;
      value = value.replace(/[^\d+]/g, "").substring(0, 10);

      const numbersGroups = [];

      for (let i = 0; i < value.length; i += 2) {
        numbersGroups.push(value.substring(i, i + 2));
      }

      this.element.value = numbersGroups.join(this.withSpaces ? " " : "");
    });
  }
}
