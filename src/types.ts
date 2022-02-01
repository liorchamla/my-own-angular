export type Provider = {
  provide: string;
  factory: Function;
};

export type Providers = Provider[];

export type FramewokMetadata = {
  declarations: any[];
  providers?: Providers;
};

export type DirectiveMetadata = {
  selector: string;
  providers?: Providers;
};
