import React, { useState, useRef } from "react";
import BottomPopup from "../popup";

const Restaurant_cart = ({ onClose, itemQTY, restData }) => {
  const popupRef = useRef();
  const [option, setOption] = useState(1);
  // State to manage item quantities
  const [quantities, setQuantities] = useState(
    itemQTY.reduce((acc, item) => {
      acc[item.id] = 1; // Initialize each item with a quantity of 1
      return acc;
    }, {})
  );
  const allSpaces = restData.layouts.flatMap((layout) =>
    layout.groups.flatMap((group) =>
      group.spaces.filter((space) => space.is_active && !space.is_ordering)
    )
  );
  const allGroups = restData.layouts.flatMap((layout) => layout.groups);
  const [selectedGroupId, setSelectedGroupId] = useState(
    allGroups.length > 0 ? allGroups[0].id : null
  );
  const selectedGroup = allGroups.find((group) => group.id === selectedGroupId);
  const spaces = selectedGroup ? selectedGroup.spaces : [];
  const [selectedSpaceId, setSelectedSpaceId] = useState(
    spaces.length > 0 ? spaces[0].id : null
  );
  // Xử lý khi chọn group
  const handleGroupChange = (e) => {
    const newGroupId = parseInt(e.target.value, 10);
    setSelectedGroupId(newGroupId);
    const newGroup = allGroups.find((group) => group.id === newGroupId);
    if (newGroup && newGroup.spaces.length > 0) {
      setSelectedSpaceId(newGroup.spaces[0].id);
    } else {
      setSelectedSpaceId(null);
    }
  };
  // Xử lý khi chọn space
  const handleSpaceChange = (e) => {
    setSelectedSpaceId(parseInt(e.target.value, 10));
  };
  const handleQuantityChange = (id, delta) => {
    setQuantities((prevQuantities) => {
      const newQty = prevQuantities[id] + delta;
      return newQty > 0 ? { ...prevQuantities, [id]: newQty } : prevQuantities;
    });
  };
  const handleOrderSubmit = () => {
    const orderDetails = itemQTY.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: quantities[item.id],
      price: item.price,
      total: item.price * quantities[item.id],
    }));

    const orderData = {
      items: orderDetails,
      option, // 1: Mang về, 2: Chọn bàn
      ...(option == 2 && {
        groupId: selectedGroupId,
        spaceId: selectedSpaceId,
      }),
    };
    console.log("Đặt hàng:", orderData);
  };
  return (
    <BottomPopup ref={popupRef} title="Giỏ hàng" onClose={onClose}>
      {itemQTY.length > 0 ? (
        <div className="list-order-items">
          <div className="list-items">
            {itemQTY.map((item) => (
              <div className="items" key={item.id}>
                <div className="image">
                  <div className="box">
                    <img src={item.image64_mini} alt={item.name} />
                  </div>
                </div>
                <div className="info">
                  <div className="name">{item.name}</div>
                  <div className="price">
                    Giá: {item.price.toLocaleString("vi-VN")}đ
                  </div>
                  <div className="price">
                    Thành tiền:{" "}
                    {(item.price * quantities[item.id]).toLocaleString("vi-VN")}
                    đ
                  </div>
                </div>
                <div className="option">
                  <div
                    className="button"
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    +
                  </div>
                  <div className="value">
                    <input type="number" value={quantities[item.id]} readOnly />
                  </div>
                  <div
                    className="button"
                    onClick={() => handleQuantityChange(item.id, -1)}
                  >
                    -
                  </div>
                </div>
                <div className="tools">
                  <div className="button">
                    <i className="fa-solid fa-xmark"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="details_items-tools">
            <div className="left">
              <div className="order-option">
                <select
                  value={option}
                  onChange={(e) => {
                    setOption(e.target.value);
                  }}
                >
                  <option value={1}>Mang về</option>
                  <option value={2}>Chọn bàn</option>
                </select>
                {option == 2 && (
                  <>
                    <select
                      value={selectedGroupId}
                      onChange={handleGroupChange}
                    >
                      {allGroups.map((group) => (
                        <option key={group.id} value={group.id}>
                          {group.name}
                        </option>
                      ))}
                    </select>
                    <select
                      value={selectedSpaceId || ""}
                      onChange={handleSpaceChange}
                      disabled={!spaces.length}
                    >
                      {spaces.length > 0 ? (
                        spaces.map((space) => (
                          <option key={space.id} value={space.id}>
                            {space.name}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>
                          Không có Space
                        </option>
                      )}
                    </select>
                  </>
                )}
              </div>
            </div>
            <div className="tools">
              <div className="shop-it" onClick={handleOrderSubmit}>
                <i className="fa-solid fa-cart-plus"></i>
                Đặt hàng
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="null">
          <div className="icon p-2 pt-8">
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
          <div className="message">Chưa có gì!</div>
        </div>
      )}
    </BottomPopup>
  );
};

export default Restaurant_cart;
