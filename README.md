 Meal Planner App

Meal Planner is a React Native mobile app that helps users plan meals, discover recipes, generate AI-powered meal plans, and manage a shopping list. It’s built with modern mobile and full-stack technologies, showcasing both frontend and backend skills.

# Features

# Authentication & State Management

User registration and login implemented with Firebase Authentication.
Global state managed with Zustand for efficient and reactive state updates.

# Home Screen & Recipe Management

Fetches recipes from a custom Node.js + Express backend API.
Supports search and filtering for recipes.
Click on a recipe to view detailed info (ingredients, instructions).
Users can save recipes as favorites using Zustand state.

# AI-Powered Recipe Generation

Generate recipes from user-provided ingredients via Cohere AI API.
Backend handles the API requests and returns structured recipe data.

# Meal Plan Generation

Generate meal plans for any number of days.
AI-generated plans include breakfast, lunch, and dinner for each day.
Backend parses AI response into structured JSON for frontend consumption.

# Shopping List Management
Users can add, remove, and mark ingredients as bought.
List is reactive using Zustand, ensuring state persists while navigating app.

# Tech Stack

#Frontend

React Native: Cross-platform mobile development (iOS & Android).
Expo: Simplifies development and testing.
React Navigation: Tab and stack navigation for smooth user experience.
Zustand: Lightweight state management for recipes, meal plans, and shopping list.

# Backend

Node.js + Express: RESTful API to handle recipe & meal plan requests.
Cohere AI API: Generate recipes and meal plans from user inputs.
CORS & dotenv: Secure environment variables and API integration.

# Database & Authentication

Firebase: Authentication, user management, and potential Firestore integration for persistent data.

##  Screenshots

Here is an example of the app:

![App Screenshot](assets/images/meal-planner.png)

 More  screens are available on the following Figma link:  
[Figma Project Link](https://www.figma.com/design/6sQzlMvR4Bnss37lPkonwG/meal-planner?node-id=0-1&p=f&t=tLLmw9Je6bzMtb6Z-0)
