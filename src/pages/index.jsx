import React, { Suspense, useEffect, useRef, useState } from "react";
import { List, Page, Icon, useNavigate } from "zmp-ui";
import UserCard from "../components/user-card";
import { Outlet, Link } from "react-router-dom";
import Topcontainer from "./layouts/topcontainer";
import Navigation_bar from "./layouts/navigation";
import Home_catalog from "./layouts/catalog";
import Home_slider from "./layouts/slider";
import User_wellcome from "./layouts/user_wellcome";
import { authorize, getSetting, getUserInfo } from "zmp-sdk";
import Today_recommend from "./tools/homnay_angi";
import Nearly_restaurant from "./tools/quanan_ogan";
import Noibat_tuan from "./tools/noibat-tuan";
import Moidang from "./tools/moidang";
import New_list from "./tools/tatca_monan";
import Login_popup from "./layouts/login-popup";
import api from "../components/api";
import logo from "../img/logo.png";
import Thongbao from "./popups/bottom/thongbao";
import Giohang from "./popups/bottom/giohang";
import User_info from "./popups/bottom/user";
import Donhang from "./popups/bottom/donhang";
import Monan_popup from "./popups/monan";
import Quanan_popup from "./popups/quanan";
import Order_fast from "./popups/order";

const HomePage = () => {
  const [user, setUser] = useState(false);
  const [fromSearch, setFromSearch] = useState(false);
  const [isOrder, setIsOrder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isFadeOut, setIsFadeOut] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [danhsachGoiyLoading, setDanhsachGoiyLoading] = useState(true);
  const [danhsachGoiy, setDanhsachGoiy] = useState(false);
  const [danhsachGoiyError, setdanhsachGoiyError] = useState(false);
  const newListRef = useRef();
  const [isloadItem, setIsloadItem] = useState(false);
  const [isloadRestaurant, setIsloadRestaurant] = useState(false);
  const [openItems, setOpenItems] = useState([]);
  const openItem = (id) => {
    if (!openItems.includes(id)) setOpenItems((prev) => [...prev, id]);
  };
  const closeItem = (id) => {
    setOpenItems((prev) => prev.filter((itemId) => itemId !== id));
  };
  const handleStart = async () => {
    setLoading(true);
    const setting = await api.getUSetting();
    const authSettings = setting?.authSetting || {};
    getSetting({
      success: async (setting) => {
        console.log(setting.authSetting);
        if (
          Object.keys(setting.authSetting).includes("scope.userInfo") &&
          Object.keys(setting.authSetting).includes("scope.userPhonenumber") &&
          Object.keys(setting.authSetting).includes("scope.userLocation")
        ) {
          if (
            setting.authSetting["scope.userInfo"] == true &&
            setting.authSetting["scope.userLocation"] == true &&
            setting.authSetting["scope.userPhonenumber"] == true
          ) {
            const user_data = await api.login();
            const user_pos = await api.getUserpos();
            if (user_data && user_pos) {
              setUser({
                ...user_data,
                location: user_pos,
              });
              console.log("xxxx");
            } else {
              setShowLogin(true);
            }
            setTimeout(() => {
              setIsFadeOut(true);
              setTimeout(() => {
                setIsShow(true);
              }, 100); // Đợi thêm 0.5s trước khi đặt setIsloading(false)
              setTimeout(() => {
                setLoading(false);
              }, 600); // Đợi thêm 0.5s trước khi đặt setIsloading(false)
            }, 500); // Đợi 0.5s trước khi đặt setIsFadeOut(true)
          } else {
            setTimeout(() => {
              setIsFadeOut(true);
              setTimeout(() => {
                setIsShow(true);
                setShowLogin(true);
              }, 100); // Đợi thêm 0.5s trước khi đặt setIsloading(false)
              setTimeout(() => {
                setLoading(false);
              }, 600); // Đợi thêm 0.5s trước khi đặt setIsloading(false)
            }, 500); // Đợi 0.5s trước khi đặt setIsFadeOut(true)
          }
        } else {
          const user_data = await api.login(false);
          if (user_data) {
            if ("geolocation" in navigator) {
              try {
                const position = await new Promise((resolve, reject) => {
                  navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                  });
                });
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const user_pos = await api.getAddress(latitude, longitude);
                if (user_pos) {
                  setUser({
                    ...user_data,
                    location: user_pos,
                  });
                }
              } catch (error) {
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
            } else {
              console.log(
                "Geolocation không được hỗ trợ trong trình duyệt này."
              );
            }
          } else {
            setShowLogin(true);
          }
          setTimeout(() => {
            setIsFadeOut(true);
            setTimeout(() => {
              setIsShow(true);
            }, 100); // Đợi thêm 0.5s trước khi đặt setIsloading(false)
            setTimeout(() => {
              setLoading(false);
            }, 600); // Đợi thêm 0.5s trước khi đặt setIsloading(false)
          }, 500); // Đợi 0.5s trước khi đặt setIsFadeOut(true)
          console.log("Không có config");
        }
      },
      fail: (error) => {
        console.log(error);
      },
    });
  };
  useEffect(() => {
    handleStart();
  }, []);
  const handleLoadMore = () => {
    if (newListRef.current) {
      newListRef.current.loadMore(); // Gọi phương thức loadMore từ New_list
    }
  };
  const handleScroll = (event) => {
    const bottom =
      event.target.scrollHeight >
      event.target.scrollTop + event.target.clientHeight - 10;
    console.log(
      event.target.scrollHeight,
      event.target.scrollTop,
      event.target.clientHeight
    );
    if (bottom && !loading) {
      console.log("Đáy xã hội");
      handleLoadMore();
    }
  };
  const [currentTab, setCurrentTab] = useState(false);
  const setTab = (tab) => {
    console.log(tab);
    setCurrentTab(tab); // Set the current tab to the selected one
  };
  const renderTabContent = () => {
    switch (currentTab) {
      case "alert":
        return (
          <Thongbao
            token={user?.app?.access_token}
            onClose={() => setCurrentTab(false)}
          />
        );
        break;
      case "cart":
        return (
          <Giohang
            token={user?.app?.access_token}
            onClose={() => setCurrentTab(false)}
          />
        );
        break;
      case "user":
        return (
          <User_info
            token={user?.app?.access_token}
            onClose={() => setCurrentTab(false)}
          />
        );
        break;
      case "checkout":
        return (
          <Donhang
            token={user?.app?.access_token}
            onClose={() => setCurrentTab(false)}
          />
        );
        break;
      default:
        return false;
    }
  };
  return (
    <>
      {loading && (
        <div className={`full-load ${isFadeOut ? "fadeOut" : ""}`}>
          <div className="logo">
            <img src={logo} />
          </div>
          <div className="loading-spinner" />
        </div>
      )}
      {isShow && (
        <div className="app-container" onScroll={handleScroll}>
          <Topcontainer />
          <User_wellcome user={user} setShowLogin={setShowLogin} />
          <Home_slider />
          {/* <Home_catalog /> */}
          {showLogin && (
            <Login_popup
              onClose={() => {
                setShowLogin(false);
              }}
              setUser={setUser}
            />
          )}
          <div className="body-main">
            <Today_recommend user={user} loadItem={openItem} />
            <Nearly_restaurant user={user} loadItem={setIsloadRestaurant} />
            {/* <Noibat_tuan /> */}
            <Moidang user={user} loadItem={openItem} />
            <New_list user={user} ref={newListRef} loadItem={openItem} />
          </div>
          <Navigation_bar setTab={setTab} />
          {openItems.map((id_item) => (
            <Monan_popup
              key={id_item}
              onClose={() => closeItem(id_item)}
              id_item={id_item}
              loadRest={setIsloadRestaurant}
              from={fromSearch}
              token={user?.app?.access_token}
              setIsOrder={(e) => {
                setIsOrder(e);
                closeItem(id_item);
              }}
              setFromSearch={setFromSearch}
            />
          ))}
          {isOrder && (
            <Order_fast
              onClose={() => setIsOrder(false)}
              id_item={isOrder}
              from={fromSearch}
              token={user?.app?.access_token}
              user={user}
              setFromSearch={setFromSearch}
              openCart={() => {
                setIsOrder(false);
                setCurrentTab("checkout");
              }}
            />
          )}
          {isloadRestaurant && (
            <Quanan_popup
              onClose={() => setIsloadRestaurant(false)}
              id_item={isloadRestaurant}
              from={fromSearch}
              token={user?.app?.access_token}
              loadItem={openItem}
              setFromSearch={setFromSearch}
            />
          )}
          {renderTabContent()}
        </div>
      )}
    </>
  );
};

export default HomePage;
