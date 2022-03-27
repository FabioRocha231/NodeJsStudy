import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  Encrypter,
} from "./db-account-protocols";

export class DbAddAcount implements AddAccount {
  private readonly encrypter: Encrypter;
  constructor(encryter: Encrypter) {
    this.encrypter = encryter;
  }
  async add(account: AddAccountModel): Promise<AccountModel> {
    const encryptedPassword = await this.encrypter.encrypt(account.password);
    return new Promise((resolve) =>
      resolve({
        id: "valid_id",
        name: "valid_name",
        email: "valid_email",
        password: encryptedPassword,
      })
    );
  }
}
