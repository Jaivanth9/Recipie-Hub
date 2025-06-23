import SavedRecipes from "../models/SavedRecipes.js";

/* READ */
export const getSavedRecipe = async (req, res) => {
  try {
    const { userId } = req.params;
    const savedRecipes = await SavedRecipes.findOne({ userId });
    if (!savedRecipes) return res.status(200).json([]); // Return empty array if none
    res.status(200).json(savedRecipes.recipeId);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE */
export const updateSavedRecipe = async (req, res) => {
  try {
    const { userId } = req.params;
    const { recipeId } = req.body;

    let savedRecipes = await SavedRecipes.findOne({ userId });

    // No document found – create new with recipeId
    if (!savedRecipes) {
      savedRecipes = new SavedRecipes({
        userId,
        recipeId: [recipeId], // always as array
      });
      await savedRecipes.save();
      return res.status(200).json(savedRecipes.recipeId);
    }

    // Toggle recipeId in the array
    const index = savedRecipes.recipeId.indexOf(recipeId);
    if (index === -1) {
      savedRecipes.recipeId.push(recipeId);
    } else {
      savedRecipes.recipeId.splice(index, 1); // remove
    }

    const updated = await savedRecipes.save();
    res.status(200).json(updated.recipeId);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
