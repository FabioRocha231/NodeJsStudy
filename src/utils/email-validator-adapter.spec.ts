import { EmailValidatorAdapter } from "./email-validator";
import validator from "validator";
import isEmail from "validator/lib/isEmail";

jest.mock("validator", () => ({
  isEmail(): boolean {
    return true;
  },
}));

describe("EmailValidator Adapter", () => {
  test("Should returrn false if validator returns false", () => {
    const sut = new EmailValidatorAdapter();
    jest.spyOn(validator, "isEmail").mockReturnValueOnce(false);
    const isValid = sut.isValid("invalid_email@mail.com");
    expect(isValid).toBe(false);
  });

  test("Should returrn true if validator returns true", () => {
    const sut = new EmailValidatorAdapter();
    const isValid = sut.isValid("valid_email@mail.com");
    expect(isValid).toBe(true);
  });

  test("Should call validator with correct email", () => {
    const sut = new EmailValidatorAdapter();
    const isEmailSpy = jest.spyOn(validator, "isEmail");
    sut.isValid("any_email@mail.com");
    expect(isEmailSpy).toHaveBeenCalledWith("any_email@mail.com");
  });
});
