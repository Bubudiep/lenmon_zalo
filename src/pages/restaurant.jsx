import React, { useEffect, useRef, useState } from "react";
import api from "../components/api";
import logo from "../img/logo.png";
import { useLocation } from "react-router-dom";
import LoginPopup from "./layouts/login-popup";
import Restaurant_layout from "./restaurants/res-layout";
import Restaurant_menu from "./restaurants/res-menu";
import Restaurant_pupup from "./restaurants/res-popup";
import Restaurant_cart from "./restaurants/res-cart";
import Restaurant_order from "./restaurants/res-order";
import { io } from "socket.io-client";

const Restaurant = () => {
  const [user, setUser] = useState(false);
  const [tabActive, setTabActive] = useState("layouts");
  const [loading, setLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [restData, setRestData] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const location = useLocation();
  const [token, settoken] = useState(location?.state?.token ?? false);
  const [id, setid] = useState(location?.state?.id ?? false);
  const [itemQTY, setItemQTY] = useState([]);
  const getIdFromQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get("id");
  };
  const fetchRestaurantData = async (restaurantId, accessToken) => {
    setLoading(true);
    try {
      const response = await api.get(
        `/restaurant-view/${restaurantId}/?from=false`,
        accessToken
      );
      setRestData(response);
    } catch (error) {
      setShowLogin(true);
      console.error("Error fetching restaurant data:", error);
    } finally {
      setLoading(false);
      setTimeout(() => setIsShow(true), 500); // Thêm hiệu ứng hiển thị
    }
  };
  const handleAddItem = (e) => {
    if (e?.id) {
      setItemQTY((old) => {
        const exists = old.some((item) => item.id === e.id);
        if (!exists) {
          return [...old, e]; // Thêm vào nếu chưa tồn tại
        }
        return old; // Giữ nguyên nếu đã tồn tại
      });
    }
  };
  const handleRemoveItem = (e) => {
    if (e?.id) {
      setItemQTY((old) => old.filter((item) => item.id !== e.id));
    }
  };
  const setoderSuccess = (e) => {
    if (e.data) {
      setRestData((old) => ({
        ...old,
        myOrder: [e.data, ...(old.myOrder || [])],
      }));
      setTabActive("my_order");
      setItemQTY([]);
    }
  };
  useEffect(() => {
    const restaurantId = id || getIdFromQuery();
    if (user?.app?.access_token) {
      settoken(user?.app?.access_token);
    }
    const accessToken = token;
    if (restaurantId && accessToken) {
      fetchRestaurantData(restaurantId, accessToken);
    } else {
      setShowLogin(true);
      setLoading(false);
    }

    const newSocket = io("http://localhost:3009", {
      transports: ["websocket"],
      auth: {
        token: token,
      },
    });
    newSocket.on("connect", () => {
      console.log("connected!");
      newSocket.on("message", (data) => {
        console.log("Received message:", data);
      });
      newSocket.on("private_event", (data) => {
        console.log("Received message:", data);
      });
    });
    newSocket.on("disconnect", () => {
      console.log("Disconnected to socket server on port 3009");
    });
    return () => {
      newSocket.disconnect();
    };
  }, [user]);
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
      {isShow && restData && token && (
        <>
          <div className="restaurant-landing">
            <Restaurant_pupup itemQTY={itemQTY} showCart={setShowCart} />
            {showCart && (
              <Restaurant_cart
                itemQTY={itemQTY}
                restData={restData}
                token={token}
                setoderSuccess={setoderSuccess}
                onClose={() => {
                  setShowCart(false);
                }}
              />
            )}
            <div className="can-scroll">
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
                      <img
                        src={restData.avatar || logo}
                        alt="Restaurant Avatar"
                      />
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
                    <div className="icon">{restData?.totalFollow ?? 0}</div>
                    <div className="value">Theo dõi</div>
                  </div>
                  <div className="items">
                    <div className="icon">{restData?.totalLike ?? 0}</div>
                    <div className="value">Yêu thích</div>
                  </div>
                </div>
              </div>
              <div className="body-container">
                <div className="tabs">
                  <div className="items">
                    <div
                      className={`button ${
                        tabActive === "layouts" ? "active" : ""
                      }`}
                      onClick={() => setTabActive("layouts")}
                    >
                      Tổng quan
                    </div>
                  </div>
                  <div className="items">
                    <div
                      className={`button ${
                        tabActive === "menus" ? "active" : ""
                      }`}
                      onClick={() => setTabActive("menus")}
                    >
                      Thực đơn{" "}
                      {itemQTY.length > 0 && (
                        <div className="count">{itemQTY.length}</div>
                      )}
                    </div>
                  </div>
                  <div className="items">
                    <div
                      className={`button ${
                        tabActive === "my_order" ? "active" : ""
                      }`}
                      onClick={() => setTabActive("my_order")}
                    >
                      Đơn của tôi{" "}
                      {restData?.myOrder.length > 0 && (
                        <div className="count">{restData.myOrder.length}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="rest-details">
                  {tabActive === "layouts" && restData.layouts && (
                    <Restaurant_layout restData={restData} />
                  )}
                  {tabActive === "menus" && restData.menu && (
                    <Restaurant_menu
                      itemQTY={itemQTY}
                      restData={restData}
                      addItem={handleAddItem}
                      removeItem={handleRemoveItem}
                      addSave={(e) => {
                        handleAddItem(e);
                        setShowCart(true);
                      }}
                    />
                  )}
                  {tabActive === "my_order" && restData.myOrder && (
                    <Restaurant_order
                      restData={restData}
                      token={token}
                      setRestData={setRestData}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Restaurant;
