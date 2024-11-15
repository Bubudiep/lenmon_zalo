import React, { useEffect, useState } from "react";
import "../css/qr_login.scss";
import { getAccessToken, getSetting, getUserInfo } from "zmp-sdk";
import logo from "../img/logo.png";
import { authorize, closeApp, getPhoneNumber } from "zmp-sdk/apis";
import api from "../components/api";
const QR_login = () => {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ckbox, setCkbox] = useState(true);
  const [message, setMassage] = useState(null);
  const [logined, setLogined] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);
  const keyValue = queryParams.get("key");
  useEffect(() => {
    getUserInfo({
      success: (data) => {
        const { userInfo } = data;
        console.log(userInfo);
        setUsername(userInfo.name);
      },
      fail: (error) => {
        console.log(error);
      },
    });
  }, []);
  const app_key = import.meta.env.VITE_ZALO_KEY;
  const getToken = () => {
    return new Promise((resolve, reject) => {
      getAccessToken({
        success: (Token) => {
          resolve(Token);
        },
        fail: () => {
          resolve(null); // Hoặc reject nếu muốn xử lý lỗi khác
        },
      });
    });
  };
  const getPhone = async () => {
    const access_token = await getToken();
    console.log("access token", access_token);
    return new Promise((resolve, reject) => {
      getPhoneNumber({
        success: async (data) => {
          const { token } = data;
          console.log("phone token", data);
          try {
            const response = await api.gets(
              "https://graph.zalo.me/v2.0/me/info",
              {
                access_token: access_token,
                code: token,
                secret_key: app_key,
              }
            );
            resolve(response.data.number);
          } catch (error) {
            reject(error);
          }
        },
        fail: () => {
          resolve(null);
        },
      });
    });
  };
  const login = (debug = true) => {
    getUserInfo({
      success: async (userInfo) => {
        let phone = "";
        if (debug) {
          phone = await getPhone();
        }
        api
          .post("/zlogin/", {
            zalo_id: userInfo.userInfo.id,
            zalo_phone: phone,
            zalo_name: userInfo.userInfo.name,
            zalo_avatar: userInfo.userInfo.avatar,
            key: keyValue,
          })
          .then((response) => {
            setLoading(false);
            setLogined(true);
          })
          .catch((error) => {
            console.log(error);
            api
              .post("/register/", {
                zalo_id: userInfo.userInfo.id,
                username: userInfo.userInfo.id,
                password: api.random(10),
                zalo_name: userInfo.userInfo.name,
                zalo_avatar: userInfo.userInfo.avatar,
                email: userInfo.userInfo.id + "@gmail.com",
                zalo_phone: phone,
                key: keyValue,
              })
              .then((response) => {
                setLoading(false);
                setLogined(true);
              });
          });
      },
      fail: (error) => {
        console.log(error);
      },
    });
  };
  const handleStart = () => {
    setLoading(true);
    getSetting({
      success: (setting) => {
        console.log(setting.authSetting);
        if (
          setting.authSetting["scope.userInfo"] &&
          setting.authSetting["scope.userPhonenumber"]
        ) {
          if (
            setting.authSetting["scope.userInfo"] == true &&
            setting.authSetting["scope.userPhonenumber"] == true
          ) {
            console.log("Đã cấp quyền");
            login();
          } else {
            console.log("Chưa cấp quyền");
            authorize({
              scopes: ["scope.userInfo", "scope.userPhonenumber"],
              success: (data) => {
                login();
              },
              fail: (error) => {
                console.log(error);
                setLoading(false);
                setMassage("Chưa có dữ liệu cấp quyền Zalo!");
              },
            });
          }
        } else {
          login(false);
          console.log("Không có config");
        }
      },
      fail: (error) => {
        console.log(error);
        navigate("/start");
      },
    });
  };
  const closeMiniApp = async () => {
    try {
      await closeApp({});
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogin = async () => {
    getUserInfo({
      success: (data) => {
        const { userInfo } = data;
        console.log(userInfo);
        setUsername(userInfo.name);
      },
      fail: (error) => {
        console.log(error);
      },
    });
  };
  return username && keyValue ? (
    <div className="qr-login-page">
      <div className="h1">Đăng nhập</div>
      <div className="logo">
        <img src={logo} />
      </div>
      <div className="hello">Xin chào, {username}</div>
      <div className="hint">Bạn đang yêu cầu đăng nhập bằng QRCode</div>
      <div className="hint2">
        Chúng tôi cần một vài thông tin sau để xác minh bạn đang đăng nhập:
      </div>
      <div className="policy">
        <div className="items">
          <div className="count">1</div> Ảnh đại diện
        </div>
        <div className="items">
          <div className="count">2</div> Tên gọi
        </div>
        <div className="items">
          <div className="count">3</div> Số điện thoại đăng ký
        </div>
      </div>
      <div className="accpt-ply">
        <input
          type="checkbox"
          checked={ckbox}
          onChange={(e) => {
            setCkbox(e.target.checked);
          }}
        />{" "}
        Cho phép truy cập thông tin
      </div>
      {message && <div className="error">message</div>}
      <div className="accept">
        <button className="accept" disabled={!ckbox} onClick={handleStart}>
          {loading && (
            <div className="p-3">
              <div className="loading-spinner"></div>
            </div>
          )}
          Đăng nhập
        </button>
      </div>
      <div className="exit" onClick={closeMiniApp}>
        Thoát
      </div>
    </div>
  ) : (
    ""
  );
};

export default QR_login;
