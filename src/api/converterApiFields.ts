export type TApiBoolean = 1 | 0;

export const converterString = (value: string | null) => value || undefined;

export const converterBoolean = (value: TApiBoolean) => Boolean(value);
