import React, { useRef } from "react";
import BottomPopup from "../../popup";

const Donhang = ({ onClose }) => {
  const popupRef = useRef();
  const closeFast = () => {
    popupRef.current.closePopup();
  };
  return (
    <BottomPopup ref={popupRef} title={false} onClose={onClose}>
      <div className="list-checkout">
        <div className="h3">
          <div className="icon">
            <i className="fa-solid fa-truck-fast"></i>
          </div>
          <div className="name">Đơn hàng đang giao</div>
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
          <div className="name">Đơn hàng đã hoàn thành</div>
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
    </BottomPopup>
  );
};

export default Donhang;
