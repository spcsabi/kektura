import { useCollectionData } from "react-firebase-hooks/firestore";
import { likeQuery } from "../service/likes";

export default function useLike (uid:string){
    const [value, loading] = useCollectionData(likeQuery(uid))
    return [value, loading] as const;
}