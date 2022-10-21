//Checking the crypto module
import crypto from "crypto";
import { ENV } from "../constants/env.constants";
const algorithm = "aes-256-cbc"; //Using AES encryption
const KEY = Buffer.from((ENV.CRYPTO_KEY || '').substring(0,32), "utf-8") // 32;
const IV = Buffer.from((ENV.CRYPTO_IV || '').substring(0,16), "utf-8") // 16;

//Encrypting text
export function encrypt(text: string): { iv: string; encryptedData: string } {
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(KEY), IV);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: IV.toString("hex"), encryptedData: encrypted.toString("hex") };
}

// Decrypting text
export function decrypt(text: { iv: string; encryptedData: string }): string {
  let iv = Buffer.from(text.iv, "hex");
  let encryptedText = Buffer.from(text.encryptedData, "hex");
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
