export const normalizeData = <T extends Record<string, any>>(data: T[], normalizedKey: keyof T) =>
  data.reduce((acc, entity) => {
    const value = entity[normalizedKey];
    acc[value] = entity;

    return acc;
  }, {} as Record<string | number, T>);
