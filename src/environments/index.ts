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
};
