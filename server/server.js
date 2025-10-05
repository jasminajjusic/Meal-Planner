require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({ token: process.env.CO_API_KEY });

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate-recipe", async (req, res) => {
  const { ingredients } = req.body;
  if (!ingredients) {
    return res.status(400).json({ error: "Ingredients are required" });
  }

  try {
    const response = await cohere.chat({
      model: "command-xlarge-nightly",
      message: `I have these ingredients: ${ingredients}. Please suggest a simple recipe.`,
      temperature: 0.7,
    });

    const recipe = response.text;

    if (!recipe) {
      return res.status(500).json({ error: "The recipe was not generated." });
    }

    res.json({ recipe: { raw: recipe.trim() } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/generate-meal-plan", async (req, res) => {
  const { days, preferences } = req.body;
  if (!days) {
    return res.status(400).json({ error: "Number of days is required" });
  }

  try {
    const prompt = `Generate a meal plan for ${days} days${
      preferences ? ` with preferences: ${preferences}` : ""
    }. Include breakfast, lunch, and dinner for each day. Format the output strictly as a JSON array, no extra text. Example:
[
  {
    "day": 1,
    "breakfast": "...",
    "lunch": "...",
    "dinner": "..."
  }
]`;

    const response = await cohere.chat({
      model: "command-xlarge-nightly",
      message: prompt,
      temperature: 0.7,
    });

    const mealPlanRaw = response.text;

    let mealPlanJson;
    try {
      mealPlanJson = JSON.parse(mealPlanRaw);
    } catch (e) {
      const firstBracket = mealPlanRaw.indexOf("[");
      const lastBracket = mealPlanRaw.lastIndexOf("]");
      if (firstBracket !== -1 && lastBracket !== -1) {
        const jsonString = mealPlanRaw.substring(firstBracket, lastBracket + 1);
        try {
          mealPlanJson = JSON.parse(jsonString);
        } catch (e2) {
          return res
            .status(500)
            .json({ error: "I cannot parse the meal plan JSON" });
        }
      } else {
        return res
          .status(500)
          .json({ error: "I cannot parse the meal plan JSON." });
      }
    }

    res.json({ mealPlan: mealPlanJson });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {});
