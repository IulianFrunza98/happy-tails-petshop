import { Outlet } from "react-router-dom";
import Footer from "../sections/Footer";

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
