import React, { useRef, useState } from "react";
import BottomPopup from "../popup";

const Order_fast = ({ token, id_item, onClose, from, user }) => {
  console.log(id_item, user);
  const [itemQTY, setItemQTY] = useState(parseInt(id_item.qty));
  const [notes, setNotes] = useState("");
  const [timeShip, setTimeship] = useState(
    new Date(new Date().getTime() + 7 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 16)
  );
  const [userPhone, setuserPhone] = useState(
    user?.app?.user?.profile?.zalo_phone
  );
  const [address, setAddress] = useState(user?.location?.display_name);
  const popupRef = useRef();
  const handleScroll = () => {
    popupRef.current.canScroll(false);
  };
  return (
    <>
      <BottomPopup ref={popupRef} title="XÁC NHẬN ĐƠN HÀNG" onClose={onClose}>
        {!token ? (
          <div className="not-login">
            <div className="icon">
              <i className="fa-solid fa-frog"></i>
            </div>
            <div className="message">Bạn chưa đăng nhập!</div>
          </div>
        ) : !id_item ? (
          <div className="not-login">
            <div className="icon">
              <i className="fa-solid fa-frog"></i>
            </div>
            <div className="message">Sản phẩm này không khả dụng!</div>
          </div>
        ) : (
          <>
            <div className="order-container">
              <div className="p-2 pb-[68px]">
                <div className="items">
                  <div className="image">
                    <div className="box">
                      <img src={id_item.data.image64_mini} />
                    </div>
                  </div>
                  <div className="details">
                    <div className="name">{id_item.data.name}</div>
                    <div className="price">
                      {id_item.data.price.toLocaleString("vi-VN")}đ
                    </div>
                    <div className="option">-</div>
                  </div>
                  <div className="qty">
                    <div
                      className="button"
                      onClick={() => {
                        setItemQTY(itemQTY + 1);
                      }}
                    >
                      +
                    </div>
                    <div className="value">
                      <input
                        type="number"
                        value={itemQTY}
                        onChange={(e) => {
                          setItemQTY(parseInt(e.target.value));
                        }}
                      />
                    </div>
                    <div
                      className="button"
                      onClick={() => {
                        if (itemQTY > 1) setItemQTY(itemQTY - 1);
                      }}
                    >
                      -
                    </div>
                  </div>
                </div>
                <div className="h3">Gửi từ</div>
                <div className="rest-data">
                  <div className="od-items">
                    <div className="name">Tên quán</div>
                    <div className="value">{id_item.data.restaurant.name}</div>
                  </div>
                  <div className="od-items">
                    <div className="name">Điện thoại</div>
                    <div className="value">
                      {id_item.data.restaurant.phone_number}
                    </div>
                  </div>
                  <div className="od-items">
                    <div className="name">Địa chỉ quán</div>
                    <div className="value">
                      {id_item.data.restaurant.address}
                    </div>
                  </div>
                </div>
                <div className="h3">Đến người nhận</div>
                <div className="rest-data">
                  <div className="od-items">
                    <div className="name">Tên zalo</div>
                    <div className="value">{user.zalo.name}</div>
                  </div>
                  <div className="od-items">
                    <div className="name">Điện thoại</div>
                    <div className="value">
                      <input
                        type="text"
                        value={userPhone}
                        placeholder="0321.3213.21"
                        className="phone"
                        onChange={(e) => {
                          setuserPhone(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="od-items">
                    <div className="name">Vị trí</div>
                    <div className="value flex gap-1">
                      <input
                        type="text"
                        value={address}
                        className="fit"
                        placeholder="Địa chỉ"
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                      />
                      <button>
                        <i className="fa-solid fa-location-crosshairs"></i>
                      </button>
                    </div>
                  </div>
                  <div className="od-items">
                    <div className="name">Thời gian nhận</div>
                    <div className="value">
                      <input
                        type="datetime-local"
                        value={timeShip}
                        onChange={(e) => {
                          setTimeship(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="od-items flex notfill gap-2">
                    <div className="icon text-[#999] p-2">
                      <i className="fa-regular fa-note-sticky"></i>
                    </div>
                    <div className="value flex flex-1">
                      <input
                        type="text"
                        value={notes}
                        onChange={(e) => {
                          setNotes(e.target.value);
                        }}
                        placeholder="Nhập ghi chú..."
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottom-box">
                <div className="order-box">
                  <div className="left">
                    <div className="price_total">
                      <div className="value">
                        {(itemQTY * id_item.data.price).toLocaleString("vi-VN")}
                        đ
                      </div>
                    </div>
                  </div>
                  <div className="right">
                    <button>Đặt hàng</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </BottomPopup>
    </>
  );
};

export default Order_fast;
