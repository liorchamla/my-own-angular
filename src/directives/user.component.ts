import { Directive } from "../decorators/directive";
import { Input } from "../decorators/input";

@Directive({
  selector: "user",
})
export class UserComponent {
  @Input("full-name")
  fullName: string;

  @Input()
  age: number;

  @Input()
  position: string;

  constructor(private element: HTMLElement) {}

  render() {
    this.element.innerHTML = `
              <article>
                  <h2>${this.fullName} (${this.age} ans)</h2>
                  <strong>Poste : ${this.position}</strong>
              </article>
          `;

    this.element.querySelector("article").addEventListener("click", () => {
      this.age++;

      this.render();
    });
  }

  init() {
    this.render();
  }
}
