import mongoose from "mongoose";

// Define the schema for saved recipes
const SavedRecipesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  recipeId: {
    type: [Number], // or [String] depending on ID format
    default: [],
  },
});

export default mongoose.model("SavedRecipes", SavedRecipesSchema);
