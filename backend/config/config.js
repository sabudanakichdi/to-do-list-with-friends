const env = process.env.NODE_ENV || "local";

if (env === "development" || env === "test" || env === "local") {
  const config = require("./config.json");
  const envConfig = config[env];
  console.log(envConfig);

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}
