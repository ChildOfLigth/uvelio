import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Header from "@ui/Header/Header.jsx";
import Footer from "@ui/Footer.jsx";
import Main from "@pages/Main.jsx";
import UserPage from "@pages/UserPage";
import { AboutUs } from "@pages/AboutUs.jsx";
import { ProductsCatalog } from "@pages/ProductsCatalog/ProductsCatalog.jsx";
import ProductPage from "@pages/ProductPage/ProductPage.jsx";
import { NotFound } from "@pages/NotFound.jsx";
import "./assets/styles/custom-classes.scss";
import "./assets/styles/globalStyles.scss";
import CheckoutPage from "@pages/CheckoutPage";
import AuthForm from "@pages/AuthForm";
import { ModalWindContext } from "./components/context/ModalWindContext";
import { checkAuthStatus } from "@redux/userAccount/accountThunk";
import { updateToken } from "./features/userAccount/accountThunk";
import { AuthContext } from "./components/context/AuthContext";
import { setClearAllFilters } from "@redux/products/productsSlice.js";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuth } = useSelector((state) => state.userAccount.accountData);
  const [visibleModalWindow, setVisibleModalWindow] = useState(false);
  const [totalNumOfProds, setTotalNumOfProds] = useState(10);

  useEffect(() => {
    if (!location.pathname.includes("catalog")) {
      dispatch(setClearAllFilters());
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleCheckAuthStatus = async () => {
      try {
        await dispatch(checkAuthStatus()).unwrap();
      } catch (err) {
        if (err?.code === 401) {
          try {
            await dispatch(updateToken()).unwrap();
            await dispatch(checkAuthStatus()).unwrap();
          } catch (refreshErr) {
            return;
          }
        }
      }
    };

    handleCheckAuthStatus();
  }, [dispatch]);

  return (
    <>
      <AuthContext.Provider value={{ isAuth }}>
        <ModalWindContext.Provider
          value={{ visibleModalWindow, setVisibleModalWindow }}
        >
          <Header />
          <main>
            <Routes>
              <Route path="/uvelio/" element={<Main />} />
              <Route path="/uvelio/about-us" element={<AboutUs />} />
              <Route
                path="/uvelio/catalog"
                element={
                  <ProductsCatalog
                    totalNumOfProds={totalNumOfProds}
                    setTotalNumOfProds={setTotalNumOfProds}
                  />
                }
              />
              <Route
                path="/uvelio/catalog/:category"
                element={
                  <ProductsCatalog
                    totalNumOfProds={totalNumOfProds}
                    setTotalNumOfProds={setTotalNumOfProds}
                  />
                }
              />
              <Route path="/uvelio/product/:prodId" element={<ProductPage />} />
              <Route path="/uvelio/checkout" element={<CheckoutPage />} />
              <Route path="/uvelio/auth-form" element={<AuthForm />} />
              <Route path="/uvelio/user/:userId" element={<UserPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </ModalWindContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default App;
