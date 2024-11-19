import React, { useEffect, useRef, useState } from "react";
import BottomPopup from "../../popup";
import api from "../../../components/api";

const Donhang = ({ onClose, token }) => {
  const popupRef = useRef();
  const [load, setLoad] = useState(false);
  const [myOder, setMyoder] = useState([]);
  const [outloading, setOutloading] = useState(false);
  const closeFast = () => {
    popupRef.current.closePopup();
  };
  useEffect(() => {
    setLoad(true);
    api
      .get(`/my-list-order/`, token)
      .then((res) => {
        console.log(res);
        setMyoder(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOutloading(true);
        setTimeout(() => {
          setLoad(false);
          setOutloading(false);
        }, 200);
      });
  }, []);
  return (
    <>
      {load && (
        <div className="bg-full center load-top">
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
          <div className="list-checkout">
            <div className="h3">
              <div className="icon">
                <i className="fa-regular fa-hourglass-half"></i>
              </div>
              <div className="name">Chờ xác nhận</div>
              <div className="right">
                {myOder?.CREATED?.total_count
                  ? myOder?.CREATED?.total_count + " đơn"
                  : 0}
              </div>
            </div>
            <div className="checkout-list">
              {myOder?.CREATED?.total_count > 0 ? (
                <>
                  {myOder.CREATED?.recent_orders.map((oder) => (
                    <div className="items" key={oder.id}>
                      <div className="res">
                        <div className="name">{oder.restaurant}</div>
                        <div className="key">
                          #HD-{oder.OrderKey.slice(0, 7)}...
                          {oder.OrderKey.slice(-4)}
                        </div>
                      </div>
                      <div className="list-items">
                        <table>
                          <tbody>
                            {oder.items.slice(0, 3).map((item, idx) => (
                              <tr key={idx}>
                                <td>{item.name}</td>
                                <td>*{item.quantity}</td>
                                <td>{item.price.toLocaleString("vi-VN")}đ</td>
                                <td>
                                  {(item.quantity * item.price).toLocaleString(
                                    "vi-VN"
                                  )}
                                  đ
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {oder?.custom_notes && (
                        <div className="res notes">
                          <i className="fa-regular fa-note-sticky"></i>
                          {oder?.custom_notes}
                        </div>
                      )}
                      <div className="res">
                        <div className="left">
                          Tổng:{" "}
                          <div className="price">
                            {oder.items
                              .reduce(
                                (sum, item) => sum + item.price * item.quantity,
                                0
                              )
                              .toLocaleString("vi-VN")}
                            đ
                          </div>
                        </div>
                        <div className="right">
                          {api.timeSinceOrder(oder.created_at)}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="null">
                  <div className="icon p-2">
                    <i className="fa-solid fa-receipt"></i>
                  </div>
                  <div className="message">Danh sách trống!</div>
                </div>
              )}
            </div>
            <div className="h3">
              <div className="icon">
                <i className="fa-solid fa-truck-fast"></i>
              </div>
              <div className="name">Đang giao</div>
            </div>
            <div className="checkout-list">
              <div className="null">
                <div className="icon p-2">
                  <i className="fa-solid fa-receipt"></i>
                </div>
                <div className="message">Danh sách trống!</div>
              </div>
            </div>
            <div className="h3">
              <div className="icon">
                <i className="fa-solid fa-file-circle-check"></i>
              </div>
              <div className="name">Đã hoàn thành</div>
            </div>
            <div className="checkout-list">
              <div className="null">
                <div className="icon p-2">
                  <i className="fa-solid fa-receipt"></i>
                </div>
                <div className="message">Danh sách trống!</div>
              </div>
            </div>
          </div>
        )}
      </BottomPopup>
    </>
  );
};

export default Donhang;
