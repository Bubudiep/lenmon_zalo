import React, { useEffect, useState } from "react";
import api from "../components/api";
import logo from "../img/logo.png";
import table from "../img/table.png";
import { useLocation } from "react-router-dom";
import Login_popup from "./layouts/login-popup";

const Restaurant = () => {
  const [user, setUser] = useState(false);
  const [tabActive, setTabActive] = useState("layouts");
  const [loading, setLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isFadeOut, setIsFadeOut] = useState(false);
  const [from, setFrom] = useState(false);
  const [restData, setRestData] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  const { id, token } = location.state || {};
  // Hàm lấy id từ query string
  const getIdFromQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get("id");
  };
  useEffect(() => {
    setLoading(true);
    if (id && token) {
      api
        .get(`/restaurant-view/${id}/?from=${from}`, token)
        .then((response) => {
          console.log(response);
          setRestData(response);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setTimeout(() => {
            setIsFadeOut(true);
            setTimeout(() => {
              setIsShow(true);
            }, 100); // Đợi thêm 0.5s trước khi đặt setIsloading(false)
            setTimeout(() => {
              setLoading(false);
            }, 600); // Đợi thêm 0.5s trước khi đặt setIsloading(false)
          }, 500); // Đợi 0.5s trước khi đặt setIsFadeOut(true)
        });
    } else {
      const idFromQuery = getIdFromQuery();
      if (idFromQuery && user) {
        api
          .get(
            `/restaurant-view/${idFromQuery}/?from=${from}`,
            user?.app?.access_token
          )
          .then((response) => {
            console.log(response);
            setRestData(response);
          })
          .catch((e) => {
            console.log(e);
          })
          .finally(() => {
            setTimeout(() => {
              setIsFadeOut(true);
              setTimeout(() => {
                setIsShow(true);
              }, 100); // Đợi thêm 0.5s trước khi đặt setIsloading(false)
              setTimeout(() => {
                setLoading(false);
              }, 600); // Đợi thêm 0.5s trước khi đặt setIsloading(false)
            }, 500); // Đợi 0.5s trước khi đặt setIsFadeOut(true)
          });
      } else {
        setTimeout(() => {
          setIsFadeOut(true);
          setTimeout(() => {
            setIsShow(true);
          }, 100); // Đợi thêm 0.5s trước khi đặt setIsloading(false)
          setTimeout(() => {
            setLoading(false);
          }, 600); // Đợi thêm 0.5s trước khi đặt setIsloading(false)
        }, 500); // Đợi 0.5s trước khi đặt setIsFadeOut(true)
        setShowLogin(true);
      }
    }
  }, [user]);
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
      {showLogin && (
        <Login_popup
          onClose={() => {
            setShowLogin(false);
          }}
          setUser={setUser}
        />
      )}
      {isShow && restData && (
        <div className="restaurant-landing">
          <div className="top-container">
            <div className="top">
              <div className="avatar">
                <div className="box">
                  <img src={restData.avatar} />
                </div>
              </div>
              <div className="info">
                <div className="name">{restData.name}</div>
                <div className="name">{restData.mohinh}</div>
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
                  {restData?.menu?.length > 0 && restData?.menu[0].items.length}
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
          <div className="body-container">
            <div className="tabs">
              <div className="items" onClick={() => setTabActive("layouts")}>
                <div
                  className={`button ${tabActive == "layouts" && "active"}`}
                  onClick={() => setTabActive("layouts")}
                >
                  Tình trạng
                </div>
              </div>
              <div className="items" onClick={() => setTabActive("menus")}>
                <div
                  className={`button ${tabActive == "menus" && "active"}`}
                  onClick={() => setTabActive("menus")}
                >
                  Thực đơn
                </div>
              </div>
            </div>
            <div className="rest-details">
              {tabActive == "layouts" && (
                <div className="rest-layout">
                  <div className="p-layout">
                    {restData?.layouts?.map((layout) => (
                      <div key={layout.id} className="layout">
                        {layout.groups.map((group) => (
                          <div key={group.id} className="room">
                            <div className="room-name">
                              <div className="name">{group.name}</div>
                            </div>
                            <div className="room-layout">
                              {group.spaces.map((space) => (
                                <div key={space.id} className="table">
                                  <div className="status">
                                    {space.is_ordering ? "Đã đặt" : "Trống"}
                                  </div>
                                  <div className="icon">
                                    <img src={table} alt="Table Icon" />
                                  </div>
                                  <div className="name">{space.name}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Restaurant;
