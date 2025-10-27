import { useMemo, useState } from "react";
import Header from "./components/Header";
import Filters from "./components/Filters";
import ProductGrid from "./components/ProductGrid";
import CartSheet from "./components/CartSheet";

const initialProducts = [
  {
    id: "p1",
    name: "Apple iPhone 12 (64GB) - Black",
    brand: "Apple",
    condition: "Refurbished",
    price: 35999,
    mrp: 49999,
    image: "https://images.unsplash.com/photo-1611120159972-050e0fbb7ab4?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxBcHBsZSUyMGlQaG9uZSUyMDEyJTIwJTI4NjRHQiUyOSUyMC0lMjBCbGFja3xlbnwwfDB8fHwxNzYxNTg2OTczfDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80",
  },
  {
    id: "p2",
    name: "Samsung Galaxy S21 FE (128GB) - Graphite",
    brand: "Samsung",
    condition: "Used",
    price: 24999,
    mrp: 39999,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p3",
    name: "OnePlus 11R (256GB) - Sonic Black",
    brand: "OnePlus",
    condition: "New",
    price: 39999,
    mrp: 42999,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p4",
    name: "Xiaomi Redmi Note 12 Pro (128GB) - Blue",
    brand: "Xiaomi",
    condition: "Refurbished",
    price: 16999,
    mrp: 21999,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p5",
    name: "Apple iPhone 13 (128GB) - Starlight",
    brand: "Apple",
    condition: "Used",
    price: 44999,
    mrp: 59999,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p6",
    name: "Samsung Galaxy A54 (128GB) - Lime",
    brand: "Samsung",
    condition: "New",
    price: 28999,
    mrp: 30999,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [priceRange, setPriceRange] = useState(60000);
  const [query, setQuery] = useState("");

  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const brands = useMemo(() => {
    const set = new Set(initialProducts.map((p) => p.brand));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    return initialProducts.filter((p) => {
      const inCategory =
        selectedCategory === "All" || p.condition === selectedCategory;
      const inBrand = selectedBrand === "All" || p.brand === selectedBrand;
      const inPrice = p.price <= priceRange;
      const inQuery = p.name.toLowerCase().includes(query.toLowerCase().trim());
      return inCategory && inBrand && inPrice && inQuery;
    });
  }, [selectedCategory, selectedBrand, priceRange, query]);

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
          brands={brands}
          query={query}
          setQuery={setQuery}
        />

        <ProductGrid products={filtered} onAddToCart={addToCart} />
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
