import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { create } from "zustand";

const useUserStore = create((set) => ({
  userName: "",
  loadingUser: false,
  error: null,

  fetchUser: () => {
    const auth = getAuth();
    const db = getFirestore();

    set({ loadingUser: true, error: null });

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            set({ userName: data.name || "User", loadingUser: false });
          } else {
            set({ userName: "User", loadingUser: false });
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          set({ error: "Failed to fetch user.", loadingUser: false });
        }
      } else {
        set({ userName: "", loadingUser: false, error: "No user logged in." });
      }
    });
  },

  clearUser: () => set({ userName: "", error: null }),
}));

export default useUserStore;
