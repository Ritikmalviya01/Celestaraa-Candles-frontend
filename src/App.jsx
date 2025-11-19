import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "./pages/Footer";
import Header from "./pages/Header";
import { useState } from "react";
import ScrollToTop from "./components/ScrollToTop";
import { SearchQuery } from "./components/Context";


function App() {   
  const location = useLocation();
  const hideLayoutOnPaths = [
    "/user",
    "/admin",
    
    
   
   
  ];

  const shouldHideLayout = hideLayoutOnPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  const [SearchTerm, setSearchTerm] = useState("")

  return (
     <>
     <SearchQuery.Provider  value={{SearchTerm,setSearchTerm}}>
      {!shouldHideLayout && <Header />}
      <main className="min-h-[78vh]">
        <ScrollToTop />
        <Outlet />
      </main>
      {!shouldHideLayout && <Footer />}
      <Toaster position="top-center" reverseOrder={false} />
      </SearchQuery.Provider>
    </>
  );
}

export default App;
