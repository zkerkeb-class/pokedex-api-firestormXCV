import express from 'express';
import Pokemon from '../models/Pokemon.js';
import jwt from "jsonwebtoken"
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/pokemons');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Middleware pour vérifier le JWT
const auth = (req, res, next) => {
  // Récupération du token depuis l'en-tête
  const token = req.cookies.token;
  // Vérification de la présence du token
  
  if (!token) {
    return res.status(401).json({ message: 'Accès refusé, token manquant' });
  }

  try {
    // Vérification du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ajout des informations utilisateur à l'objet requête
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalide', error: err.message });
  }
};

// GET - Récupérer tous les pokémons
router.get('/', auth, async (req, res) => {
  try {
    const pokemons = await Pokemon.find({});
    res.status(200).json(pokemons);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des pokémons",
      error: error.message
    });
  }
});

// GET - Récupérer un pokémon par son ID
router.get('/:id', auth,  async (req, res) => {
  try {
    
    const pokemon = await Pokemon.findOne({ id: req.params.id });
    if (!pokemon) {
      return res.status(404).json({ message: "Pokémon non trouvé" });
    }
    res.status(200).json(pokemon);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération du pokémon",
      error: error.message
    });
  }
});

// POST - Créer un nouveau pokémon
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const data = req.body;

    const lastPokemon = await Pokemon.findOne().sort({ id: -1 }).limit(1);
    const newId = lastPokemon ? lastPokemon.id + 1 : 1;

    let imageUrl = '';
    if (req.file) {
      const ext = path.extname(req.file.originalname);
      const filename = `${newId}${ext}`;
      const oldPath = req.file.path;
      const newPath = path.join(req.file.destination, filename);

      fs.renameSync(oldPath, newPath);

      imageUrl = `http://localhost:3000/assets/pokemons/${filename}`;
    }

    const pokemon = new Pokemon({
      id: newId,
      name: JSON.parse(data.name), // JSON stringifié côté front (important)
      type: data.type.split(',').map(t => t.trim()),
      base: {
        HP: parseInt(data.hp),
        Attack: parseInt(data.attack),
        Defense: parseInt(data.defense),
        Speed: parseInt(data.speed)
      },
      image: imageUrl,
      description: data.description,
      height: data.height ? parseFloat(data.height) : undefined,
      weight: data.weight ? parseFloat(data.weight) : undefined,
      abilities: data.abilities ? data.abilities.split(',').map(a => a.trim()) : []
    });

    await pokemon.save();
    res.status(201).json(pokemon);
  } catch (error) {
    console.error("Erreur création Pokémon :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});


// PUT - Mettre à jour un pokémon
router.put('/:id', async (req, res) => {
  try {
    console.log(req.body)
    const pokemon = await Pokemon.findOne({ id: parseInt(req.params.id) });
    if (!pokemon) return res.status(404).json({ message: 'Pokémon non trouvé' });

    Object.assign(pokemon, req.body);

    // Correction manuelle de la structure `base`
    pokemon.base = {
      HP: Number(req.body.base?.HP),
      Attack: Number(req.body.base?.Attack),
      Defense: Number(req.body.base?.Defense),
      SpAttack: Number(req.body.base?.SpAttack),
      SpDefense: Number(req.body.base?.SpDefense),
      Speed: Number(req.body.base?.Speed)
    };
    

    await pokemon.save();
    res.status(200).json({ message: 'Pokémon mis à jour', pokemon });

  } catch (error) {
    console.error("Erreur lors de la mise à jour du Pokémon :", error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});


// DELETE - Supprimer un pokémon
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedPokemon = await Pokemon.findOneAndDelete({ id: req.params.id });
    if (!deletedPokemon) {
      return res.status(404).json({ message: "Pokémon non trouvé" });
    }
    res.status(200).json({
      message: "Pokémon supprimé avec succès",
      pokemon: deletedPokemon
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression du pokémon",
      error: error.message
    });
  }
});

export default router;
