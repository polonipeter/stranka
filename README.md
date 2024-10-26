# Treba:
    sudo apt update
    sudo apt install php
    php -v
    sudo apt install composer
    composer require phpmailer/phpmailer


# Mozno treba:
    sudo apt-get install sendmail


# Spustanie:
    php -S localhost:8000




    
# PHP Skripty na FTP Serveri

Táto PHP verzia riešenia by mala fungovať na FTP serveri bez potreby SSH prístupu, pretože PHP súbory sa vykonávajú automaticky na strane servera, keď na ne pristúpiš cez URL (napr. `https://tvojadomena.sk/send-email.php`). Tu je, ako to funguje:

## PHP Skripty na FTP Serveri:

- Stačí nahrať PHP súbory na server pomocou FTP klienta (napr. FileZilla).
- PHP skript `send-email.php` sa vykoná automaticky, keď ho JavaScript zavolá cez fetch API v prehliadači.
- Nemusíš manuálne spúšťať PHP skripty cez terminál ani cez SSH. Server sám spustí `send-email.php`, keď príde HTTP požiadavka.

## Ako funguje JavaScript na klientovi:

- JavaScript kód v tvojom HTML formulári (napr. `form.js`) odošle POST požiadavku na URL `https://tvojadomena.sk/send-email.php`.
- Ak je na serveri PHP nakonfigurované správne (čo väčšina hostingových služieb štandardne má), tak sa skript `send-email.php` vykoná a spracuje údaje z formulára.

## PHP Bez Spustenia Servera:

- Na FTP serveri sa nemusíš starať o to, aby si „spustil” PHP server (napríklad ako to robíš lokálne pomocou `php -S`).
- Stačí mať PHP skript nahraný na správnom mieste na serveri a mať nakonfigurované správne adresy v JavaScripte. PHP server beží na strane hostingu a automaticky obsluhuje požiadavky.

## Email Funkčnosť na FTP Serveri:

- PHP má často prednastavenú funkciu `mail()` alebo môžeš použiť SMTP (napr. cez knižnicu ako PHPMailer).
- Ak máš SMTP údaje (napríklad Gmail alebo iný poskytovateľ SMTP), môžeš ich zadať do `send-email.php`, ako sme to ukázali v predchádzajúcom kroku.

## Základné Nahrávanie cez FTP:

- Nahraj všetky HTML, CSS, JavaScript a PHP súbory na FTP server do zložiek podľa potreby (napríklad `public_html` alebo `www`).
- Skontroluj, že JavaScript má správne URL na `send-email.php` (v relatívnom alebo absolútnom formáte, napr. `/send-email.php` alebo `https://tvojadomena.sk/send-email.php`).

## Stručný Prehľad:

1. Nahraj všetky súbory na FTP (HTML, CSS, JavaScript, PHP).
2. Uisti sa, že JavaScript volá správnu URL pre `send-email.php`.
3. PHP sa na serveri spustí automaticky, keď naň prehliadač pošle požiadavku (POST požiadavku od JavaScriptu).

Týmto spôsobom by ti formulár a emaily mali fungovať na FTP serveri bez potreby SSH prístupu alebo spúšťania Node.js servera.
