import { FieldError } from "../generated/graphql";

export const toErrorObj = (errors: FieldError[]) => {
  const errorObj: Record<string, string> = {};

  errors.forEach(({ field, message }) => {
    errorObj[field] = message;
  });
  return errorObj;
};
