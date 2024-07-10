import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHikeRoute } from "../../data/utils";
import useStamp from "../../hooks/useStamp";
import HikeRouteDetails from "./components/HikeRouteDetails";
import { HikeRoute } from "../../types/hike-routes";
import auth from "../../firebase/auth";
import useLike from "../../hooks/useLike";
import useLikeNum from "../../hooks/useLikeNum";
import kekkorImg from "../../assets/kekkor.jpg";

export default function MainContainerPage() {
  const [isRoutPlanning, setisRoutPlanning] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState({});

  function handleRowClick(detail: HikeRoute) {
    setSelectedDetail(detail);
    console.log(selectedDetail);
  }
  const { data } = useHikeRoute();
  const [user] = useAuthState(auth);
  const [stamps] = useStamp(user ? user!.uid : "");
  const [likes] = useLike(user ? user!.uid : "");
  const [likesNum] = useLikeNum();

  const dataOnFire = data?.features.map((detail) => {
    let isChecked = false;
    let isLiked = false;
    let likeNum = 0;
    if (stamps) {
      stamps.forEach((stamp) => {
        if (stamp.bhszakasz_id === detail.attributes.bhszakasz_id) {
          isChecked = true;
        }
      });
    }
    if (likes) {
      likes.forEach((like) => {
        if (like.bhszakasz_id === detail.attributes.bhszakasz_id) {
          isLiked = true;
        }
      });
    }
    if (likesNum) {
      likesNum.forEach((like) => {
        if (like.bhszakasz_id === detail.attributes.bhszakasz_id) {
          likeNum += 1;
        }
      });
    }
    return { isChecked: isChecked, isLiked: isLiked, likeNum: likeNum };
  });

  return (
    <div className="flex flex-col items-center bg-green-100 ml-[20%] w-[80%] h-full p-4 overflow-hidden">
      {/* Image div */}
      <img
        className="h-[30%] mb-4 object-scale-down"
        src={kekkorImg}
        alt="image-about-kekor"
      />
      {/* Stamp list */}
      <div className="h-[42%] w-[90%] overflow-y-auto">
        <table className="table table-md table-pin-rows">
          <thead>
            <tr>
              <th></th>
              <th>
                <label>
                  <input id="select-all" type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Szakasznév</th>
              <th>Táv(km)</th>
              <th>Menetidő(óó:pp)</th>
              <th>Szint +/- (m)</th>
              <th>Like</th>
            </tr>
          </thead>
          <tbody>
            {data?.features.map((detail, index) => (
              <HikeRouteDetails
                key={index}
                detail={detail}
                dataOnFire={dataOnFire![index]}
                onRowClick={handleRowClick}
              />
            ))}
          </tbody>
        </table>
      </div>
      {/* Buttons */}
      <div>
        {!isRoutPlanning ? (
          <button
            className="btn bg-blue-500 my-2"
            onClick={() => setisRoutPlanning(true)}
          >
            Útvonaltervezés
          </button>
        ) : (
          <button
            className="btn bg-blue-500 my-2"
            onClick={() => setisRoutPlanning(false)}
          >
            Válassz 2 helyet
          </button>
        )}
      </div>
    </div>
  );
}
