import React from "react";
import Slider from "react-slick";
import slider1 from "../../img/slider-1.png";
import slider2 from "../../img/slider-2.png";
import slider3 from "../../img/slider-3.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home_slider = () => {
  const settings = {
    dots: true, // Hiển thị các dấu chấm điều hướng
    infinite: true, // Cho phép lặp lại các slide
    speed: 500, // Tốc độ chuyển slide (500ms)
    slidesToShow: 1, // Số slide hiển thị
    slidesToScroll: 1, // Số slide di chuyển khi chuyển
    autoplay: true, // Bật tính năng tự động
    autoplaySpeed: 3000, // Chuyển slide mỗi 3 giây
    arrows: false, // Tắt các nút điều hướng
  };
  return (
    <div className="home-slider">
      <Slider {...settings}>
        <div>
          <img src={slider1} alt="Slide 1" />
        </div>
        <div>
          <img src={slider2} alt="Slide 2" />
        </div>
        <div>
          <img src={slider3} alt="Slide 3" />
        </div>
      </Slider>
    </div>
  );
};

export default Home_slider;
