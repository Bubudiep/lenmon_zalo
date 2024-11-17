import React, { useRef, useState } from "react";
import BottomPopup from "../popup";
import Slider from "react-slick";

const Monan_popup = ({ onClose, id_item, token }) => {
  const popupRef = useRef();
  const [currentSlide, setCurrentSlide] = useState(0); // Track current slide index
  const sliderRef = useRef();
  const closeFast = () => {
    popupRef.current.closePopup();
  };

  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Allow infinite looping
    speed: 500, // Slide transition speed
    slidesToShow: 1, // Only one image at a time
    slidesToScroll: 1, // Move one slide at a time
    autoplay: false, // Disable autoplay
    autoplaySpeed: 3000, // Speed for autoplay
    arrows: false, // Disable arrows for navigation
  };

  // Example main images (replace with actual image paths)
  const mainImages = [
    { id: 1, src: "path/to/main-image1.jpg" },
    { id: 2, src: "path/to/main-image2.jpg" },
    { id: 3, src: "path/to/main-image3.jpg" },
    { id: 4, src: "path/to/main-image3.jpg" },
  ];

  // Example thumbnail images (replace with actual thumbnail paths)
  const thumbnailImages = [
    { id: 1, src: "path/to/thumbnail1.jpg" },
    { id: 2, src: "path/to/thumbnail2.jpg" },
    { id: 3, src: "path/to/thumbnail3.jpg" },
    { id: 5, src: "path/to/thumbnail3.jpg" },
  ];
  const handleScroll = () => {
    popupRef.current.canScroll(false);
  };
  return (
    <BottomPopup ref={popupRef} title={false} onClose={onClose}>
      <div className="details_items">
        <div
          className="slider"
          onClick={handleScroll}
          onTouchStart={handleScroll}
          onTouchMove={handleScroll}
        >
          <Slider {...settings} ref={sliderRef}>
            {mainImages.map((image) => (
              <div key={image.id}>
                <img src={image.src} alt={`Ảnh ${image.id}`} />
              </div>
            ))}
          </Slider>
          <div className="thumbnails">
            {thumbnailImages.map((image, index) => (
              <div className="image" key={image.id}>
                <img
                  src={image.src}
                  alt={`Thumbnail ${image.id}`}
                  className={`thumbnail ${
                    currentSlide === index ? "active" : ""
                  }`}
                  onClick={() => sliderRef.current.slickGoTo(index)} // Update slide on thumbnail click
                />
              </div>
            ))}
          </div>
        </div>
        <div className="product_details">
          <div className="items price">
            <div className="prices">
              <div className="value">{(9999999).toLocaleString("vi-VN")}đ</div>
              <div className="option">
                <div className="saled">
                  <i className="fa-solid fa-ticket"></i> -25%
                </div>
                <div className="saled-v">
                  {(9999999).toLocaleString("vi-VN")}đ
                </div>
              </div>
            </div>
            <div className="count">
              <div className="saled">Đã bán: {99}</div>
              <div className="farivote">
                <i className="fa-regular fa-heart"></i>
              </div>
            </div>
          </div>
          <div className="items name">
            Trà sữa trân châu đường đen siêu cấp vip pờ rồ cực cực ngon ngon
            ngon ngon ngon ngon ngon ngon ngon ngon ngon ngon ngon ngon ngon
            ngon
          </div>
        </div>
        <div className="options">
          <div className="items">
            <div className="icon text-[#34adbd]">
              <i className="fa-solid fa-truck"></i>
            </div>
            <div className="value">Có ship (Miễn phí ship trong 10km)</div>
          </div>
          <div className="items">
            <div className="icon text-[#9eacee]">
              <i className="fa-solid fa-clock"></i>
            </div>
            <div className="value">
              Hoạt động từ 08:00 đến 22:00 (hằng ngày)
            </div>
          </div>
          <div className="items">
            <div className="icon text-[#ffc480]">
              <i className="fa-solid fa-star"></i>
            </div>
            <div className="value flex gap-2">
              Đánh giá: <div className="text-[#db7734]">4.3/5</div> (78 lượt
              đánh giá)
            </div>
          </div>
        </div>
        <div className="restaurant">
          <div className="top">
            <div className="avatar">
              <div className="img"></div>
            </div>
            <div className="info">
              <div className="name">Tên quán</div>
              <div className="type">Quán thường</div>
              <div className="address">
                <div className="icon">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div className="value">Bá Thiện, Bình Xuyên, Vĩnh Phúc</div>
              </div>
            </div>
          </div>
          <div className="mini-view">
            <div className="items">
              <div className="icon">4.8</div>
              <div className="value">Đánh giá</div>
            </div>
            <div className="items">
              <div className="icon">22</div>
              <div className="value">Sản phẩm</div>
            </div>
            <div className="items">
              <div className="icon">100%</div>
              <div className="value">Nhận đơn</div>
            </div>
          </div>
        </div>
        <div className="more_details">
          <div className="items top">
            <div className="left">Danh mục</div>
            <div className="right">Lẩu, món chính</div>
          </div>
          <div className="items des">
            <div className="title">Mô tả sản phẩm</div>
            <div className="descriptions">
              Viết một vài mô tả cho sản phẩm... Viết một vài mô tả cho sản
              phẩm... Viết một vài mô tả cho sản phẩm... Viết một vài mô tả cho
              sản phẩm... Viết một vài mô tả cho sản phẩm... Viết một vài mô tả
              cho sản phẩm... Viết một vài mô tả cho sản phẩm... Viết một vài mô
              tả cho sản phẩm... Viết một vài mô tả cho sản phẩm... Viết một vài
              mô tả cho sản phẩm... Viết một vài mô tả cho sản phẩm... Viết một
              vài mô tả cho sản phẩm...
            </div>
          </div>
          <div className="items comment">
            <div className="title">Đánh giá</div>
            <div className="descriptions">
              <div className="null">
                <div className="icon">
                  <i className="fa-regular fa-comment-dots"></i>
                </div>
                <div className="message">Chưa có đánh giá</div>
              </div>
            </div>
          </div>
        </div>
        <div className="details_items-tools"></div>
      </div>
    </BottomPopup>
  );
};

export default Monan_popup;
