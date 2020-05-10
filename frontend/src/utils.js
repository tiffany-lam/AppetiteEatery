let BASE_API_URL;

switch (process.env.NODE_ENV) {
  case "development":
    BASE_API_URL = "http://localhost:5000" + "/api";
    break;
  case "production":
    BASE_API_URL = process.env.REACT_APP_WEB_SERVER_PUBLIC_IP + "/api";
    break;
  default:
    BASE_API_URL = "we did an oopsie";
}

module.exports = { BASE_API_URL };
