export interface FormatNumberOptions {
  providedOptions: Omit<Intl.NumberFormatOptions, "style"> & {
    locale?: string;
  };
}

export interface ParseNumberOptions {
  locale?: string;
  maximumFractionDigits: number;
}
