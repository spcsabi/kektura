import { useQuery } from "@tanstack/react-query";
import { HikeRoutes } from "../types/hike-routes";

async function fetchHikeRoute(): Promise<HikeRoutes> {
  const URL =
    "https://turistaterkepek.hu/server/rest/services/orszagos_kektura/kekturahu/MapServer/1/query?text=OKT&returnGeometry=false&outFields=*&orderByFields=sorszam&f=pjson";
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

export function useHikeRoute() {
  return useQuery({
    queryKey: ["hikeRoute"],
    queryFn: fetchHikeRoute,
    refetchOnWindowFocus: false,
  });
}

/****************************************************************************************/
async function fetchHikeRouteDetails(id: number): Promise<HikeRoutes> {
  const URL = `https://turistaterkepek.hu/server/rest/services/orszagos_kektura/kekturahu/MapServer/0/query?where=sorszam=${id}&outFields=*&returnGeometry=false&f=pjson`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

export function useHikeRouteDetails(sorszam: number) {
  return useQuery({
    queryKey: ["hikeRoute", sorszam],
    queryFn: () => fetchHikeRouteDetails(sorszam),
    refetchOnWindowFocus: false,
  });
}
