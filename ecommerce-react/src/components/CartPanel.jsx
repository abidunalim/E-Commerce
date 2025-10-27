import React from "react";

export default function CartPanel({ cart, updateQty, removeItem, checkout, close }) {
  const subtotal = cart.reduce((s, it) => s + it.product.price * it.qty, 0);
  return (
    <aside className="cart-panel">
      <h2>Keranjang</h2>
      {cart.length === 0 ? (
        <p style={{ color: "var(--muted)" }}>Keranjang kosong</p>
      ) : (
        cart.map((it) => (
          <div key={it.product.id} className="cart-item">
            <div style={{ flex: 1 }}>
              <div className="title">{it.product.name}</div>
              <div className="price">
                Rp {it.product.price.toLocaleString("id-ID")}
              </div>
              <div className="qty-controls">
                <button onClick={() => updateQty(it.product.id, it.qty - 1)}>-</button>
                <span>{it.qty}</span>
                <button onClick={() => updateQty(it.product.id, it.qty + 1)}>+</button>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <strong>Rp {(it.qty * it.product.price).toLocaleString("id-ID")}</strong>
              <button onClick={() => removeItem(it.product.id)} className="remove">Hapus</button>
            </div>
          </div>
        ))
      )}
      <div className="cart-summary">
        <div>Subtotal: <strong>Rp {subtotal.toLocaleString("id-ID")}</strong></div>
        <button className="primary" onClick={checkout}>Checkout</button>
        <button className="muted" onClick={close}>Tutup</button>
      </div>
    </aside>
  );
}
