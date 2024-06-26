import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import * as bcrypt from 'bcrypt'

export interface IEncrypt{
  password:string,
  salt:string
}

export default async function encrypt(password:string, hashSalt?:string):Promise<IEncrypt>{

  const iv = randomBytes(16);
  
  const salt = hashSalt ? hashSalt:  await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  return ({
   password: hashPassword,
   salt: salt

  }
  )
}
