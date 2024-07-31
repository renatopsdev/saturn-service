export const getFieldsWithValidValues = (
  objectFields: { [key: string]: string | number | boolean },
  removeField: string,
): { [key: string]: string | number | boolean } => {
  return Object.fromEntries(Object.entries(objectFields).filter(([field, value]) => !!value && field !== removeField));
};
