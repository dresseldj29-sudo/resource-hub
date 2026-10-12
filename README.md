# Resource Hub – Firebase + GitHub Pages

## Was funktioniert in dieser Version?
- Firebase-E-Mail-/Passwort-Anmeldung und Abmeldung
- Live-Synchronisierung der Resource-, Gruppen- und Serverlisten über Firestore
- ZIP-Uploads in Firebase Storage (bis 100 MB nach den bereitgestellten Regeln)
- Resource-Beschreibung, Framework, Version und Installationsanleitung
- Gruppen erstellen, Beitrittscode kopieren, optionales Gruppenpasswort und Beitritt per Code
- Serveradresse und Discord-Link speichern
- Owner-Ansicht, Einstellungen und erfasste angemeldete Seitenbesuche
- Musik-Player mit Lautstärke, Play/Pause, vorherigem/nächstem Titel

## 1. GitHub Pages
1. Lade `index.html`, `firestore.rules`, `storage.rules` und den Ordner `musik/` in dein Repository hoch.
2. Öffne GitHub → Settings → Pages.
3. Wähle `Deploy from a branch`, Branch `main`, Ordner `/root`.
4. Speichern und auf die GitHub-Pages-URL warten.

## 2. Firebase einrichten
1. Öffne https://console.firebase.google.com/ und erstelle ein Projekt.
2. Authentication → Sign-in method → **Email/Password** aktivieren und dein Konto erstellen.
3. Firestore Database erstellen und Storage aktivieren.
4. Projekteinstellungen → Allgemein → Web-App: kopiere die Firebase-Konfiguration.
5. Trage in `index.html` die echten Werte für `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId` und `appId` ein.
6. Kopiere `firestore.rules` in Firestore → Regeln und veröffentliche sie.
7. Kopiere `storage.rules` in Storage → Regeln und veröffentliche sie.
8. Lade die aktualisierte `index.html` zu GitHub hoch.

## 3. Owner-Rechte aktivieren
Der Owner-Status wird über den sicheren Firebase Custom Claim `owner: true` geprüft, nicht über einen Namen oder ein Passwort im Frontend.

1. Lade im Firebase-Projekt unter Projekteinstellungen → Dienstkonten einen privaten Service-Account-Schlüssel herunter.
2. Lege ihn lokal neben `set-owner-claim.mjs` als `serviceAccountKey.json` ab.
3. Öffne ein Terminal in diesem Ordner und führe aus:
   `npm install firebase-admin`
4. Führe aus:
   `node set-owner-claim.mjs deine-firebase-login-email@example.com`
5. Melde dich auf der Website ab und wieder an.

**Wichtig:** `serviceAccountKey.json`, `node_modules/` und dieser Admin-Schlüssel dürfen niemals in GitHub oder auf die Website hochgeladen werden. Der Admin-Schlüssel gewährt weitreichenden Zugriff. Lösche ihn nach Verwendung sicher oder bewahre ihn ausschließlich geschützt lokal auf.

## 4. Musik
Die MP3-Dateien müssen im Ordner `musik/` liegen und die in `index.html` angegebenen Dateinamen exakt haben. Musik startet wegen Browserregeln erst nach Klick auf Play.

## Wichtige Sicherheitsgrenze
Diese Version synchronisiert Daten und implementiert die Beitrittsabläufe. Für einen wirklich privaten Gruppenbereich ist zusätzlich eine serverseitige Cloud Function erforderlich: In diesem statischen Starter können eingeloggte Nutzer Gruppendokumente lesen, um den Beitrittscode zu suchen; deshalb ist der Gruppenpasswort-Hash für angemeldete Nutzer sichtbar und sollte nicht als hochsichere Zugangssperre betrachtet werden. Teile hier keine vertraulichen Daten. Auch die Seitenbesuche zählen nur angemeldete Besuche, die von der Website erfasst wurden; das ist keine eindeutige Personenmessung und keine FiveM-API-Abfrage. Die angezeigte Speichergröße summiert die in Firestore sichtbaren Resource-Dateigrößen und ist keine Abrechnung der gesamten Firebase-Storage-Nutzung.

## Ohne Firebase
Ohne echte Firebase-Konfiguration arbeitet die Seite im lokalen Vorschaumodus. Die Daten werden nicht mit anderen Geräten geteilt; lokale ZIP-Dateien sind auf 4 MB begrenzt.
