import React, { useEffect } from "react";

const User_wellcome = ({ user, setShowLogin }) => {
  return (
    <div className="user-card">
      <div className="box">
        <div className="avatar">
          <div className="img">
            <img src={user?.zalo?.avatar} />
          </div>
        </div>
        <div className="user-info">
          <div className="name">
            Xin chào, <div className="user">{user?.zalo?.name}</div>
          </div>
          {user?.app?.access_token ? (
            <div className="address">
              {user?.location?.display_name ? (
                <>
                  <i className="fa-solid fa-location-dot"></i>
                  {user?.location?.display_name}
                </>
              ) : (
                "Không lấy được thông tin vị trí"
              )}
            </div>
          ) : (
            <div className="user-login">
              <button
                onClick={() => {
                  setShowLogin(true);
                }}
              >
                Đăng nhập
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User_wellcome;
