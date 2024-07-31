export type ObjectFields = {
  [key: string]: string | number | boolean | null | undefined;
};

export const getFieldsWithValidValues = <T extends ObjectFields>(
  objectFields: T,
  removeField: string,
): Partial<Record<keyof T, string | number | boolean>> => {
  return Object.fromEntries(
    Object.entries(objectFields).filter(([field, value]) => !!value && field !== removeField),
  ) as Partial<Record<keyof T, string | number | boolean>>;
};
