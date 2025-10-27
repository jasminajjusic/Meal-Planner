import { getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { create } from "zustand";
import { loginWithEmail, registerWithEmail } from "../../../../firebaseConfig";

const db = getFirestore();
const auth = getAuth();

interface AuthState {
  user: any;
  error: string | null;
  loading: boolean;
  register: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  error: null,
  loading: false,

  register: async (email, password, name) => {
    set({ loading: true, error: null });
    try {
      const { user, error: err } = await registerWithEmail(email, password);

      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name,
          email,
          createdAt: new Date(),
        });

        set({ user, loading: false });
      } else if (err) {
        set({ error: err, loading: false });
      }
    } catch (e: any) {
      set({ error: e.message, loading: false });
    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    try {
      set({ user: null, loading: false });
    } catch (e: any) {
      set({ error: e.message, loading: false });
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });

    try {
      const { user, error: err } = await loginWithEmail(email, password);
      if (user) {
        set({ user, loading: false });
      } else if (err) {
        set({ error: err, loading: false });
      }
    } catch (e: any) {
      set({ error: e.message, loading: false });
    }
  },
}));

export default useAuthStore;
