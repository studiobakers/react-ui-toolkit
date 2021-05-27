export type FormatNumberOptions = Omit<Intl.NumberFormatOptions, "style"> & {
  locale?: string;
};

export interface ParseNumberOptions {
  locale?: string;
  maximumFractionDigits: number;
}
