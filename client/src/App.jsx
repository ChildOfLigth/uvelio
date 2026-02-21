import { Route, Routes } from "react-router-dom";
import Header from "@ui/Header/Header.jsx";
import Footer from "@ui/Footer.jsx";
import Main from "@pages/Main.jsx";
import UserPage from "./components/pages/UserPage";
import { AboutUs } from "@pages/AboutUs.jsx";
import { ProductsCatalog } from "@pages/ProductsCatalog.jsx";
import { ProductPage } from "@pages/ProductPage.jsx";
import { NotFound } from "@pages/NotFound.jsx";
import "./assets/styles/custom-classes.scss";
import "./assets/styles/globalStyles.scss";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/uvelio/" element={<Main />} />
          <Route path="/uvelio/about-us" element={<AboutUs />} />
          <Route path="/uvelio/catalog" element={<ProductsCatalog />} />
          <Route path="/uvelio/catalog/:filter" element={<ProductsCatalog />} />
          <Route
            path="/uvelio/catalog/:productName"
            element={<ProductPage />}
          />
          <Route path="/uvelio/:id" element={<UserPage />}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
