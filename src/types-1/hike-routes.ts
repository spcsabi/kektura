export type HikeRoutes = {
  features: Array<{
    attributes: {
      sorszam: number;
      bhszakasz_id: string;
      kezdopont: string;
      vegpont: string;
      szakasznev: string;
      tav: number;
      szintemelkedes: number;
      szintcsokkenes: number;
      szintido_oda: string;
      szintido_vissza: string;
      kezdopont_bh_id: string;
      vegpont_bh_id: string;
    };
  }>;
};

export type HikeRoute = {
  attributes: {
    sorszam: number;
    bhszakasz_id: string;
    kezdopont: string;
    vegpont: string;
    szakasznev: string;
    tav: number;
    szintemelkedes: number;
    szintcsokkenes: number;
    szintido_oda: string;
    szintido_vissza: string;
    kezdopont_bh_id: string;
    vegpont_bh_id: string;
  };
};

export type HikeRouteWithCheck = {
    sorszam: number;
    bhszakasz_id: string;
    kezdopont: string;
    vegpont: string;
    szakasznev: string;
    tav: number;
    szintemelkedes: number;
    szintcsokkenes: number;
    szintido_oda: string;
    szintido_vissza: string;
    kezdopont_bh_id: string;
    vegpont_bh_id: string;
    isChecked:boolean
};