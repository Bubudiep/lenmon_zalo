import React, { useEffect, useState } from "react";
import api from "../../components/api";
import empty from "../../img/empty.png";
const Moidang = ({ user, loadItem }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  console.log(user);

  const CardLoading = () => {
    return (
      <div className="card">
        <div className="image loading animate-pulse bg-gray-300"></div>
        <div className="info loading gap-1 flex flex-col p-1">
          <div className="animate-pulse bg-gray-300 w-10 h-4 rounded-lg"></div>
          <div className="animate-pulse bg-gray-300 w-16 h-3 rounded-lg"></div>
          <div className="animate-pulse bg-gray-300 w-full h-3 rounded-lg"></div>
        </div>
      </div>
    );
  };
  useEffect(() => {
    const getNew = async () => {
      api
        .get(`/res-new/`, user?.app?.access_token)
        .then((response) => {
          setLoading(false);
          setData(response ?? []);
        })
        .catch((error) => {
          setError("Phát sinh lỗi khi lấy dữ liệu, vui lòng thử lại sau!");
        });
    };
    getNew();
  }, []);
  return (
    <div className="section">
      <h3>
        <i className="fa-solid fa-fire-flame-curved"></i> Mới được thêm vào
      </h3>
      <div className="grid">
        {error ? (
          <div className="error">
            <p>{error}</p>
          </div>
        ) : loading ? (
          <>
            {Array.from({ length: 6 }).map((_, index) => (
              <CardLoading key={index} />
            ))}
          </>
        ) : (
          <>
            {data.length > 0 ? (
              data.map((item, index) => (
                <div
                  className="card"
                  key={index}
                  onClick={() => {
                    loadItem(item.id); // Pass item id when clicked
                  }}
                >
                  <div className="image">
                    <img src={item?.image64_mini ?? "#"} />
                  </div>
                  <div className="info">
                    <div className="top">
                      <div className="price">
                        {(item?.price ?? 0).toLocaleString("vi-VN")}đ
                      </div>
                      <div className="rate">
                        <i className="fa-regular fa-star"></i> 5.0
                      </div>
                    </div>
                    <div className="name">{item?.name}</div>
                    <div className="res">
                      <div className="name">{item?.restaurant?.name}</div>
                      <div className="address">
                        <i className="fa-solid fa-location-dot"></i>{" "}
                        {item?.restaurant?.address?.display_name ??
                          "Chưa có vị trí"}
                      </div>
                    </div>
                  </div>
                </div>
              ))
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

export default Moidang;
