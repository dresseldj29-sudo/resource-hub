// Nur lokal auf deinem PC ausführen. Diese Datei und serviceAccountKey.json NIEMALS zu GitHub hochladen.
// Voraussetzung: Node.js installiert und im Ordner `npm install firebase-admin` ausgeführt.
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import serviceAccount from './serviceAccountKey.json' with { type: 'json' };

const email = process.argv[2];
if (!email) {
  console.error('Verwendung: node set-owner-claim.mjs deine@email.de');
  process.exit(1);
}
initializeApp({ credential: cert(serviceAccount) });
const user = await getAuth().getUserByEmail(email);
await getAuth().setCustomUserClaims(user.uid, { ...(user.customClaims || {}), owner: true });
console.log(`Owner-Recht wurde für ${email} gesetzt. Bitte abmelden und erneut anmelden.`);
