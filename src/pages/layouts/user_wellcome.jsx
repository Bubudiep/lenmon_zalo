import React from "react";

const User_wellcome = ({ user, isLogin, setIsLogin, setShowLogin }) => {
  return (
    <div className="user-card">
      <div className="box">
        <div className="avatar">
          <div className="img">
            <img src={user?.avatar} />
          </div>
        </div>
        <div className="user-info">
          <div className="name">
            Xin chào, <div className="user">{user?.name}</div>
          </div>
          {isLogin ? (
            ""
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
