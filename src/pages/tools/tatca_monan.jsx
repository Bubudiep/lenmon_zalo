import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import api from "../../components/api";
import empty from "../../img/empty.png";

const New_list = forwardRef(({ user, loadItem }, ref) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

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
      setLoading(true);
      api
        .get(`/res-all-items/?page=${page}&page_size=8`, user.app.access_token)
        .then((response) => {
          setLoading(false);
          if (response.results && response.results.length > 0) {
            setData((prevData) => [...prevData, ...response.results]);
          } else {
            setHasMore(false);
          }
        })
        .catch((error) => {
          setLoading(false);
          if (data.length > 0) {
            setHasMore(false);
          } else {
            setError("Phát sinh lỗi khi lấy dữ liệu, vui lòng thử lại sau!");
          }
        });
    };

    getNew();
  }, [page]);

  useImperativeHandle(ref, () => ({
    loadMore: () => {
      if (!loading && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    },
  }));

  const handleScroll = (event) => {
    const bottom =
      event.target.scrollHeight ===
      event.target.scrollTop + event.target.clientHeight;
    if (bottom && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="section">
      <h3>
        <i className="fa-solid fa-fire-flame-curved"></i> Đi dạo
      </h3>
      <div className="grid" onScroll={handleScroll}>
        {error ? (
          <div className="error">
            <p>{error}</p>
          </div>
        ) : loading && data.length === 0 ? (
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
                    loadItem(item.id);
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
            {loading && (
              <div className="card loading">
                <div className="animate-pulse bg-gray-300 w-10 h-4 rounded-lg"></div>
              </div>
            )}
            {!hasMore && (
              <div className="nodata">
                <div className="box">
                  Hiện tại chúng tôi đang cố gắng kêu gọi thêm các quán ăn và
                  quán cafe
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
  9;
});

export default New_list;
