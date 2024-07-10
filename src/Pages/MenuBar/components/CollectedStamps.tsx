import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase/auth";
import useStamp from "../../../hooks/useStamp";

export default function CollectedStamps() {
  const [user] = useAuthState(auth);
  const [stamps] = useStamp(user!.uid);

  if (stamps) {
    return (
      <>
        {stamps.map((stamp) => (
            <div key={stamp.id}>
              <h1>{stamp.bhszakasz_id}</h1>
            </div>
          )
        )}
      </>
    );
  } else {
    return null;
  }
}
