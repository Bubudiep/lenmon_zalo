import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../components/api";
import empty from "../../img/empty.png";

const Nearly_restaurant = ({ user, loadItem }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  console.log(user);
  const CardLoading = () => {
    return (
      <div className="card">
        <div className="logo">
          <div className="img loading animate-pulse bg-gray-300" />
        </div>
        <div className="info loading">
          <div className="animate-pulse bg-gray-300 w-28 h-6 rounded-lg"></div>
          <div className="animate-pulse bg-gray-300 w-36 h-5 rounded-lg"></div>
          <div className="animate-pulse bg-gray-300 w-full h-5 rounded-lg"></div>
        </div>
      </div>
    );
  };
  useEffect(() => {
    const getNear = async () => {
      api
        .get(
          `/res-nearly/?latitude=${user?.location?.lat}&longitude=${user?.location?.long}`,
          user.app.access_token
        )
        .then((response) => {
          console.log("Near data", response);
          setLoading(false);
          setData(response?.nearby_restaurants);
        })
        .catch((error) => {
          setError("Phát sinh lỗi khi lấy dữ liệu, vui lòng thử lại sau!");
        });
    };
    getNear();
  }, []);
  return (
    <div className="section">
      <h3>
        <div className="left">
          <i className="fa-solid fa-store"></i>Các cửa tiệm gần bạn
        </div>
        <div className="right">
          <Link to="#">
            Tất cả<i className="fa-solid fa-angles-right"></i>
          </Link>
        </div>
      </h3>
      <div className="list-restaurant">
        {error ? (
          <div className="error">
            <p>{error}</p>
          </div>
        ) : loading ? (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <CardLoading key={index} />
            ))}
          </>
        ) : (
          <>
            {data.length > 0 ? (
              <div className="block">
                {data.map((rest, index) => (
                  <div
                    className="card"
                    key={index}
                    onClick={() => {
                      loadItem(rest?.id);
                      console.log(rest);
                    }}
                  >
                    <div className="logo">
                      <div className="img">
                        <img src={rest?.avatar ?? "#"} />
                      </div>
                    </div>
                    <div className="info">
                      <div className="name">{rest?.name}</div>
                      <div className="descript">
                        {rest?.description_mini ?? "Chưa có mô tả"}
                      </div>
                      <div className="nearly">
                        <div className="item">Cách {rest?.distance_km}km</div>
                        <div className="item">
                          <i className="fa-solid fa-star"></i>
                          {rest?.total_rate ?? "Chưa có đánh giá"}
                        </div>
                      </div>
                      <div className="address">
                        <i className="fa-solid fa-location-dot"></i>
                        {rest?.address ?? "Vị trí đang lỗi!"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="null">
                <div className="icon">
                  <img src={empty} />
                </div>
                <div className="message">Menu đang trống!</div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Nearly_restaurant;
