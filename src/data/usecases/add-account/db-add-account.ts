import { AccountModel } from "../../../domain/models/account";
import {
  AddAccount,
  AddAccountModel,
} from "../../../domain/usecases/add-account";
import { Encrypter } from "../../protocols/encrypter";

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
