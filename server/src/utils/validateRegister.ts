import { UserInputs } from "../resolvers/UserInputs";

export const validateRegister = (options: UserInputs) => {
  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "invalid email",
      },
    ];
  }

  if (options.username.length <= 2) {
    return [
      {
        field: "username",
        message: "length must be greater than 2",
      },
    ];
  }
  if (options.password.length <= 5) {
    return [
      {
        field: "password",
        message: "length must be greater than 5",
      },
    ];
  }

  return null;
};
