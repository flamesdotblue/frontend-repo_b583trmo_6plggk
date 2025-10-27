import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Filters from "./components/Filters";
import ProductGrid from "./components/ProductGrid";
import CartSheet from "./components/CartSheet";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [priceRange, setPriceRange] = useState(60000);
  const [query, setQuery] = useState("");

  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Build query string for backend
  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== "All") params.set("condition", selectedCategory);
    if (selectedBrand !== "All") params.set("brand", selectedBrand);
    if (priceRange) params.set("max_price", String(priceRange));
    if (query.trim()) params.set("q", query.trim());
    return params.toString();
  }, [selectedCategory, selectedBrand, priceRange, query]);

  // Fetch products from backend whenever filters change
  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const url = `${API_BASE}/api/products${queryString ? `?${queryString}` : ""}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to load products (${res.status})`);
        const data = await res.json();
        // Normalize to ensure id exists for UI components
        const normalized = Array.isArray(data)
          ? data.map((p) => ({
              id: p.id || p._id || p._id?.$oid || crypto.randomUUID(),
              name: p.name,
              brand: p.brand,
              condition: p.condition,
              price: Number(p.price || 0),
              mrp: p.mrp ? Number(p.mrp) : undefined,
              image: p.image || p.images?.[0] || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&auto=format&fit=crop",
            }))
          : [];
        if (active) setProducts(normalized);
      } catch (e) {
        console.error(e);
        if (active) setError(e.message || "Something went wrong");
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [queryString]);

  const brands = useMemo(() => {
    const set = new Set(products.map((p) => p.brand).filter(Boolean));
    return ["All", ...Array.from(set).sort()].filter(
      (v, i, arr) => (v === "All" ? i === 0 : true)
    );
  }, [products]);

  function addToCart(product) {
    setCart((prev) => {
      const found = prev.find((it) => it.id === product.id);
      if (found) {
        return prev.map((it) => (it.id === product.id ? { ...it, qty: it.qty + 1 } : it));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function incQty(id) {
    setCart((prev) => prev.map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it)));
  }

  function decQty(id) {
    setCart((prev) =>
      prev
        .map((it) => (it.id === id ? { ...it, qty: Math.max(1, it.qty - 1) } : it))
        .filter((it) => it.qty > 0)
    );
  }

  function removeItem(id) {
    setCart((prev) => prev.filter((it) => it.id !== id));
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header onCartOpen={() => setCartOpen(true)} cartCount={cart.reduce((s, it) => s + it.qty, 0)} />

      <main>
        <div className="bg-gradient-to-br from-indigo-50 via-white to-white">
          <div className="mx-auto max-w-6xl px-4 py-6">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Find your next phone</h2>
            <p className="text-sm text-gray-600 mt-1">Buy new, refurbished, and used phones with confidence. Fast local pickup available.</p>
          </div>
        </div>

        <Filters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          brands={brands.slice(1)}
          query={query}
          setQuery={setQuery}
        />

        {error && (
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
          </div>
        )}

        {loading ? (
          <div className="mx-auto max-w-6xl px-4 py-10 text-center text-gray-500">Loading products…</div>
        ) : (
          <ProductGrid products={products} onAddToCart={addToCart} />
        )}
      </main>

      <CartSheet
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onInc={incQty}
        onDec={decQty}
        onRemove={removeItem}
      />

      <footer className="mt-6 border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Mobile Mart — Two stores in town. Call us for trade-ins & repairs.
        </div>
      </footer>
    </div>
  );
}
