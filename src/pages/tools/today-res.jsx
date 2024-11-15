import React from "react";
import api from "../../components/api";

const Today_recommend = () => {
  return (
    <div className="section">
      <h3>
        <i className="fa-regular fa-star"></i> Hôm nay ăn gì?
      </h3>
      <div className="list-2">
        <div className="card">
          <div className="discount">
            <div className="rate">-5%</div>
            <div className="value">{(22000).toLocaleString("vi-VN")}đ</div>
          </div>
          <div className="logo-res">
            <div className="img">
              <img src="#" />
            </div>
          </div>
          <div className="image">
            <img src="#" />
          </div>
          <div className="info">
            <div className="name">Tôm chiên xù</div>
            <div className="res">Hải sản Hoa Béo</div>
            <div className="more">
              <div className="price">{(40000).toLocaleString("vi-VN")}đ</div>
              <div className="count">Đã bán: 9</div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="discount">
            <div className="like">
              <i className="fa-regular fa-heart"></i> Ngon
            </div>
          </div>
          <div className="logo-res">
            <div className="img">
              <img src="#" />
            </div>
          </div>
          <div className="image">
            <img src="#" />
          </div>
          <div className="info">
            <div className="name">Thịt lợn móc mật</div>
            <div className="res veried">
              Lợn Hải dớ <i className="fa-regular fa-circle-check"></i>
            </div>
            <div className="more">
              <div className="price">{(20000).toLocaleString("vi-VN")}đ</div>
              <div className="count">Đã bán: 12</div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="discount">
            <div className="hot">
              <i className="fa-solid fa-fire"></i> Hot
            </div>
          </div>
          <div className="logo-res">
            <div className="img">
              <img src="#" />
            </div>
          </div>
          <div className="image">
            <img src="#" />
          </div>
          <div className="info">
            <div className="name">Lẩu 9 tầng mây</div>
            <div className="res veried">
              Lợn Hải dớ <i className="fa-regular fa-circle-check"></i>
            </div>
            <div className="more">
              <div className="price">{(20000).toLocaleString("vi-VN")}đ</div>
              <div className="count">Đã bán: 99</div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="logo-res">
            <div className="img">
              <img src="#" />
            </div>
          </div>
          <div className="image">
            <img src="#" />
          </div>
          <div className="info">
            <div className="name">Trà tranh 5 sao</div>
            <div className="res veried">
              Bà Cúc trà sữa <i className="fa-regular fa-circle-check"></i>
            </div>
            <div className="more">
              <div className="price">{(20000).toLocaleString("vi-VN")}đ</div>
              <div className="count">Đã bán: 22</div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="logo-res">
            <div className="img">
              <img src="#" />
            </div>
          </div>
          <div className="image">
            <img src="#" />
          </div>
          <div className="info">
            <div className="name">Quất lắc sữa</div>
            <div className="res veried">
              Bà Cúc trà sữa <i className="fa-regular fa-circle-check"></i>
            </div>
            <div className="more">
              <div className="price">{(20000).toLocaleString("vi-VN")}đ</div>
              <div className="count">Đã bán: 54</div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="logo-res">
            <div className="img">
              <img src="#" />
            </div>
          </div>
          <div className="image">
            <img src="#" />
          </div>
          <div className="info">
            <div className="name">Trà đào cam xả</div>
            <div className="res veried">
              Bà Cúc trà đào <i className="fa-regular fa-circle-check"></i>
            </div>
            <div className="more">
              <div className="price">{(20000).toLocaleString("vi-VN")}đ</div>
              <div className="count">Đã bán: 86</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Today_recommend;
