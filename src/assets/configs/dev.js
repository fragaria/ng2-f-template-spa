var appConfig = {
  "appName" : "fast",
  "logging.level": 5,
  "logging.allowConsoleCatch": true,
  "item.apiUrl": "api/items",
  "language.resources": "i18n/resources?lang=${lang}&module=${module}",
  "language.prefix": '/assets/i18n',
  "language.suffix": '.json',
  "language.datePattern": "fullDate",
  "language.numberDigits": "1.0-3"
};

window["app-config"] = window["app-config"] || appConfig;
