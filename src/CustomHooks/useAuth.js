import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from "../Utilities/FirebaseUtils";

function useAuth() {
  const [authState, setAuthState] = useState({
    isSignedIn: false,
    pending: true,
    user: null
  });

  useEffect(() => {
    const unregisterAuthObserver = onAuthStateChanged(
      getFirebaseAuth(),
      (user) => {
        setAuthState({ user, pending: false, isSignedIn: !!user });
      }
    );
    return () => unregisterAuthObserver();
  }, []);

  return authState;
}

export default useAuth;
