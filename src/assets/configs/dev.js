var appConfig = {
  "loggingLevel": 5,
  "loggingAllowConsoleCatch": true,
  "itemsApiUrl": "api/items",
  "language.resources": "i18n/resources?lang=${lang}&module=${module}",
  "language.prefix": '/assets/i18n',
  "language.suffix": '.json',
  "language.datePattern": "fullDate",
  "language.numberDigits": "1.0-3"
};

window["app-config"] = window["app-config"] || appConfig;
