import React, { useRef } from "react";
import BottomPopup from "../popup";

const Quanan_popup = ({ onClose, id_item, token }) => {
  const popupRef = useRef();
  const closeFast = () => {
    popupRef.current.closePopup();
  };
  console.log(id_item);
  return (
    <BottomPopup ref={popupRef} title={false} onClose={onClose}>
      <div className="details_items"></div>
    </BottomPopup>
  );
};

export default Quanan_popup;
