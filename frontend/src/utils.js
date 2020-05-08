const URL_DEVELOPMENT = "http://127.0.0.1:5000";
const URL_PRODUCTION = "http://52.201.241.142";

let BASE_API_URL;

switch (process.env.NODE_ENV) {
  case "development":
    BASE_API_URL = URL_DEVELOPMENT + "/api";
    break;
  case "production":
    BASE_API_URL = URL_PRODUCTION + "/api";

    break;
  case "test":
    BASE_API_URL = URL_DEVELOPMENT + "/api";

    break;
  default:
    BASE_API_URL = "we did an oopsie";
}

module.exports = { BASE_API_URL };
