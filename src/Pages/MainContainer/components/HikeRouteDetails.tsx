import { useAuthState } from "react-firebase-hooks/auth";
import { deleteStamp, setDoneStamp } from "../../../service/stamps";
import { HikeRoute } from "../../../types/hike-routes";
import auth from "../../../firebase/auth";
import { Link } from "react-router-dom";
import { deleteLike, setLike } from "../../../service/likes";

export default function HikeRouteDetails({
  detail,
  onRowClick,
  dataOnFire,
}: {
  detail: HikeRoute;
  onRowClick: (detail: HikeRoute) => void;
  dataOnFire: {
    isChecked: boolean;
    isLiked: boolean;
    likeNum: number;
  };
}) {
  const [user] = useAuthState(auth);

  function handleRowClick() {
    onRowClick(detail);
  }

  function handleCheck() {
    if (user && !dataOnFire.isChecked) {
      const stamp = {
        id: user.uid + detail.attributes.bhszakasz_id,
        bhszakasz_id: detail.attributes.bhszakasz_id,
        uid: user.uid,
      };
      setDoneStamp(stamp);
    } else if (user && dataOnFire.isChecked) {
      deleteStamp(user.uid + detail.attributes.bhszakasz_id);
    } else return;
  }

  function handleLike() {
    if (user && !dataOnFire.isLiked) {
      const like = {
        id: user.uid + detail.attributes.bhszakasz_id,
        bhszakasz_id: detail.attributes.bhszakasz_id,
        uid: user.uid,
      };
      setLike(like);
    } else if (user && dataOnFire.isLiked) {
      deleteLike(user.uid + detail.attributes.bhszakasz_id);
    } else return;
  }

  return (
    <tr className="hover" onClick={handleRowClick}>
      <td>{detail.attributes.sorszam}</td>
      <td>
        <label>
          {user ? (
            <input
              type="checkbox"
              className="checkbox"
              checked={dataOnFire.isChecked}
              onChange={() => {
                handleCheck();
              }}
            />
          ) : (
            <></>
          )}
        </label>
      </td>
      <td>
        <div className="flex items-center gap-1">
          <div className="avatar">
            <div className="w-16 h-16">
              <img
                src={`http://turistaterkepek.hu/kepek/okk_kepek/belyegzo_lenyomatok\\\\${detail.attributes.kezdopont_bh_id.toLowerCase()}.svg`}
                alt="icon"
              />
            </div>
          </div>
          <div>
            <Link to={`/pecset/${detail.attributes.kezdopont_bh_id}`}>
              <span className="text-white bg-blue-500 hover:bg-blue-700 rounded-full px-2 py-1 shadow-lg transition duration-300">
                {detail.attributes.kezdopont}
              </span>
            </Link>
          </div>
          <div>{" <-> "}</div>
          <div>
            <Link to={`/pecset/${detail.attributes.vegpont_bh_id}`}>
              <span className="text-white bg-blue-500 hover:bg-blue-700 rounded-full px-2 py-1 shadow-lg transition duration-300">
                {detail.attributes.vegpont}
              </span>
            </Link>
          </div>
        </div>
      </td>
      <td>{detail.attributes.tav}</td>
      <td>{detail.attributes.szintido_oda}</td>
      <td>{`${detail.attributes.szintemelkedes}/${detail.attributes.szintcsokkenes}`}</td>
      <td>
        <button
          type="button"
          onClick={() => {
            handleLike();
          }}
          className={`${
            dataOnFire.isLiked
              ? "text-white  hover:bg-white hover:text-red-700 bg-blue-700"
              : "text-blue-700  hover:bg-blue-700 hover:text-white"
          }
           font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 `}
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
          </svg>
          {dataOnFire.likeNum}
        </button>
      </td>
    </tr>
  );
}
