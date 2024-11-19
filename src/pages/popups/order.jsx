import React, { useRef, useState } from "react";
import BottomPopup from "../popup";
import api from "../../components/api";
import order_success from "../../img/order_sucess.png";

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
  const [addressLat, setAddressLat] = useState(null);
  const [addressLon, setAddressLon] = useState(null);
  const [LoadOder, setLoadOder] = useState(false);
  const [oderSuccess, setoderSuccess] = useState(false);
  const popupRef = useRef();
  const handleScroll = () => {
    popupRef.current.canScroll(false);
  };
  const handleDathang = () => {
    setLoadOder(true);
    api
      .post(
        `/oder-fast/`,
        {
          items: id_item.data.id,
          qty: itemQTY,
          coupon: null,
          phone: userPhone ?? null,
          address: {
            all: address ?? null,
            lat: addressLat ?? null,
            lon: addressLon ?? null,
          },
          time: timeShip,
          notes: notes,
        },
        token
      )
      .then((res) => {
        console.log(res);
        setoderSuccess(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadOder(false);
      });
  };
  const handlePos = async () => {
    let user_pos = await api.getUserpos();
    if (!user_pos) {
      user_pos = await api.getAddress();
    }
    console.log(user_pos, user_pos.lat, user_pos.long);
    setAddressLat(user_pos.lat);
    setAddressLon(user_pos.long);
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
            {oderSuccess ? (
              <div className="order-success slideIn_mini">
                <div className="icon">
                  <img src={order_success} />
                </div>
                <div className="message">Đặt hàng thành công!</div>
                <div className="hint">
                  <div className="box">
                    Đơn hàng của bạn đã được chuyển đến mục Đơn hàng để tiện
                    theo dõi và kiểm tra tình trạng!
                  </div>
                </div>
                <div className="h3">Chi tiết đơn hàng</div>
                <div className="order-detail">
                  <div className="box">
                    <div className="info">
                      <div className="items">
                        <div className="name">Mã đơn hàng</div>
                        <div className="value">
                          #DH-{oderSuccess.data.OrderKey.slice(0, 7)}...
                          {oderSuccess.data.OrderKey.slice(-3)}
                        </div>
                      </div>
                      <table>
                        <thead>
                          <tr>
                            <th></th>
                            <th>Sản phẩm</th>
                            <th>SL</th>
                            <th>Giá</th>
                            <th>Thành tiền</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="icon">
                                <img src={id_item.data.image64_mini} />
                              </div>
                            </td>
                            <td>{id_item.data.name}</td>
                            <td className="font-medium">{itemQTY}</td>
                            <td className="price">
                              {id_item.data.price.toLocaleString("vi-VN")}đ
                            </td>
                            <td className="price">
                              {(itemQTY * id_item.data.price).toLocaleString(
                                "vi-VN"
                              )}
                              đ
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
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
                      <div className="value">
                        {id_item.data.restaurant.name}
                      </div>
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
                        <button onClick={handlePos}>
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
                          {(itemQTY * id_item.data.price).toLocaleString(
                            "vi-VN"
                          )}
                          đ
                        </div>
                      </div>
                    </div>
                    <div className="right">
                      <button onClick={handleDathang}>
                        {LoadOder ? (
                          <div className="loading-spinner"></div>
                        ) : (
                          <i className="fa-solid fa-cart-shopping"></i>
                        )}
                        Đặt hàng
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </BottomPopup>
    </>
  );
};

export default Order_fast;
