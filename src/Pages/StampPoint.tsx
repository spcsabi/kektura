import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { StampPointData } from "../types/stampPoint";

const fetchPoints = async (id: string) => {
  const BASE_URL = `https://turistaterkepek.hu/server/rest/services/orszagos_kektura/kekturahu/MapServer/0/query?text=${id}&outFields=*&returnGeometry=false&f=pjson`;
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data;
};

export default function StampPoint() {
  const { id } = useParams<{ id: string }>();
  const query = useQuery({
    queryKey: ["points", id],
    queryFn: () => fetchPoints(id!),
    refetchOnWindowFocus: false,
  });

  return (
    <div className="fixed inset-0 bg-green-100 h-screen overflow-auto">
      <div className="flex flex-col items-center">
        {query.data?.features.map(
          (point: StampPointData) =>
            point.attributes.bh_id === id && (
              <div
                key={point.attributes.objectid}
                className="flex flex-col items-center w-[50%] p-4"
              >
                <p className="text-3xl">{point.attributes.helyszin}</p>
                <p>{point.attributes.bh_id}</p>
                <p>{point.attributes.helyszin_leiras}</p>
                <p>{point.attributes.helyszin_leiras_eng}</p>
                <p>{point.attributes.elerhetoseg}</p>
                <p>{point.attributes.nyitvatartas}</p>
                <img
                  className="h-[30%] mb-4 object-scale-down rounded-3xl"
                  src={point.attributes.url_kep_1}
                  alt={point.attributes.bh_nev}
                />
              </div>
            )
        )}
      </div>
    </div>
  );
}
