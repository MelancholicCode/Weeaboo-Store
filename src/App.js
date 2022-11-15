import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Catalog from "./components/Catalog/Catalog";
import Cart from "./pages/Cart/Cart";
import ProductPage from "./pages/ProductPage/ProductPage";

function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={
            <Catalog/>
            }/>
          <Route path="/cart" element={
            <Cart/>
          }/>
          <Route path="/catalog/product-page" element={<ProductPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
