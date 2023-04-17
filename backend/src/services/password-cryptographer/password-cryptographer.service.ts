import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import { ConfigService } from "../../services/config/config.service";

@Injectable()
export class PasswordCryptographerService {
  private encryptionInfo: {
    password: string;
    algorithm: string;
  };
  constructor(readonly configService: ConfigService) {
    this.encryptionInfo = this.configService.EncryptionInfo;
  }

  /**
   * @description get the password and hash it with bcrypt.
   * @param plaintextPassword
   * @returns hashed password
   */
  doHash(plaintextPassword: string): Promise<string> {
    return bcrypt.hash(plaintextPassword, this.saltRounds());
  }

  /**
   * @description check if the given password is equal with hashed password by comparing them.
   * @param plaintextPassword
   * @param hash
   * @returns boolean of equality result
   */
  doCompare(plaintextPassword: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plaintextPassword, hash);
  }

  /**
   * @description return salt rounds to use in bcrypt.
   * @returns salt rounds number
   */
  private saltRounds(): number {
    return 5;
  }

  /**
   * @description get the text and crypt it with cipher.
   * @param text
   * @returns crypted text
   */
  encrypt(text: string): string {
    const cipher = crypto.createCipher(
      this.encryptionInfo.algorithm,
      this.encryptionInfo.password
    );
    let crypted = cipher.update(text, "utf8", "hex");
    crypted += cipher.final("hex");
    return crypted;
  }

  /**
   * @description get the text and encrypt it with decipher.
   * @param text
   * @returns encrypted text
   */
  decrypt(text: string): string {
    const decipher = crypto.createDecipher(
      this.encryptionInfo.algorithm,
      this.encryptionInfo.password
    );
    let dec = decipher.update(text, "hex", "utf8");
    dec += decipher.final("utf8");
    return dec;
  }
}
