import React, { useEffect, useRef, useState } from "react";
import BottomPopup from "../popup";
import api from "../../components/api";
import table from "../../img/table.png";

const Quanan_popup = ({
  onClose,
  id_item,
  token,
  loadItem,
  from,
  setFromSearch,
}) => {
  const popupRef = useRef();
  const [restData, setRestData] = useState({});
  const [loading, setLoading] = useState(false);
  const [outloading, setOutloading] = useState(false);
  const [isLike, setIslike] = useState(false);
  const [totalLike, settotalLike] = useState(0);
  const [isFollow, setIsfollow] = useState(false);
  const [totalFollow, settotalFollow] = useState(0);
  const closeFast = () => {
    popupRef.current.closePopup();
  };
  console.log(id_item);
  useEffect(() => {
    setLoading(true);
    api
      .get(`/restaurant-view/${id_item}/?from=${from}`, token)
      .then((response) => {
        console.log(response);
        setRestData(response);
        setIslike(response?.isLike);
        setIsfollow(response?.isFollow);
        settotalLike(response?.totalLike);
        settotalFollow(response?.totalFollow);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setOutloading(true);
        setTimeout(() => {
          setLoading(false);
          setOutloading(false);
        }, 200);
      });
  }, []);
  const handleLike = () => {
    api
      .post(
        "/user-log-action/",
        {
          type: "like",
          action: isLike ? "no" : "yes",
          target: "restaurant",
          item: id_item,
        },
        token
      )
      .then((response) => {
        if (response.data == true) {
          if (isLike == false) {
            settotalLike(totalLike + 1);
          }
        } else {
          if (isLike == true) {
            settotalLike(totalLike - 1);
          }
        }
        setIslike(response.data);
      });
  };
  const handleFollow = () => {
    api
      .post(
        "/user-log-action/",
        {
          type: "follow",
          action: isFollow ? "no" : "yes",
          target: "restaurant",
          item: id_item,
        },
        token
      )
      .then((response) => {
        if (response.data == true) {
          if (isFollow == false) {
            settotalFollow(totalFollow + 1);
          }
        } else {
          if (isFollow == true) {
            settotalFollow(totalFollow - 1);
          }
        }
        setIsfollow(response.data);
      });
  };
  return (
    <>
      {loading && (
        <div className="bg-full center load-top">
          <div className={`detectOut ${outloading ? "fade-out" : "fade-in"}`} />
          <div
            className={`loading-spinner ${outloading ? "fade-out" : "fade-in"}`}
          ></div>
        </div>
      )}
      <BottomPopup ref={popupRef} title={false} onClose={onClose}>
        {!token ? (
          <div className="not-login">
            <div className="icon">
              <i className="fa-solid fa-frog"></i>
            </div>
            <div className="message">Bạn chưa đăng nhập!</div>
          </div>
        ) : (
          <>
            <div className="details_items">
              <div className="rest-details">
                <div className="avatar">
                  <div className="img">
                    <img src={restData?.avatar} />
                  </div>
                </div>
                <div className="rest-name">
                  <div className="name">{restData?.name ?? "Chưa đặt tên"}</div>
                  <div className="rest-category">
                    {restData?.mohinh ?? "Chưa phân loại"}
                  </div>
                </div>
                <div className="rest-sort">
                  <div className="items">
                    <div className="icon">0</div>
                    <div className="value">Đánh giá</div>
                  </div>
                  <div className="items">
                    <div className="icon">
                      {restData?.menu?.length > 0 &&
                        restData?.menu[0].items.length}
                    </div>
                    <div className="value">Sản phẩm</div>
                  </div>
                  <div className="items">
                    <div className="icon">{totalFollow}</div>
                    <div className="value">Theo dõi</div>
                  </div>
                  <div className="items">
                    <div className="icon">{totalLike}</div>
                    <div className="value">Yêu thích</div>
                  </div>
                </div>
                <div className="rest-more-details">
                  <div className="items">
                    <div className="name">Điện thoại</div>
                    <div className="value">{restData?.phone_number}</div>
                  </div>
                  <div className="items">
                    <div className="name">Địa chỉ</div>
                    <div className="value">{restData?.address}</div>
                  </div>
                  <div className="items">
                    <div className="name">Mở cửa</div>
                    <div className="value">
                      {restData?.openTime && restData?.closeTime
                        ? `
                Hoạt động từ ${restData?.openTime} đến ${restData?.closeTime} (hằng ngày)`
                        : `Mở cửa cả ngày`}
                    </div>
                  </div>
                  <div className="itemss">
                    <div className="option">
                      {restData?.Oder_online
                        ? "Đặt online"
                        : "Không đặt online"}
                    </div>
                    <div className="option">
                      {restData?.Takeaway ? "Gói mang đi" : "Ăn tại quầy"}
                    </div>
                  </div>
                </div>
                <div className="rest-layout">
                  <div className="p-layout">
                    {restData?.layouts?.map((layout) => (
                      <div key={layout.id} className="layout">
                        {layout.groups.map((group) => (
                          <div key={group.id} className="room">
                            <div className="room-name">
                              <div className="name">{group.name}</div>
                            </div>
                            <div className="room-layout">
                              {group.spaces.map((space) => (
                                <div key={space.id} className="table">
                                  <div className="status">
                                    {space.is_ordering ? "Đã đặt" : "Trống"}
                                  </div>
                                  <div className="icon">
                                    <img src={table} alt="Table Icon" />
                                  </div>
                                  <div className="name">{space.name}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rest-layout">
                  <div className="h3">Sự kiện (0)</div>
                  <div className="layout">
                    <div className="null">
                      <div className="icon p-2">
                        <i className="fa-solid fa-clone"></i>
                      </div>
                      <div className="message">Chưa có sự kiện nào!</div>
                    </div>
                  </div>
                </div>
                <div className="rest-layout mb-[68px]">
                  <div className="h3">Đánh giá (0)</div>
                  <div className="layout">
                    <div className="null">
                      <div className="icon p-2">
                        <i className="fa-solid fa-clone"></i>
                      </div>
                      <div className="message">Chưa có đánh giá!</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="details_items-tools">
                <div className="left">
                  <div
                    className={`like ${isLike ? "active" : ""}`}
                    onClick={handleLike}
                  >
                    {isLike ? (
                      <>
                        <i className="fa-solid fa-thumbs-up"></i>Đã thích
                      </>
                    ) : (
                      <>
                        <i className="fa-regular fa-thumbs-up"></i>Yêu thích
                      </>
                    )}
                  </div>
                  <div
                    className={`follow ${isFollow ? "active" : ""}`}
                    onClick={handleFollow}
                  >
                    {isFollow ? (
                      <>
                        <i className="fa-solid fa-heart"></i>Đang follow
                      </>
                    ) : (
                      <>
                        <i className="fa-regular fa-heart"></i>Theo dõi
                      </>
                    )}
                  </div>
                </div>
                <div className="tools pr-2">
                  <button className="access">Vào trang của quán</button>
                </div>
              </div>
            </div>
          </>
        )}
      </BottomPopup>
    </>
  );
};

export default Quanan_popup;
