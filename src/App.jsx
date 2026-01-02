import { Route, Routes } from "react-router-dom"
import { Header } from "./components/ui/Header"
import { Main } from "./components/pages/Main.jsx"
import { AboutUs } from "./components/pages/AboutUs.jsx"
import { ProductsCatalog } from "./components/pages/ProductsCatalog.jsx"
import { ProductPage } from "./components/pages/ProductPage.jsx"
import { NotFound } from "./components/pages/NotFound.jsx"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/uvelio/" element={<Main />} />
        <Route path="/uvelio/about-us" element={<AboutUs />} />
        <Route path="/uvelio/catalog" element={<ProductsCatalog />} />
        <Route path="/uvelio/catalog/:productName" element={<ProductPage />} />
        <Route path="/uvelio/page-not-found" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
