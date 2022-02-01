import { Component } from "../decorators/component";
import { Directive } from "../decorators/directive";
import { Input } from "../decorators/input";

@Component({
  selector: "user",
  template: `
    <article>
      <h2>{{ fullName }} ({{ age }} ans)</h2>
      <strong>Poste : {{ position }}</strong>
    </article>
  `,
})
export class UserComponent {
  @Input("full-name")
  fullName: string;

  @Input()
  age: number;

  @Input()
  position: string;

  constructor(private element: HTMLElement) {}
}
