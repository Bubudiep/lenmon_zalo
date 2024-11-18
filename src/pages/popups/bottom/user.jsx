import React, { useRef } from "react";
import BottomPopup from "../../popup";

const User_info = ({ onClose, token }) => {
  const popupRef = useRef();
  const closeFast = () => {
    popupRef.current.closePopup();
  };
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
      )}
    </BottomPopup>
  );
};
export default User_info;
