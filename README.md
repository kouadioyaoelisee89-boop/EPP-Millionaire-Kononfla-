# 🚀 EduHub — Guide de Déploiement
### EPP MILLIONNAIRE KONONFLA

---

## ✅ Prérequis accomplis

- [x] Fichier `eduhub-orange.html` prêt
- [x] Projet Supabase créé (`jrlroyphrwlcpkskuepg`)
- [x] Table `eduhub_data` créée dans Supabase
- [x] Realtime activé (`supabase_realtime`)
- [x] Repo GitHub public

---

## 📁 Étape 1 — Préparer le fichier sur GitHub

1. Renomme le fichier **`eduhub-orange.html`** en **`index.html`**
2. Place-le à la **racine du repo** (pas dans un sous-dossier)
3. Push sur GitHub :

```bash
git add index.html
git commit -m "Deploy EduHub EPP MILLIONNAIRE KONONFLA"
git push
```

> Si tu fais ça depuis GitHub directement : upload le fichier renommé via **"Add file"** → **"Upload files"**

---

## 🚀 Étape 2 — Déployer sur Vercel

1. Va sur **[vercel.com](https://vercel.com)**
2. Clique **"Sign in with GitHub"**
3. Clique **"Add New Project"**
4. Sélectionne ton repo dans la liste
5. Laisse tous les paramètres par défaut
6. Clique **"Deploy"** → attends ~30 secondes
7. ✅ Tu obtiens une URL permanente :  
   `https://ton-repo.vercel.app`

> 💡 Tu peux personnaliser le nom dans **Settings** → **Domains**  
> ex : `eduhub-kononfla.vercel.app`

---

## 🔄 Mises à jour automatiques

C'est le grand avantage du combo GitHub + Vercel :

- Tu pushs une nouvelle version sur GitHub
- Vercel redéploie **automatiquement en quelques secondes**
- Tous les appareils reçoivent la mise à jour au prochain rechargement

**Aucune action manuelle requise après le premier déploiement.**

---

## 📱 Accès depuis les appareils

Une fois déployé, sur chaque appareil :

1. Ouvre Chrome (recommandé)
2. Tape l'URL Vercel obtenue
3. Connecte-toi avec ton rôle et mot de passe
4. Le nom d'école **"EPP MILLIONNAIRE KONONFLA"** est verrouillé automatiquement

> 💡 **Astuce mobile** : Ajoute l'URL à l'écran d'accueil  
> Chrome → menu `⋮` → **"Ajouter à l'écran d'accueil"**  
> L'app s'ouvrira comme une vraie application mobile !

---

## 🔄 Synchronisation temps réel

La synchronisation entre appareils fonctionne **uniquement** quand :

- ✅ Le fichier est ouvert via une URL (`https://…`) — **pas en `file://`**
- ✅ L'appareil est connecté à Internet
- ✅ Les deux appareils utilisent le **même nom d'école**

**Indicateur de sync** : point coloré en haut à droite de l'app
- 🟢 Vert = connecté et synchronisé
- 🔴 Rouge = hors-ligne (données sauvegardées localement, envoi dès retour réseau)

---

## 🔑 Comptes et mots de passe par défaut

| Rôle | Mot de passe |
|------|-------------|
| Directeur | `1234` |
| Enseignant | `1234` |
| Économe (Caissier) | `1234` |
| Chef de Classe | `1234` |

> ⚠️ Change les mots de passe dans le code source (`const COMPTES = {…}`) avant usage en production.

---

## 🗄️ Supabase — Rappel configuration

**Projet** : `jrlroyphrwlcpkskuepg.supabase.co`

Si jamais tu dois recréer la table (nouveau projet) :

```sql
-- 1. Créer la table
CREATE TABLE IF NOT EXISTS eduhub_data (
  id          TEXT PRIMARY KEY,
  school      TEXT NOT NULL,
  payload     JSONB NOT NULL DEFAULT '{}',
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Activer la sécurité
ALTER TABLE eduhub_data ENABLE ROW LEVEL SECURITY;

-- 3. Autoriser lecture/écriture publique
CREATE POLICY "public read write" ON eduhub_data
  FOR ALL USING (true) WITH CHECK (true);

-- 4. Activer le temps réel
ALTER PUBLICATION supabase_realtime ADD TABLE eduhub_data;
```

---

## ❓ Problèmes fréquents

| Problème | Solution |
|----------|----------|
| Page blanche sur Vercel | Vérifier que le fichier s'appelle bien `index.html` à la racine |
| Point de sync rouge | Vérifier la connexion Internet |
| Données absentes sur un appareil | Actualiser la page (`Ctrl+Shift+R`) |
| Sync temps réel ne fonctionne pas | S'assurer d'ouvrir via l'URL Vercel (pas `file://`) |
| Vercel ne voit pas le repo | Vérifier que le repo est **public** sur GitHub |

---

## 🔁 Flux de travail complet

```
Modifier index.html
      ↓
git push sur GitHub
      ↓
Vercel redéploie automatiquement (~30s)
      ↓
Tous les appareils → actualiser → nouvelle version
      ↓
Données conservées dans Supabase ✅
```

---

*EduHub — EPP MILLIONNAIRE KONONFLA · Généré le 19/05/2026*
