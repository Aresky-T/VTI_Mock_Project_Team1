import React, { useCallback, useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import ModalLogin from "../components/auth/ModalLogin";
import { ToastContainer } from "react-toastify";
import { TiArrowUpThick } from "react-icons/ti";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  const [isShowBackToTop, setIsShowBackToTop] = useState(false);

  const isShowPopup = useSelector((state) => state.auth.signIn.isShowPopup);
  const isLoading = useSelector((state) => state.loading.isLoading);
  const location = useLocation();
  const layoutRef = useRef();

  const handleClickToScrollTop = () => {
    if (layoutRef.current) {
      layoutRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderBackToTop = useCallback(() => {
    return (
      <div
        className={`back-to-top-icon-btn${isShowBackToTop ? " active" : ""}`}
        onClick={handleClickToScrollTop}
      >
        <TiArrowUpThick size={"2.5rem"} />
      </div>
    );
  }, [isShowBackToTop]);

  useEffect(() => {
    if (layoutRef && layoutRef.current) {
      const handleScroll = (e) => {
        setIsShowBackToTop(window.scrollY > window.innerHeight);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [layoutRef]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [location]);

  return (
    <div className="layout" ref={layoutRef}>
      <Navbar />
      <Outlet />
      <Footer />
      <Toaster position="top center" />
      <ToastContainer
        position="top-right"
        theme="colored"
        pauseOnFocusLoss={false}
        closeOnClick={false}
        autoClose={1500}
        toastStyle={{
          fontSize: ".75rem",
          lineHeight: "1rem",
          marginTop: "50px",
        }}
      />
      {isShowPopup && <ModalLogin />}
      {isLoading && <Loading isLoading={isLoading} />}
      {renderBackToTop()}
    </div>
  );
};

export default Layout;
