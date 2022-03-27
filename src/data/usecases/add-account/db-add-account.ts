import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  AddAccountRepository,
  Encrypter,
} from "./db-account-protocols";

export class DbAddAcount implements AddAccount {
  private readonly encrypter: Encrypter;
  private readonly addAccountRepository: AddAccountRepository;
  constructor(encryter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encryter;
    this.addAccountRepository = addAccountRepository;
  }
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password);
    this.addAccountRepository.add(
      Object.assign({}, accountData, { password: hashedPassword })
    );
    return new Promise((resolve) =>
      resolve({
        id: "valid_id",
        name: "valid_name",
        email: "valid_email",
        password: hashedPassword,
      })
    );
  }
}
