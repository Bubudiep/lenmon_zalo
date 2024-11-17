import React from "react";
import { Route, Routes } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { RecoilRoot } from "recoil";
import HomePage from "../pages";
import QR_login from "../pages/qr_login";

const MyApp = () => {
  return (
    <RecoilRoot>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/qr_login" element={<QR_login></QR_login>}></Route>
            </Routes>
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};
export default MyApp;
