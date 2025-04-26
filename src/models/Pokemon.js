import mongoose from 'mongoose';

const pokemonSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: Object,
    required: true
  },
  type: [{
    type: String,
    enum: [
      "Fire", "Water", "Grass", "Electric", "Ice", "Fighting",
      "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock",
      "Ghost", "Dragon", "Dark", "Steel", "Fairy", "Normal"
    ]
  }],
  image: {
    type: String
  },
  base: {
    HP: Number,
    Attack: Number,
    Defense: Number,
    SpAttack: Number,
    SpDefense: Number,
    Speed: Number
  },
  evolutions: [{
    type: Number,
    ref: 'Pokemon'
  }]
}, {
  timestamps: true
});

const Pokemon = mongoose.model('pokemons', pokemonSchema);

export default Pokemon;
