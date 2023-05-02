import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import Sidebar from "../Sidebar/sidebar";
// import Dashboard from "../../dashboard"
const Layout = () => {
  return (
    // <div
    //   className="Layout"
    //   style={{ display: "flex", flexDirection: "column" }}
    // >
    //   <div style={{ flex: "0 0 362px" }}>
    //     <Sidebar />
    //   </div>

    //   <div style={{ display: "flex" }}>
    //     <div style={{ flex: "0 0 74px" }}>
    //       <Header />
    //     </div>
    //     <div style={{ flex: "1 1 100%" }}>
    //       <Outlet />
    //     </div>
    //   </div>
    //   {/* <div>
    //     <Footer />
    //   </div> */}
    // </div>

    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <div style={{ flex: "0" }}>
        <Sidebar />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: "1 1 100%",
          overflow: "auto",
        }}
      >
        <div style={{ flex: "0 0 74px" }}>
          <Header />
        </div>
        <div
          style={{
            flex: "1 1 100%",
            padding: "40px",
            height: "calc(100vh - 74px)",
            overflow: "auto",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
