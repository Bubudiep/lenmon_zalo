import React, { useEffect, useState } from "react";
import api from "../../components/api";
import empty from "../../img/empty.png";

const Today_recommend = ({ user, loadItem }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null); // Changed to hold error message
  console.log(user);

  // Card loading skeleton
  const CardLoading = () => (
    <div className="card">
      <div className="logo-res">
        <div className="img loading animate-pulse bg-gray-300" />
      </div>
      <div className="image">
        <div className="img loading animate-pulse bg-gray-300" />
      </div>
      <div className="info loading gap-1 flex flex-col p-1">
        <div className="animate-pulse bg-gray-300 w-10 h-4 rounded-lg"></div>
        <div className="animate-pulse bg-gray-300 w-16 h-3 rounded-lg"></div>
        <div className="animate-pulse bg-gray-300 w-full h-3 rounded-lg"></div>
      </div>
    </div>
  );

  // Fetch recommendations from API
  const getRecommendations = async () => {
    setLoading(true); // Ensure loading state is true before fetch
    try {
      const response = await api.get(`/recomend/`, user.app.access_token);
      setData(response?.popular_items ?? []);
    } catch (err) {
      setError("Phát sinh lỗi khi lấy dữ liệu, vui lòng thử lại sau!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.app?.access_token) {
      getRecommendations(); // Fetch data when the component mounts
    }
  }, [user]); // Re-run if user changes

  return (
    <div className="section">
      <h3>
        <i className="fa-regular fa-star"></i> Hôm nay ăn gì?
      </h3>

      {/* Error Handling */}
      {error ? (
        <div className="error">
          <p>{error}</p>
        </div>
      ) : loading ? (
        // Display skeleton loading cards
        <>
          {Array.from({ length: 6 }).map((_, index) => (
            <CardLoading key={index} />
          ))}
        </>
      ) : (
        // Recommendations list
        <>
          {data.length > 0 ? (
            <div className="list-2">
              {data.map((od_item, index) => (
                <div
                  className="card"
                  key={index}
                  onClick={() => {
                    loadItem(od_item.id); // Pass item id when clicked
                  }}
                >
                  <div className="image">
                    <img
                      src={od_item?.image64_mini ?? empty} // Use the empty image as fallback
                      alt={od_item?.name ?? "Recommendation Image"} // Add alt text for accessibility
                    />
                  </div>
                  <div className="info">
                    <div className="name">{od_item?.name ?? "No Name"}</div>
                    <div className="res">
                      {od_item?.restaurant?.name ?? "No Restaurant"}
                    </div>
                    <div className="more">
                      <div className="price">
                        {(od_item?.price ?? 0).toLocaleString("vi-VN")}đ
                      </div>
                      <div className="count">
                        {od_item?.paidQTY ?? 0} đã bán
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="null">
              <div className="icon">
                <img src={empty} alt="Empty" />
              </div>
              <div className="message">Menu đang trống!</div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Today_recommend;
