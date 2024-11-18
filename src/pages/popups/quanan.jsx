import React, { useEffect, useRef, useState } from "react";
import BottomPopup from "../popup";
import api from "../../components/api";
import table from "../../img/table.png";

const Quanan_popup = ({ onClose, id_item, token }) => {
  const popupRef = useRef();
  const [restData, setRestData] = useState({});
  const closeFast = () => {
    popupRef.current.closePopup();
  };
  console.log(id_item);
  useEffect(() => {
    api
      .get(`/restaurant-view/${id_item}/`, token)
      .then((response) => {
        console.log(response);
        setRestData(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
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
                  <div className="icon">{restData?.menu?.length}</div>
                  <div className="value">Sản phẩm</div>
                </div>
                <div className="items">
                  <div className="icon">100%</div>
                  <div className="value">Nhận đơn</div>
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
                    {restData?.Oder_online ? "Đặt online" : "Không đặt online"}
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
                <div className="h3">Thực đơn</div>
                <div className="tlayout">
                  {restData?.menu &&
                  restData?.menu.length > 0 &&
                  restData?.menu[0].items.length > 0 ? (
                    <div className="list-menu">
                      {restData?.menu[0].items.map((its, inx) => (
                        <div className="items" key={its.id}>
                          <div className="image">
                            <img src={its.image64_mini} />
                          </div>
                          <div className="name">{its?.name}</div>
                          <div className="price">
                            {its?.price &&
                              its?.price.toLocaleString("vi-VN") + "đ"}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="null">
                      <div className="icon p-2">
                        <i className="fa-solid fa-clone"></i>
                      </div>
                      <div className="message">Chưa có sản phẩm nào!</div>
                    </div>
                  )}
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
              <div className="rest-layout">
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
          </div>
        </>
      )}
    </BottomPopup>
  );
};

export default Quanan_popup;
