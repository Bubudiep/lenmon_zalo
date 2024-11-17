import React, { useRef } from "react";
import BottomPopup from "../../popup";

const User_info = ({ onClose }) => {
  const popupRef = useRef();
  const closeFast = () => {
    popupRef.current.closePopup();
  };
  return (
    <BottomPopup ref={popupRef} title={false} onClose={onClose}>
      <div className="taikhoan">
        <div className="giohang">
          <div className="null">
            <div className="icon p-2">
              <i className="fa-regular fa-id-card"></i>
            </div>
            <div className="message">Cũng chưa có gì!</div>
          </div>
        </div>
      </div>
    </BottomPopup>
  );
};
export default User_info;
