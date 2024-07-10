export interface Stamp {
    uid: string;
    bhszakasz_id:string;
    id:string
}

export type NewStamp = Omit<Stamp, "id">;
