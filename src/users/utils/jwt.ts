import * as jwt from 'jsonwebtoken';

const MILLI_SECONDS_IN_24_HOURS = 86400;
export function generateJWT(data, secret, expiresIn=MILLI_SECONDS_IN_24_HOURS): Promise<string> {
  return new Promise((resolve) => jwt.sign(data, secret, { expiresIn }, (err, token) => resolve(token)));
}

export function verifyAndDecode<T>(token, secret): Promise<T> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return reject(err);
      }

      return resolve(decoded);
    });
  });
}
