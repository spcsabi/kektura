import { useCollectionData } from "react-firebase-hooks/firestore";
import { likeNumQuery } from "../service/likes";

export default function useLike (){
    const [value, loading] = useCollectionData(likeNumQuery())
    return [value, loading] as const;
}