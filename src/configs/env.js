import dotenv from "dotenv";

dotenv.config();

function getEnvValue(key) {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Failed to get value for ${key}`);
  }

  return value;
}

export const ENV = {
  port: getEnvValue("PORT"),
  nodeEnv: getEnvValue("NODE_ENV"),
  storageServersApiKey: getEnvValue("STORAGE_SERVERS_API_KEY"),
  clientApiKey: getEnvValue("CLIENT_API_KEY"),
};
