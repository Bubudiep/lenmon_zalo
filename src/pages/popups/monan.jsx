import React, { useEffect, useRef, useState } from "react";
import BottomPopup from "../popup";
import Slider from "react-slick";
import api from "../../components/api";

const Monan_popup = ({
  onClose,
  id_item,
  token,
  from,
  loadRest,
  setIsOrder,
  setFromSearch,
}) => {
  const popupRef = useRef();
  const sliderRef = useRef();
  const [loading, setLoading] = useState(false);
  const [outloading, setOutloading] = useState(false);
  const [isOpenorder, setisOpenorder] = useState(false);
  const [orderQTY, setOrderQTY] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mainImages, setmainImages] = useState([]);
  const [ItemData, setItemData] = useState({});
  const [isLike, setIslike] = useState(false);
  const [totalLike, settotalLike] = useState(0);
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
  const handleScroll = () => {
    popupRef.current.canScroll(false);
  };
  useEffect(() => {
    setLoading(true);
    api
      .get(`/res-items-details/${id_item}/?from=${from}`, token)
      .then((response) => {
        console.log(response);
        setItemData(response);
        settotalLike(response.totalLike);
        setIslike(response.isLike);
        setmainImages(
          [
            { id: 1, src: response.image64_full },
            response.image64_sub1
              ? { id: 2, src: response.image64_sub1 }
              : null,
            response.image64_sub2
              ? { id: 3, src: response.image64_sub2 }
              : null,
            response.image64_sub3
              ? { id: 4, src: response.image64_sub3 }
              : null,
          ].filter(Boolean)
        );
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setOutloading(true);
        setTimeout(() => {
          setLoading(false);
          setOutloading(false);
        }, 200);
      });
  }, []);
  const handleCloseOder = () => {
    setisOpenorder(true);
    setTimeout(() => {
      setIsOrder(false);
      setisOpenorder(false);
    }, 200);
  };
  const handleLike = () => {
    api
      .post(
        "/user-log-action/",
        {
          type: "like",
          action: isLike ? "no" : "yes",
          target: "menu_item",
          item: id_item,
        },
        token
      )
      .then((response) => {
        if (response.data == true) {
          if (isLike == false) {
            settotalLike(totalLike + 1);
          }
        } else {
          if (isLike == true) {
            settotalLike(totalLike - 1);
          }
        }
        setIslike(response.data);
      });
  };
  return (
    <>
      {loading && (
        <div className="bg-full center load-top">
          <div className={`detectOut ${outloading ? "fade-out" : "fade-in"}`} />
          <div
            className={`loading-spinner ${outloading ? "fade-out" : "fade-in"}`}
          ></div>
        </div>
      )}
      <BottomPopup ref={popupRef} title={false} onClose={onClose}>
        {!token ? (
          <div className="not-login">
            <div className="icon">
              <i className="fa-solid fa-frog"></i>
            </div>
            <div className="message">Bạn chưa đăng nhập!</div>
          </div>
        ) : !id_item ? (
          <div className="not-login">
            <div className="icon">
              <i className="fa-solid fa-frog"></i>
            </div>
            <div className="message">Sản phẩm này không khả dụng!</div>
          </div>
        ) : (
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
                {mainImages.map((image, index) => (
                  <div
                    className={`image ${
                      currentSlide === index ? "active" : ""
                    }`}
                    key={image.id}
                  >
                    <img
                      src={image.src}
                      alt={`Thumbnail ${image.id}`}
                      className="thumbnail"
                      onClick={() => sliderRef.current.slickGoTo(index)} // Update slide on thumbnail click
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="product_details">
              <div className="items price">
                <div className="prices">
                  <div className="value">
                    {(ItemData?.price ?? 0).toLocaleString("vi-VN")}đ
                  </div>
                  <div className="option">
                    {ItemData?.discount ? (
                      <>
                        <div className="saled">
                          <i className="fa-solid fa-ticket"></i> -25%
                        </div>
                        <div className="saled-v">
                          {(9999999).toLocaleString("vi-VN")}đ
                        </div>
                      </>
                    ) : (
                      "-"
                    )}
                  </div>
                </div>
                <div className="count">
                  <div className="saled">Đã bán: {ItemData?.saled ?? 0}</div>
                  <div className="farivote">
                    {ItemData?.isLike ? (
                      <i className="fa-solid fa-thumbs-up"></i>
                    ) : (
                      <i className="fa-regular fa-thumbs-up"></i>
                    )}{" "}
                    {totalLike}
                  </div>
                </div>
              </div>
              <div className="items name">
                {ItemData?.name ?? "Chưa có tên"}
              </div>
            </div>
            <div className="options">
              <div className="items">
                <div className="icon text-[#34adbd]">
                  <i className="fa-solid fa-truck"></i>
                </div>
                <div className="value">
                  {ItemData?.is_ship
                    ? `Có ship (Miễn phí ship trong 10km)`
                    : `Chưa hỗ trợ ship`}
                </div>
              </div>
              <div className="items">
                <div className="icon text-[#9eacee]">
                  <i className="fa-solid fa-clock"></i>
                </div>
                <div className="value">
                  {ItemData?.openTime && ItemData?.closeTime
                    ? `
                  Hoạt động từ ${ItemData?.openTime} đến ${ItemData?.closeTime} (hằng ngày)`
                    : `Mở cửa cả ngày`}
                </div>
              </div>
              <div className="items">
                <div className="icon text-[#ffc480]">
                  <i className="fa-solid fa-star"></i>
                </div>
                <div className="value flex gap-2">
                  {ItemData?.restaurant?.rate
                    ? `Đánh giá: <div className="text-[#db7734]">${ItemData?.restaurant?.rate.toFixed(
                        1
                      )}/5</div> (0 lượt
                  đánh giá)`
                    : `Chưa có đánh giá!`}
                </div>
              </div>
            </div>
            <div
              className="restaurant gap-2"
              onClick={() => loadRest(ItemData?.restaurant?.id)}
            >
              <div className="top">
                <div className="avatar">
                  <div className="img">
                    <img src={ItemData?.restaurant?.avatar} />
                  </div>
                </div>
                <div className="info">
                  <div
                    className="name"
                    onClick={() => loadRest(ItemData?.restaurant?.id)}
                  >
                    {ItemData?.restaurant?.name}
                  </div>
                  <div className="type flex gap-1">
                    <i className="fa-solid fa-square-phone"></i>
                    {ItemData?.restaurant?.phone_number ?? `Chưa có hotline`}
                  </div>
                  <div className="address">
                    <div className="icon">
                      <i className="fa-solid fa-location-dot"></i>
                    </div>
                    <div className="value">{ItemData?.restaurant?.address}</div>
                  </div>
                </div>
              </div>
              <div className="mini-view">
                <div className="items">
                  <div className="icon">0</div>
                  <div className="value">Đánh giá</div>
                </div>
                <div className="items">
                  <div className="icon">
                    {ItemData?.restaurant?.menu?.length ?? 0}
                  </div>
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
                <div className="right">Chưa có</div>
              </div>
              {/* <div className="items des">
                <div className="title">Mô tả sản phẩm</div>
                <div className="descriptions">
                  {ItemData?.description ?? (
                    <div className="null">
                      <div className="icon p-2">
                        <i className="fa-solid fa-clone"></i>
                      </div>
                      <div className="message">Chủ quán chưa cập nhập mô tả!</div>
                    </div>
                  )}
                </div>
              </div> */}
              <div className="items comment">
                <div className="title">Đánh giá (0)</div>
                <div className="descriptions">
                  <div className="null">
                    <div className="icon p-2">
                      <i className="fa-regular fa-comment-dots"></i>
                    </div>
                    <div className="message">Chưa có đánh giá</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="details_items-tools">
              <div className="left">
                <div
                  className={`like ${isLike ? "active" : ""}`}
                  onClick={handleLike}
                >
                  {isLike ? (
                    <>
                      <i className="fa-solid fa-thumbs-up"></i> Đã thích
                    </>
                  ) : (
                    <>
                      <i className="fa-regular fa-thumbs-up"></i> Yêu thích
                    </>
                  )}
                </div>
              </div>
              <div className="tools">
                <div className="qty">
                  <div className="text">Số lượng</div>
                  <div className="value">
                    <input
                      type="number"
                      value={orderQTY}
                      onChange={(e) => {
                        setOrderQTY(e.target.value);
                      }}
                    />
                  </div>
                  <div className="add-more">
                    <div
                      className="button"
                      onClick={() => {
                        setOrderQTY(orderQTY + 1);
                      }}
                    >
                      +
                    </div>
                    <div
                      className="button"
                      onClick={() => {
                        if (orderQTY > 1) {
                          setOrderQTY(orderQTY - 1);
                        }
                      }}
                    >
                      -
                    </div>
                  </div>
                </div>
                <div
                  className="shop-it"
                  onClick={() => {
                    setIsOrder({
                      qty: orderQTY,
                      data: ItemData,
                    });
                  }}
                >
                  <i className="fa-solid fa-cart-plus"></i>
                  Đặt hàng
                </div>
              </div>
            </div>
          </div>
        )}
      </BottomPopup>
    </>
  );
};

export default Monan_popup;
