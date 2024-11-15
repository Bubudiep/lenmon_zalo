import React from "react";
import { Link } from "react-router-dom";

const Nearly_restaurant = () => {
  return (
    <div className="section">
      <h3>
        <div className="left">
          <i className="fa-solid fa-store"></i>Các cửa tiệm gần bạn
        </div>
        <div className="right">
          <Link to="#">
            Tất cả<i className="fa-solid fa-angles-right"></i>
          </Link>
        </div>
      </h3>
      <div className="list-restaurant">
        <div className="block">
          <div className="card">
            <div className="logo">
              <div className="img">
                <img src="#" />
              </div>
            </div>
            <div className="info">
              <div className="name">Cửa hàng A</div>
              <div className="descript">Quán chuyên các món lẩu nhẹ</div>
              <div className="nearly">
                <div className="item">Cách 3.2km</div>
                <div className="item">
                  <i className="fa-solid fa-star"></i>4.2
                </div>
                <div className="item">20 đơn/ tuần này</div>
              </div>
              <div className="address">
                <i className="fa-solid fa-location-dot"></i>
                Bá Hiến, Bình Xuyên, Vĩnh Phúc, dsadsa dsad sadsadsa dsa dsa dsa
                dsa dsa
              </div>
            </div>
          </div>
          <div className="card">
            <div className="logo">
              <div className="img">
                <img src="#" />
              </div>
            </div>
            <div className="info">
              <div className="name">Cửa hàng A</div>
              <div className="descript">Quán chuyên các món lẩu nhẹ</div>
              <div className="nearly">
                <div className="item">Cách 2.5km</div>
                <div className="item">
                  <i className="fa-solid fa-star"></i>4.8
                </div>
                <div className="item">Đông khách</div>
              </div>
              <div className="address">
                <i className="fa-solid fa-location-dot"></i>
                Bá Hiến, Bình Xuyên, Vĩnh Phúc, dsadsa dsad sadsadsa dsa dsa dsa
                dsa dsa
              </div>
            </div>
          </div>
          <div className="card">
            <div className="logo">
              <div className="img">
                <img src="#" />
              </div>
            </div>
            <div className="info">
              <div className="name">Cửa hàng A</div>
              <div className="descript">Quán chuyên các món lẩu nhẹ</div>
              <div className="nearly">
                <div className="item">Cách 4.3km</div>
                <div className="item">
                  <i className="fa-solid fa-star"></i>3.5
                </div>
                <div className="item">20 bàn đang dùng</div>
              </div>
              <div className="address">
                <i className="fa-solid fa-location-dot"></i>
                Bá Hiến, Bình Xuyên, Vĩnh Phúc, dsadsa dsad sadsadsa dsa dsa dsa
                dsa dsa
              </div>
            </div>
          </div>
          <div className="card">
            <div className="logo">
              <div className="img">
                <img src="#" />
              </div>
            </div>
            <div className="info">
              <div className="name">Cửa hàng A</div>
              <div className="descript">Quán chuyên các món lẩu nhẹ</div>
              <div className="nearly">
                <div className="item">Cách 2.8km</div>
                <div className="item">
                  <i className="fa-solid fa-star"></i>1.5
                </div>
                <div className="item">Đang ế</div>
              </div>
              <div className="address">
                <i className="fa-solid fa-location-dot"></i>
                Bá Hiến, Bình Xuyên, Vĩnh Phúc, dsadsa dsad sadsadsa dsa dsa dsa
                dsa dsa
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nearly_restaurant;
