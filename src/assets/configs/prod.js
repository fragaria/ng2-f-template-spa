var appConfig = {
  "appName" : "fast",
  "loggingLevel": 2,
  "loggingAllowConsoleCatch": true,
  "itemsApiUrl": "https://private-0f9a88-itemsapi2.apiary-mock.com/items",
  "language.resources": "i18n/resources?lang=${lang}&module=${module}",
  "language.prefix": '/assets/i18n',
  "language.suffix": '.json',
  "language.datePattern": "fullDate",
  "language.numberDigits": "1.0-3"
};

window["app-config"] = window["app-config"] || appConfig;
