import React, { useState } from "react";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import CartPanel from "./components/CartPanel";
import CheckoutModal from "./components/CheckoutModal";
import { PRODUCTS } from "./data/products";
import "./styles.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const categories = [...new Set(PRODUCTS.map(p => p.category))];

  const filtered = PRODUCTS.filter(p => {
    const qMatch = p.name.toLowerCase().includes(query.toLowerCase()) || p.desc.toLowerCase().includes(query.toLowerCase());
    const cMatch = !category || p.category === category;
    return qMatch && cMatch;
  });

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(it => it.product.id === product.id);
      if (existing) {
        return prev.map(it =>
          it.product.id === product.id
            ? { ...it, qty: Math.min(it.qty + 1, product.stock) }
            : it
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const updateQty = (id, qty) => {
    setCart(prev =>
      prev.map(it =>
        it.product.id === id
          ? { ...it, qty: Math.max(0, qty) }
          : it
      ).filter(it => it.qty > 0)
    );
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(it => it.product.id !== id));
  };

  const checkout = () => {
    setShowCheckout(true);
    setShowCart(false);
  };

  const submitOrder = (form) => {
    console.log("Pesanan terkirim:", { form, cart });
    alert("Pesanan berhasil dikirim! (simulasi)");
    setCart([]);
    setShowCheckout(false);
  };

  return (
    <>
      <Header
        query={query}
        setQuery={setQuery}
        category={category}
        setCategory={setCategory}
        categories={categories}
        openCart={() => setShowCart(true)}
        cartCount={cart.reduce((s, it) => s + it.qty, 0)}
      />

      <main className="main">
        <section className="products-grid">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} onAdd={addToCart} />
          ))}
        </section>

        {showCart && (
          <CartPanel
            cart={cart}
            updateQty={updateQty}
            removeItem={removeItem}
            checkout={checkout}
            close={() => setShowCart(false)}
          />
        )}

        {showCheckout && (
          <CheckoutModal
            cart={cart}
            onSubmit={submitOrder}
            close={() => setShowCheckout(false)}
          />
        )}
      </main>

      <footer className="site-footer">
        <small>© 2025 Toko React Belanja Murah, Aman, dan Terpercaya</small>
      </footer>
    </>
  );
}
