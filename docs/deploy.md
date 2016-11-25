## Deployment

### Popis

Do Nexusu se publikuje artefakt ve formátu .zip. Tyto soubory je v rámci nasazení nutné zpřístupnít přes jednoduchý webserver (nginx, apache) a provést následující kroky:

- vytvořit symlink `assets/configs/config.js` -> `assets/configs/dev.js` (nebo `prod.js`, podle prostředí)
- nastavit na webserveru expires headery:
  - soubory s hashem v názvu (např. app.xxxxxx.bundle.js) na vysokou hodnotu (rok nebo nekonečno)
  - soubory bez verzovaného názvu (index.html, assets/*) na rozumnou nízkou hodnotu (5 minut)


[zpět na README](../README.md)
