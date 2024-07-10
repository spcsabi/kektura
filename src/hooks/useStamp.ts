import { useCollectionData } from "react-firebase-hooks/firestore";
import { stampQuery } from "../service/stamps";

export default function useStamp (uid:string){
    const [value, loading] = useCollectionData(stampQuery(uid))
    return [value, loading] as const;
}