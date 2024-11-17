import React, { useRef } from "react";
import BottomPopup from "../../popup";

const Giohang = ({ onClose }) => {
  const popupRef = useRef();
  const closeFast = () => {
    popupRef.current.closePopup();
  };
  return (
    <BottomPopup ref={popupRef} title="GIỎ HÀNG" onClose={onClose}>
      <div className="giohang">
        <div className="null">
          <div className="icon p-2">
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
          <div className="message">Chưa có gì!</div>
        </div>
      </div>
    </BottomPopup>
  );
};

export default Giohang;
