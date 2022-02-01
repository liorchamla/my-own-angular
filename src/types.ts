export type Provider = {
  provide: string;
  factory: Function;
};

export type Providers = Provider[];

export type FramewokMetadata = {
  declarations: any[];
  providers?: Providers;
};

export interface DirectiveMetadata {
  selector: string;
  providers?: Providers;
}

export interface ComponentMetadata extends DirectiveMetadata {
  template: string;
}
