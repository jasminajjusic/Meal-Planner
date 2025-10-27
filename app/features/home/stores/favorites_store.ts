// store/useFavoritesStore.ts
import { getAuth } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { create } from "zustand";
import { db } from "../../../../firebaseConfig";

type FavoritesState = {
  favorites: string[];
  loading: boolean;
  loadFavorites: () => Promise<void>;
  toggleFavorite: (mealId: string) => Promise<void>;
  isFavorite: (mealId: string) => boolean;
};

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  loading: false,

  loadFavorites: async () => {
    const user = getAuth().currentUser;
    if (!user) return;

    set({ loading: true });
    try {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        set({ favorites: snap.data().favorites || [] });
      }
    } catch (e) {
      console.error("Error loading favorites:", e);
    } finally {
      set({ loading: false });
    }
  },

  toggleFavorite: async (mealId) => {
    const user = getAuth().currentUser;
    if (!user) return;

    const ref = doc(db, "users", user.uid);
    const currentFavorites = get().favorites;

    const alreadyFav = currentFavorites.includes(mealId);

    try {
      if (alreadyFav) {
        await updateDoc(ref, { favorites: arrayRemove(mealId) });
        set({ favorites: currentFavorites.filter((id) => id !== mealId) });
      } else {
        await updateDoc(ref, { favorites: arrayUnion(mealId) });
        set({ favorites: [...currentFavorites, mealId] });
      }
    } catch (e) {
      // ako dokument ne postoji — kreiraj ga
      if (!alreadyFav) {
        await setDoc(ref, { favorites: [mealId] }, { merge: true });
        set({ favorites: [...currentFavorites, mealId] });
      }
    }
  },

  isFavorite: (mealId) => get().favorites.includes(mealId),
}));
