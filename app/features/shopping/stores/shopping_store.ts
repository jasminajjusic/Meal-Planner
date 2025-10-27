// stores/shopping_store.ts
import { doc, getDoc, setDoc } from "firebase/firestore";
import { create } from "zustand";

import { auth, db } from "../../../../firebaseConfig";

export interface Ingredient {
  id: string;
  name: string;
  bought: boolean;
}

interface ShoppingState {
  ingredients: Ingredient[];
  loading: boolean;
  fetchIngredients: () => Promise<void>;
  addIngredient: (name: string) => Promise<void>;
  removeIngredient: (id: string) => Promise<void>;
  toggleBought: (id: string) => Promise<void>;
}

const useShoppingStore = create<ShoppingState>((set, get) => ({
  ingredients: [],
  loading: true,

  fetchIngredients: async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      set({ ingredients: docSnap.data().shoppingList || [], loading: false });
    } else {
      set({ ingredients: [], loading: false });
    }
  },

  addIngredient: async (name) => {
    if (!name.trim()) return;
    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      name,
      bought: false,
    };
    const updated = [...get().ingredients, newIngredient];
    set({ ingredients: updated });
    await saveToFirestore(updated);
  },

  removeIngredient: async (id) => {
    const updated = get().ingredients.filter((i) => i.id !== id);
    set({ ingredients: updated });
    await saveToFirestore(updated);
  },

  toggleBought: async (id) => {
    const updated = get().ingredients.map((i) =>
      i.id === id ? { ...i, bought: !i.bought } : i
    );
    set({ ingredients: updated });
    await saveToFirestore(updated);
  },
}));

const saveToFirestore = async (ingredients: Ingredient[]) => {
  const userId = auth.currentUser?.uid;
  if (!userId) return;
  const docRef = doc(db, "users", userId);
  await setDoc(docRef, { shoppingList: ingredients }, { merge: true });
};

export default useShoppingStore;
