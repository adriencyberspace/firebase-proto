import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  return (
    <div className="site-wrapper">
      <Header />
      <div>{props.children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
