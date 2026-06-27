import { Outlet } from "react-router-dom";
import TopBar from "../components/layout/TopBar";
import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FloatingWhatsApp from "../components/layout/FloatingWhatsApp";

const PublicLayout = () => {
  return (
    <>
      <TopBar />
      <Header />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
};

export default PublicLayout;