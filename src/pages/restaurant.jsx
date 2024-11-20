import React, { useEffect, useState } from "react";
import api from "../components/api";
import logo from "../img/logo.png";
import { useLocation } from "react-router-dom";
import LoginPopup from "./layouts/login-popup";
import Restaurant_layout from "./restaurants/res-layout";
import Restaurant_menu from "./restaurants/res-menu";

const Restaurant = () => {
  const [user, setUser] = useState(false);
  const [tabActive, setTabActive] = useState("layouts");
  const [loading, setLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [restData, setRestData] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  const { id, token } = location.state || {};

  // Lấy id từ query string
  const getIdFromQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get("id");
  };

  // Xử lý fetch dữ liệu từ API
  const fetchRestaurantData = async (restaurantId, accessToken) => {
    setLoading(true);
    try {
      const response = await api.get(
        `/restaurant-view/${restaurantId}/?from=false`,
        accessToken
      );
      setRestData(response);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    } finally {
      setLoading(false);
      setTimeout(() => setIsShow(true), 500); // Thêm hiệu ứng hiển thị
    }
  };

  useEffect(() => {
    const restaurantId = id || getIdFromQuery();
    const accessToken = token || user?.app?.access_token;

    if (restaurantId && accessToken) {
      fetchRestaurantData(restaurantId, accessToken);
    } else {
      setShowLogin(true);
      setLoading(false);
    }
  }, [id, token, user]);

  return (
    <>
      {loading && (
        <div className={`full-load ${isShow ? "fadeOut" : ""}`}>
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="loading-spinner" />
        </div>
      )}

      {showLogin && (
        <LoginPopup onClose={() => setShowLogin(false)} setUser={setUser} />
      )}

      {isShow && restData && (
        <div className="restaurant-landing">
          {/* Thông tin cơ bản */}
          <div
            className="top-container"
            style={{
              backgroundImage: 'url("' + restData?.wallpaper + '")',
              backgroundSize: "cover", // Tùy chọn, giúp ảnh phủ kín
              backgroundPosition: "center", // Tùy chọn, căn chỉnh vị trí
              backgroundRepeat: "no-repeat", // Tùy chọn, tránh lặp lại ảnh
            }}
          >
            <div className="top">
              <div className="avatar">
                <div className="img">
                  <img src={restData.avatar || logo} alt="Restaurant Avatar" />
                </div>
              </div>
              <div className="info">
                <div className="name">{restData.name}</div>
                <div className="mohinh">
                  <div className="items">{restData.phone_number}</div>
                  <div className="items">{restData.mohinh}</div>
                </div>
                <div className="address">{restData.address}</div>
              </div>
            </div>
            <div className="rest-sort">
              <div className="items">
                <div className="icon">0</div>
                <div className="value">Đánh giá</div>
              </div>
              <div className="items">
                <div className="icon">
                  {restData?.menu?.length > 0
                    ? restData.menu[0].items.length
                    : 0}
                </div>
                <div className="value">Sản phẩm</div>
              </div>
              <div className="items">
                <div className="icon">0</div>
                <div className="value">Theo dõi</div>
              </div>
              <div className="items">
                <div className="icon">0</div>
                <div className="value">Yêu thích</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="body-container">
            <div className="tabs">
              <div className="items">
                <div
                  className={`button ${
                    tabActive === "layouts" ? "active" : ""
                  }`}
                  onClick={() => setTabActive("layouts")}
                >
                  Tình trạng
                </div>
              </div>
              <div className="items">
                <div
                  className={`button ${tabActive === "menus" ? "active" : ""}`}
                  onClick={() => setTabActive("menus")}
                >
                  Thực đơn
                </div>
              </div>
            </div>

            {/* Nội dung tab */}
            <div className="rest-details">
              {tabActive === "layouts" && restData.layouts && (
                <Restaurant_layout restData={restData} />
              )}
              {tabActive === "menus" && restData.menu && (
                <Restaurant_menu restData={restData} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Restaurant;
