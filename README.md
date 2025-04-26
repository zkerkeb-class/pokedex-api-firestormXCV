# Pokédex Back-End – FirestormXCV

Bienvenue sur le dépôt back-end du projet Pokédex développé par FirestormXCV. Cette API RESTful fournit les données nécessaires à l'application front-end pour afficher, ajouter, modifier et comparer des Pokémon.

## 🧩 Description du projet

Ce projet est une API RESTful construite avec Node.js et Express.js, permettant de gérer une base de données de Pokémon. Elle offre des endpoints pour récupérer la liste des Pokémon, obtenir les détails d'un Pokémon spécifique, ajouter un nouveau Pokémon, modifier les statistiques d'un Pokémon existant, et supprimer un Pokémon.

### Fonctionnalités principales

- **Liste des Pokémon** : Récupération de tous les Pokémon disponibles.
- **Détails d'un Pokémon** : Obtention des informations détaillées d'un Pokémon spécifique.
- **Ajout de Pokémon** : Ajout de nouveaux Pokémon à la base de données.
- **Modification des statistiques** : Mise à jour des statistiques d'un Pokémon existant.
- **Suppression de Pokémon** : Suppression d'un Pokémon de la base de données.

## 🚀 Technologies utilisées

- **Node.js** : Environnement d'exécution JavaScript côté serveur.
- **Express.js** : Framework web pour Node.js.
- **MongoDB** : Base de données NoSQL pour stocker les données des Pokémon.
- **Mongoose** : ODM (Object Data Modeling) pour MongoDB et Node.js.

## 🛠️ Installation et exécution

### Prérequis

- **Node.js** (version 14 ou supérieure)
- **npm** (version 6 ou supérieure)
- **MongoDB** (base de données en cours d'exécution)

### Étapes d'installation

1. **Cloner le dépôt**

   ```bash
   git clone https://github.com/zkerkeb-class/pokedex-api-firestormXCV.git
   cd pokedex-api-firestormXCV
   ```

Installer les dépendances

   ```bash
   npm install
   ```
Lancer le serveur

   ```bash
   npm start
   ```
Le serveur sera accessible à l'adresse http://localhost:5000.

### 📚 Documentation de l'API

Base URL

   ```bash
   http://localhost:5000
   ```
## Endpoints

# Récupérer tous les Pokémon

- URL : /pokemons
- Méthode : GET
- Description : Récupère la liste de tous les Pokémon.

# Récupérer un Pokémon par ID

- URL : /pokemons/:id
- Méthode : GET
- Description : Récupère les détails d'un Pokémon spécifique par son ID.

# Ajouter un nouveau Pokémon

- URL : /pokemons
- Méthode : POST
- Description : Ajoute un nouveau Pokémon à la base de données.

**Corps de la requête :**

   ```json
   {
   "name": {
      "english": "Bulbasaur",
      "french": "Bulbizarre"
   },
   "type": ["Grass", "Poison"],
   "base": {
      "HP": 45,
      "Attack": 49,
      "Defense": 49,
      "Sp. Attack": 65,
      "Sp. Defense": 65,
      "Speed": 45
   },
   "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"
   }
   ```

# Modifier les statistiques d'un Pokémon

- URL : /pokemons/:id
- Méthode : PUT
- Description : Met à jour les statistiques d'un Pokémon existant.

**Corps de la requête :**

   ```json
   {
   "base": {
      "HP": 60,
      "Attack": 62,
      "Defense": 63,
      "Sp. Attack": 80,
      "Sp. Defense": 80,
      "Speed": 60
   }
   }
   ```

# Supprimer un Pokémon

- URL : /pokemons/:id
- Méthode : DELETE
- Description : Supprime un Pokémon de la base de données.

### 🎥 Vidéo de démonstration

Une démonstration complète de l'application est disponible sur YouTube :

👉 Lien vers la vidéo de démonstration
 







