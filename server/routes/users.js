// Import required modules and functions
import express from "express";
import {
  getSavedRecipe,
  updateSavedRecipe
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

// Create a new router instance
const router = express.Router();

router.get("/users/:userId/savedRecipe",verifyToken, getSavedRecipe);
router.put("/users/:userId/savedRecipe", verifyToken, updateSavedRecipe);

export default router;