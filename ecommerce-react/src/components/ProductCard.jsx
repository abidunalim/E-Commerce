import React from "react";

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="card">
      <div className="product-image">
        {product.name.split(" ").slice(0, 2).join(" ")}
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>{product.name}</strong>
          <span className="price">Rp {product.price.toLocaleString("id-ID")}</span>
        </div>
        <p className="desc">{product.desc}</p>
        <p className="stock">Stok: {product.stock}</p>
      </div>
      <div className="actions">
        <button className="primary" onClick={() => onAdd(product)}>Tambah</button>
      </div>
    </div>
  );
}
