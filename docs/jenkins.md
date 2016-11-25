## Jenkins

### Popis
Automatizace (CI/CD) projektu je řešena skrze gulp tasky, které lze spouštět lokálně, primárně jsou ale určené k běhu na
Jenkis prostředí. To umožňuje provádění tasků ve stabilním prostředí (ne vývojářský stroj) a automatické spouštění tasků
v daný čas nebo triggerovaný jinými událostmi (push do gitu, cron, ...).

### Gulp task
Pokud jsou v `gulp/tasks/jenkins.js` správně nastavené údaje, dojde k vytvoření nových jobů v Jenkins.

> Aktuálně je připraven pouze build job, další budou doplněny po upřesnění požadavků.

Pro každý xml soubor v adresáři `/jenkins` je vytvořen job a obsah souboru je použit jako konfigurace.
Během uploadu je placeholder `--git endpoint--` nahrazen hodnotou nastavenou ve skriptu.

Jednoduchou úpravou skriptu lze přidat další parametry k nahrazení.

Opětovným spuštěním skriptu dojde k přepsání tasků.

[zpět na README](../README.md)
