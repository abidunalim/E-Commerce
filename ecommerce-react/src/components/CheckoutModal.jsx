import React, { useState } from "react";

export default function CheckoutModal({ cart, onSubmit, close }) {
  const [form, setForm] = useState({ name: "", address: "", phone: "" });
  const total = cart.reduce((s, it) => s + it.product.price * it.qty, 0);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Checkout</h2>
        <form onSubmit={submit}>
          <label>
            Nama
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Alamat
            <textarea name="address" value={form.address} onChange={handleChange} required />
          </label>
          <label>
            Telepon
            <input name="phone" value={form.phone} onChange={handleChange} required />
          </label>
          <div className="order-summary">
            {cart.map((it) => (
              <div key={it.product.id}>
                {it.product.name} x {it.qty} — Rp {(it.qty * it.product.price).toLocaleString("id-ID")}
              </div>
            ))}
            <strong>Total: Rp {total.toLocaleString("id-ID")}</strong>
          </div>
          <div className="form-actions">
            <button className="primary" type="submit">Kirim</button>
            <button type="button" className="muted" onClick={close}>Batal</button>
          </div>
        </form>
      </div>
    </div>
  );
}
