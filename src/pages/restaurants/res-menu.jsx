import React from "react";

const Restaurant_menu = ({ restData }) => {
  const menu = restData.menu.length > 0 ? restData.menu[0] : {};
  return <div>Restaurant_menu</div>;
};

export default Restaurant_menu;
