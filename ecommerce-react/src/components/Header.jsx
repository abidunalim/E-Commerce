import React from "react";

export default function Header({ query, setQuery, category, setCategory, categories, openCart, cartCount }) {
  return (
    <header className="site-header">
      <h1 className="brand">Toko React</h1>
      <div className="controls">
        <input
          type="search"
          placeholder="Cari produk..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Semua Kategori</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <button onClick={openCart}>Keranjang ({cartCount})</button>
      </div>
    </header>
  );
}
