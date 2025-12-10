import React, { useState, useEffect, useMemo } from "react";
import Footer from "./Footer";

import iphone from "../images/iphone.jpg"; 
import samsung from "../images/samsung.jpg"; 
import vivo from "../images/vivo.jpg"; 
import oneplus from "../images/oneplus.jpg"; 
import xiaomi from "../images/xiaomi.jpeg"; 
import oppo from "../images/oppo.jpg"; 
import google from "../images/google.jpeg"; 
import realme from "../images/realme.jpg";
import Nothing from "../images/Nothing.jpg";  
import poco from "../images/poco.jpg";
import motorola from "../images/motorola.jpg";  
import iqoo from "../images/iqoo.jpg"; 

import "./Main.css";

const STORAGE_KEY = "quickbee_cart_counts_v1";



const productsList = [
  { id: 1, key: "iphone", img: iphone, title: "iphone 17 Pro Max", price: 1199 },
  { id: 2, key: "samsung", img: samsung, title: "Samsung S25 Ultra", price: 1249 },
  { id: 3, key: "google", img: google, title: "Google Pixel 10 Pro", price: 999 },
  { id: 4, key: "vivo", img: vivo, title: "Vivo X300 Pro", price: 949 },
  { id: 5, key: "oppo", img: oppo, title: "Oppo Find X9 Pro", price: 899 },
  { id: 6, key: "realme", img: realme, title: "Realme GT8Pro", price: 799 },
  { id: 7, key: "xiaomi", img: xiaomi, title: "Xiaomi 17 Pro Max", price: 1099 },
  { id: 8, key: "oneplus", img: oneplus, title: "Oneplus 15", price: 699 },
  { id: 9, key: "iqoo", img: iqoo, title: "iqoo Neo 10", price: 799 },
  { id: 10, key: "nothing", img: Nothing, title: "Nothing 3a Pro", price: 699 },
  { id: 11, key: "poco", img: poco, title: "Poco X7 Pro", price: 599 },
  { id: 12, key: "motorola", img: motorola, title: "Motorola Edge 60", price: 499 },
];

function Main() {

  const [counts, setCounts] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });


  const [search, setSearch] = useState("");
  const [showCart, setShowCart] = useState(false);


  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(counts));
    } catch {}
  }, [counts]);


  function addToCart(key) {
    setCounts(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
  }


  function removeOne(key) {
    setCounts(prev => {
      const cur = prev[key] || 0;
      const next = Math.max(0, cur - 1);
      return { ...prev, [key]: next };
    });
  }


  function clearCart() {
    setCounts({});
  }

  const filtered = productsList.filter(p =>
    p.title.toLowerCase().includes(search.trim().toLowerCase())
  );


  const cartItems = productsList
    .map(p => ({ ...p, qty: counts[p.key] || 0 }))
    .filter(p => p.qty > 0);

  const subtotal = cartItems.reduce((s, it) => s + it.price * it.qty, 0);


  const totalItems = useMemo(
    () => Object.values(counts).reduce((s, v) => s + (Number(v) || 0), 0),
    [counts]
  );

  return (
    <div>

      <header className="shop-header">
        <div className="brand">QuickBee</div>

        <div className="search-area">
          <input
            className="search-input"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search products"
          />
          {search && <button className="clear-btn" onClick={() => setSearch("")}>✕</button>}
        </div>

        <div className="cart-area">
          <button className="cart-button" onClick={() => setShowCart(prev => !prev)} aria-label="Toggle cart">
            {showCart ? "Shop" : "Cart"}
            <span className="cart-badge">{totalItems}</span>
          </button>
        </div>
      </header>


      {showCart ? (
        <main className="cart-view" style={{ padding: 24 }}>
          <h2>Your Cart</h2>

          {cartItems.length === 0 ? (
            <div style={{ marginTop: 20, padding: 18, background: "#fff", borderRadius: 8 }}>
              Your cart is empty.
            </div>
          ) : (
            <>
              <div style={{ display: "grid", gap: 16, marginTop: 16 }}>
                {cartItems.map(it => (
                  <div key={it.key} style={{
                    display: "flex",
                    gap: 16,
                    alignItems: "center",
                    padding: 12,
                    background: "#fff",
                    borderRadius: 8,
                    boxShadow: "0 6px 18px rgba(0,0,0,0.04)"
                  }}>
                    <img src={it.img} alt={it.title} style={{ width: 120, height: 90, objectFit: "contain" }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700 }}>{it.title}</div>
                      <div>Price: ${it.price}</div>
                      <div>Quantity: {it.qty}</div>
                    </div>

                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => removeOne(it.key)} style={{ padding: "8px 12px" }}>−</button>
                      <button onClick={() => addToCart(it.key)} style={{ padding: "8px 12px" }}>+</button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 18,
                padding: 14,
                background: "#fff",
                borderRadius: 8,
                boxShadow: "0 6px 18px rgba(0,0,0,0.04)"
              }}>
                <div style={{ fontWeight: 700 }}>Subtotal</div>
                <div style={{ fontWeight: 700 }}>${subtotal.toFixed(2)}</div>
              </div>

              <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
                <button onClick={clearCart} style={{ padding: "10px 16px" }}>Clear cart</button>
                <button style={{ padding: "10px 16px", background: "#2e8df5", color: "#fff", border: "none", borderRadius: 8 }}>
                  Checkout
                </button>
              </div>
            </>
          )}
        </main>
      ) : (
        <>

          <div className="product-grid-wrapper">
            <div className="product-grid">
              {filtered.length === 0 ? (
                <div className="no-results">No results found for “{search}”</div>
              ) : (
                filtered.map(p => (
                  <div className="product-card" key={p.id}>
                    <img src={p.img} alt={p.title} />
                    <h3>{p.title}</h3>
                    <p>Price: ${p.price}</p>

                    <button className="add-btn" onClick={() => addToCart(p.key)}>Add to Cart</button>
                    <p className="added-count">Added: {counts[p.key] || 0}</p>
                  </div>
                ))
              )}
            </div>
          </div>
          <Footer/>
        </>
      )}
      
    </div>
  );
}

export default Main;