import {config as dotenvConfig} from "dotenv";

dotenvConfig();

const _config={
  port: process.env.PORT || 5000,
  dbUrl: process.env.MONGO_URL,
  env: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRETS
};

export const config = Object.freeze(_config);