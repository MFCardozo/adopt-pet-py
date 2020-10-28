export const validateAnimalPost = (options: any) => {
  let errorArray = [];
  for (let inputName in options) {
    if (inputName !== "description" && inputName !== "age") {
      if (options[inputName] === "") {
        errorArray.push({
          field: inputName,
          message: "field required.",
        });
      }
    }
  }
  if (errorArray.length > 0) {
    return errorArray;
  }

  return null;
};
