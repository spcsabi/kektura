import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase/auth";

export default function AuthOnly({ children }: { children: React.ReactNode }) {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return null;
  }

  if (user) {
    return <>{children}</>;
  }
}
