import { Outlet } from "react-router-dom";
import Footer from "../sections/Footer";
import PageNav from "../components/PageNav";

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageNav />
      <main className="flex-grow pb-20 pt-10 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
