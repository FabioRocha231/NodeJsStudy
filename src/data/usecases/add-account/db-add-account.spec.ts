import { rejects } from "assert";
import { Encrypter } from "../../protocols/encrypter";
import { DbAddAcount } from "./db-add-account";

interface SutTypes {
  sut: DbAddAcount;
  encrypterStub: Encrypter;
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve("hashed_password"));
    }
  }

  return new EncrypterStub();
};

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  const sut = new DbAddAcount(encrypterStub);
  return {
    sut,
    encrypterStub,
  };
};

describe("DbAddAcount Usecase", () => {
  test("Should call Encrypter with correct password", async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, "encrypt");
    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };
    await sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith("valid_password");
  });

  test("Should throw if Encrypter throws", async () => {
    const { sut, encrypterStub } = makeSut();
    jest
      .spyOn(encrypterStub, "encrypt")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };
    const promise = sut.add(accountData);
    expect(promise).rejects.toThrow();
  });
});