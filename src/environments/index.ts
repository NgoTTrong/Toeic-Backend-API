import { config } from 'dotenv';

config();

const env = process.env;

export const environments = {
  port: Number(env.PORT || 3000),
  accessTokenSecret: env.JWT_ACCESS_TOKEN_SECRET,
  accessTokenExpiration: env.JWT_ACCESS_TOKEN_EXPIRATION,
  refreshTokenSecret: env.JWT_REFRESH_TOKEN_SECERT,
  refreshTokenExpiration: env.JWT_REFRESH_TOKEN_EXPIRATION,
  clientId: env.CLIENT_ID,
  clientSecret: env.CLIENT_SECRET,
  transport: env.TRANSPORT,
  hfAccessToken: env.HF_ACCESS_TOKEN,
  model: env.MODEL,
  zalopayUrl: env.ZALOPAY_URL,
  zalopayAppId: env.APP_ID,
  miniAppId: env.MINI_APP_ID,
  zalopayKey1: env.KEY1,
  zalopayKey2: env.KEY2,
  privateKeyMiniApp: env.PRIVATE_KEY_MINIAPP,
};
