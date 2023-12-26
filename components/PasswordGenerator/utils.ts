import { object, number, boolean, InferType } from "yup";

type Password = InferType<typeof PasswordSchema>;

export const PasswordSchema = object().shape({
  passwordLength: number()
    .min(6, "should be at least 6 characters long")
    .max(16, "should be at most 16 characters long")
    .required("Length is required"),
  isUpperCase: boolean().default(false),
  isLowerCase: boolean().default(true),
  isSymbols: boolean().default(false),
  isNumbers: boolean().default(false),
});

const createPassword = (characters: string, length: number): string => {
  let output = "";
  for (let index = 0; index < length; index++) {
    const charIndex = Math.floor(Math.random() * characters.length);
    const char = characters[charIndex];
    output += char;
  }

  return output;
};

export const generatePasswordString = ({
  isLowerCase,
  isNumbers,
  isSymbols,
  isUpperCase,
  passwordLength,
}: Password): string => {
  let passwordString = "";

  const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+";

  if (isUpperCase === true) {
    passwordString += upperCaseChars;
  }
  if (isLowerCase === true) {
    passwordString += lowerCaseChars;
  }
  if (isNumbers === true) {
    passwordString += numbers;
  }
  if (isSymbols === true) {
    passwordString += symbols;
  }

  const generatedPassword = createPassword(passwordString, passwordLength);
  return generatedPassword;
};
