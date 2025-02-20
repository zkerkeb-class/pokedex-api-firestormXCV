import express from "express";
import cors from "cors";
import fs from 'fs';
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

// Lire le fichier JSON
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pokemonsList = JSON.parse(fs.readFileSync(path.join(__dirname, './data/pokemons.json'), 'utf8'));

const app = express();
const PORT = 3000;

// Middleware pour CORS
app.use(cors());

// Middleware pour parser le JSON
app.use(express.json());

// Middleware pour servir des fichiers statiques
// 'app.use' est utilisé pour ajouter un middleware à notre application Express
// '/assets' est le chemin virtuel où les fichiers seront accessibles
// 'express.static' est un middleware qui sert des fichiers statiques
// 'path.join(__dirname, '../assets')' construit le chemin absolu vers le dossier 'assets'
app.use("/assets", express.static(path.join(__dirname, "../assets")));

//Route GET pokemon by ID
app.get("/api/pokemons/:id", (req, res) => {
  let response = pokemonsList[parseInt(req.params.id) - 1]
  if (response != null)
    res.status(200).send(response);
  else
  res.status(404).send({
    type: "ERROR",
    message :("Can't find pokemon for id " + req.params.id)
  });
});

// Route GET de base
app.get("/api/pokemons", (req, res) => {
  res.status(200).send({
    types: [
      "fire",
      "water",
      "grass",
      "electric",
      "ice",
      "fighting",
      "poison",
      "ground",
      "flying",
      "psychic",
      "bug",
      "rock",
      "ghost",
      "dragon",
      "dark",
      "steel",
      "fairy",
    ],
    pokemons: pokemonsList,
  });
});

//Route POST create pokemon
app.post("/api/pokemons", (req, res) => {

  res.status(200).send("Pokemon successfuly created");
})

//Route PUT update a pokemon
app.put("/api/pokemons/:id", (req, res) => {
  let id = parseInt(req.params.id) -1
  if (pokemonsList[id] == null) {
    res.status(404).send({
      type: "ERROR",
      message :("Can't find pokemon for id " + req.params.id)
    });
    return;
  } else {
    console.log(req.body)
    pokemonsList[id] = req.body
  }
  if (!reWritePokemonFile()) {
    res.status(500).send({
      type: "ERROR",
      message :("Internal server error " + req.params.id)
    });
  }
  res.status(200).send("Pokemon successfuly modified")
})

//Route DELETE a pokemon
app.delete("/api/pokemons/:id", (req, res) => {
  let id = parseInt(req.params.id -1)
  if (pokemonsList[id] == null) {
    res.status(404).send({
      type: "ERROR",
      message :("Can't find pokemon for id " + req.params.id)
    });
  } else {
    delete pokemonsList[id]
    res.status(200).send("Pokemon successfuly deleted")
  }
  if (!reWritePokemonFile()) {
    res.status(500).send({
      type: "ERROR",
      message :("Internal server error " + req.params.id)
    });
  }
  
})

app.get("/", (req, res) => {
  res.status(200).send("bienvenue sur l'API Pokémon");
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});


function reWritePokemonFile() {
  //console.log(pokemonsList[0])
  try {
    // Convertir la liste en JSON avec une indentation de 2 espaces
    const pokemonsJson = JSON.stringify(pokemonsList, null, 2);
    
    // Utiliser un chemin absolu pour écrire le fichier
    const filePath = path.join(__dirname, './data/pokemons.json');
    
    // Écrire le fichier JSON
    fs.writeFileSync(filePath, pokemonsJson);
    
    return true
  } catch (error) {
      console.error('Erreur lors de la génération du fichier JSON :', error);
      return false
  }
}
