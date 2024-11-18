import axios from "axios";
import {
  getAccessToken,
  getLocation,
  getPhoneNumber,
  getSetting,
  getUserInfo,
} from "zmp-sdk/apis";

const api = axios.create({
  baseURL: "http://localhost:5005/api", // URL cơ sở cho các yêu cầu
  // baseURL: "https://ipays.vn/api", // URL cơ sở cho các yêu cầu
});

// Thêm request interceptor để ghi lại thời gian bắt đầu
api.interceptors.request.use(
  (config) => {
    config.metadata = { startTime: new Date() }; // Ghi lại thời gian bắt đầu
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm response interceptor để ghi lại thời gian kết thúc và tính toán thời gian xử lý
api.interceptors.response.use(
  (response) => {
    const endTime = new Date();
    const duration = endTime - response.config.metadata.startTime; // Tính thời gian xử lý
    console.log(`Request to ${response.config.url} took ${duration} ms`);
    return response;
  },
  (error) => {
    const endTime = new Date();
    const duration = endTime - error.config.metadata.startTime; // Tính thời gian xử lý
    console.error(`Request to ${error.config.url} fails took ${duration} ms`);
    return Promise.reject(error);
  }
);

// Hàm GET kèm theo token
const get = async (url, token) => {
  try {
    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
// Hàm GET kèm theo token
const gets = async (url, headers) => {
  try {
    const response = await api.get(url, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

// Hàm POST kèm theo token
const post = async (url, data, token) => {
  try {
    const response = await api.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error posting data", error);
    throw error;
  }
};

// Hàm PATCH kèm theo token
const patch = async (url, data, token) => {
  try {
    const response = await api.patch(url, data, {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error patching data", error);
    throw error;
  }
};

// Hàm DELETE kèm theo token
const deleteRequest = async (url, token) => {
  try {
    const response = await api.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting data", error);
    throw error;
  }
};

const random = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
const getToken = () => {
  return new Promise((resolve, reject) => {
    getAccessToken({
      success: (Token) => {
        resolve(Token);
      },
      fail: () => {
        resolve(null); // Hoặc reject nếu muốn xử lý lỗi khác
      },
    });
  });
};
const getUSetting = () => {
  return new Promise((resolve, reject) => {
    getSetting({
      success: async (setting) => {
        console.log(setting.authSetting);
        resolve(setting);
      },
      fail: () => {
        resolve(null); // Hoặc reject nếu muốn xử lý lỗi khác
      },
    });
  });
};
const getPhone = async () => {
  const app_key = import.meta.env.VITE_ZALO_KEY;
  const access_token = await getToken();
  console.log("access token", access_token);
  return new Promise((resolve, reject) => {
    getPhoneNumber({
      success: async (data) => {
        const { token } = data;
        console.log("phone token", data);
        try {
          const response = await gets("https://graph.zalo.me/v2.0/me/info", {
            access_token: access_token,
            code: token,
            secret_key: app_key,
          });
          resolve(response.data.number);
        } catch (error) {
          reject(error);
        }
      },
      fail: () => {
        resolve(null);
      },
    });
  });
};
const getAddress = async (latitude, longitude) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`;
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const data = await gets(url, headers);
    console.log(data);
    const { city, town, village, county, state, country } = data.address;
    return {
      lat: latitude,
      long: longitude,
      city: city || town || village || "",
      county: county || "",
      state: state || "",
      country: country || "",
      display_name:
        (data.display_name.split(",").length >= 1 &&
          data.display_name.split(",")[0]) +
        ", " +
        (data.display_name.split(",").length >= 2 &&
          data.display_name.split(",")[1]) +
        ", " +
        (data.display_name.split(",").length >= 3 &&
          data.display_name.split(",")[2]),
    };
  } catch (error) {
    console.error("Error fetching address:", error);
    alert("Không thể lấy thông tin địa chỉ từ tọa độ.");
    return {};
  }
};
const getUserpos = async () => {
  const access_token = await getToken();
  const app_key = import.meta.env.VITE_ZALO_KEY;
  return new Promise((resolve, reject) => {
    getLocation({
      success: async (data) => {
        const { token } = data;
        try {
          const response = await gets("https://graph.zalo.me/v2.0/me/info", {
            access_token: access_token,
            code: token,
            secret_key: app_key,
          });
          console.log(response);
          if (response?.data?.latitude && response?.data?.longitude) {
            const address = await getAddress(
              response.data.latitude,
              response.data.longitude
            );
            resolve(address);
          } else {
            resolve(null);
          }
        } catch (error) {
          reject(error);
        }
      },
      fail: () => {
        resolve(null);
      },
    });
  });
};
const login = async (debug = true) => {
  try {
    // Step 1: Get user info
    const userInfo = await new Promise((resolve, reject) => {
      getUserInfo({
        success: resolve,
        fail: reject,
      });
    });
    // Step 2: Fetch phone number if debugging
    let phone = "";
    if (debug) {
      try {
        phone = await getPhone();
      } catch (error) {
        console.error("Error fetching phone number:", error);
        phone = ""; // Fallback to empty string if phone fetching fails
      }
    }
    // Step 3: Attempt login
    try {
      const response = await post("/zalo-login/", {
        zalo_id: userInfo.userInfo.id,
        zalo_phone: phone,
        zalo_name: userInfo.userInfo.name,
        zalo_avatar: userInfo.userInfo.avatar,
      });
      return { app: response, zalo: userInfo.userInfo };
    } catch (loginError) {
      console.error("Login error:", loginError);

      // Step 4: Fallback to register
      try {
        const response = await api.post("/register/", {
          zalo_id: userInfo.userInfo.id,
          username: userInfo.userInfo.id,
          password: api.random(10),
          zalo_name: userInfo.userInfo.name,
          zalo_avatar: userInfo.userInfo.avatar,
          email: `${userInfo.userInfo.id}@gmail.com`,
          zalo_phone: phone,
        });
        return { app: response, zalo: userInfo };
      } catch (registerError) {
        console.error("Registration error:", registerError);
        return false; // Both login and registration failed
      }
    }
  } catch (error) {
    console.error("Error during login process:", error);
    return false; // Failed to get user info or other unexpected errors
  }
};
// Xuất các phương thức
export default {
  get,
  gets,
  post,
  patch,
  login,
  getAddress,
  getUserpos,
  getUSetting,
  delete: deleteRequest,
  random: random,
};
