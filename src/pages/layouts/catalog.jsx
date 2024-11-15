import React from "react";
import rice from "../../img/rice.png";
import food from "../../img/food.png";
import combo from "../../img/combo.png";
import icecream from "../../img/icecream.png";

const Home_catalog = () => {
  return (
    <>
      <div className="icon-row">
        <div className="icon-button">
          <div className="logo">
            <img src={combo} />
          </div>
          <div className="name">Combo</div>
        </div>
        <div className="icon-button">
          <div className="logo">
            <img src={rice} />
          </div>
          <div className="name">Món ăn</div>
        </div>
        <div className="icon-button">
          <div className="logo">
            <img src={food} />
          </div>
          <div className="name">Nước</div>
        </div>
        <div className="icon-button">
          <div className="logo">
            <img src={icecream} />
          </div>
          <div className="name">Kem</div>
        </div>
        <div className="icon-button">
          <div className="large-square">
            <div className="small-square"></div>
            <div className="small-square"></div>
            <div className="small-square"></div>
            <div className="small-square"></div>
          </div>
          <div className="name">Khác</div>
        </div>
      </div>
    </>
  );
};

export default Home_catalog;
