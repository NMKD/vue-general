import { getAuth } from "firebase/auth";

const getCurrentUser = () => {
  const auth = getAuth();
  if (!auth) {
    return;
  }
  return auth.currentUser.uid;
};

export default getCurrentUser;
