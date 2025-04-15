import {useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Toaster} from "sonner";
import NotFound from "./pages/NotFound";
import CartSidebar from "./components/cart/CartSidebar";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Home from "./pages/Home";
import OrderPlaced from "./pages/OrderPlaced";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Toaster richColors position="top-center" theme="system" />
        <Navbar onCartClick={openCart} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onAddToCart={openCart} />} />
            <Route path="/order-placed" element={<OrderPlaced />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <CartSidebar isOpen={isCartOpen} onClose={closeCart} />
    </BrowserRouter>
  );
}

export default App;
