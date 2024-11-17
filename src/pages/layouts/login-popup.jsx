import React, { useRef, useState } from "react";
import BottomPopup from "../popup";
import {
  authorize,
  getAccessToken,
  getPhoneNumber,
  getSetting,
  getUserInfo,
} from "zmp-sdk";
import api from "../../components/api";

const Login_popup = ({ onClose, setUser }) => {
  const [loading, setLoading] = useState(false);
  const popupRef = useRef(); // Create a ref for BottomPopup
  const handleSendClose = () => {
    console.log("Popup is closing, do something here.");
  };
  const handleStart = () => {
    console.log("Bắt đầu đăng nhập!");
    setLoading(true);
    getSetting({
      success: async (setting) => {
        if (
          Object.keys(setting.authSetting).includes("scope.userInfo") &&
          Object.keys(setting.authSetting).includes("scope.userPhonenumber") &&
          Object.keys(setting.authSetting).includes("scope.userLocation")
        ) {
          if (
            setting.authSetting["scope.userInfo"] == true &&
            setting.authSetting["scope.userPhonenumber"] == true &&
            setting.authSetting["scope.userLocation"] == true
          ) {
            console.log("Đã cấp quyền");
            const user_data = await api.login();
            const user_pos = await api.getUserpos();
            if (user_data && user_pos) {
              setUser(user_data);
              setUser((prevUser) => ({
                ...prevUser,
                location: user_pos,
              }));
              popupRef.current.closePopup();
            } else {
              // setShowLogin(true);
            }
          } else {
            console.log("Chưa cấp quyền");
            authorize({
              scopes: ["scope.userInfo", "scope.userPhonenumber"],
              success: (data) => {
                authorize({
                  scopes: ["scope.userLocation"],
                  success: async (data) => {
                    const user_data = await api.login();
                    const user_pos = await api.getUserpos();
                    if (user_data && user_pos) {
                      setUser(user_data);
                      setUser((prevUser) => ({
                        ...prevUser,
                        location: user_pos,
                      }));
                      console.log("Đăng nhập hoàn tất");
                      popupRef.current.closePopup();
                    }
                  },
                  fail: (error) => {
                    console.log(error);
                    setLoading(false);
                  },
                });
              },
              fail: (error) => {
                console.log(error);
                setLoading(false);
              },
            });
          }
        } else {
          console.log("DEBUG");
          const user_data = await api.login(false);
          if (user_data) {
            setUser(user_data);
          }
          if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                // Thành công: Lấy tọa độ
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const user_pos = await api.getAddress(latitude, longitude);
                if (user_pos) {
                  setUser((prevUser) => ({
                    ...prevUser,
                    location: user_pos,
                  }));
                }
                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
              },
              (error) => {
                // Xử lý lỗi
                switch (error.code) {
                  case error.PERMISSION_DENIED:
                    console.error("Người dùng từ chối chia sẻ vị trí.");
                    break;
                  case error.POSITION_UNAVAILABLE:
                    console.error("Không thể xác định vị trí.");
                    break;
                  case error.TIMEOUT:
                    console.error("Hết thời gian yêu cầu vị trí.");
                    break;
                  default:
                    console.error("Lỗi không xác định.");
                    break;
                }
              }
            );
          } else {
            console.log(navigator);
          }
          popupRef.current.closePopup();
          console.log("Không có config");
        }
      },
      fail: (error) => {
        console.log(error);
        setLoading(false);
      },
    });
  };
  return (
    <BottomPopup ref={popupRef} title="ĐĂNG NHẬP" onClose={onClose}>
      <div className="login-box">
        <div className="login-message">
          Để nâng cao trải nghiệm và bảo mật người dùng, chúng tôi cần một vài
          thông tin.
        </div>
        <div className="login-items">
          <div className="items">
            <div className="index">1</div>
            <div className="value">
              Thông tin cá nhân bao gồm: tên zalo, ảnh avatar
            </div>
          </div>
          <div className="items">
            <div className="index">2</div>
            <div className="value">
              Thông tin vị trí để tìm các quán ăn xung quanh, thông tin giao
              hàng.
            </div>
          </div>
          <div className="items">
            <div className="index">3</div>
            <div className="value">
              Thông tin số điện thoại để xác minh đơn hàng và giao hàng
            </div>
          </div>
        </div>
        <div className="bottom-box">
          <button onClick={handleStart}>
            {loading && <div className="loading-spinner" />}CẤP QUYỀN TRUY CẬP
          </button>
        </div>
      </div>
    </BottomPopup>
  );
};

export default Login_popup;
