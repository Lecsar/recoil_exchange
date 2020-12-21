export const getKeys = <T extends Record<string, any>>(obj: T): (keyof T)[] => Object.keys(obj);
