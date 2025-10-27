import { BadgeCheck } from "lucide-react";

function ConditionBadge({ condition }) {
  const map = {
    New: "bg-green-100 text-green-700",
    Refurbished: "bg-amber-100 text-amber-700",
    Used: "bg-blue-100 text-blue-700",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${map[condition] || "bg-gray-100 text-gray-700"}`}>
      <BadgeCheck className="h-3 w-3" /> {condition}
    </span>
  );
}

export default function ProductGrid({ products, onAddToCart }) {
  return (
    <section className="px-4 py-4">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <article key={p.id} className="group rounded-xl border border-gray-200 overflow-hidden bg-white hover:shadow-sm transition-shadow">
              <div className="aspect-square overflow-hidden bg-gray-50">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <ConditionBadge condition={p.condition} />
                  <span className="text-xs text-gray-500">{p.brand}</span>
                </div>
                <h3 className="text-sm font-medium leading-snug line-clamp-2 min-h-[2.5rem]">{p.name}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold">₹{p.price.toLocaleString()}</div>
                    {p.mrp && (
                      <div className="text-xs text-gray-500 line-through">₹{p.mrp.toLocaleString()}</div>
                    )}
                  </div>
                  <button
                    onClick={() => onAddToCart(p)}
                    className="rounded-lg bg-indigo-600 px-3 py-1.5 text-white text-sm hover:bg-indigo-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center text-gray-500 py-16">No products match your filters.</div>
        )}
      </div>
    </section>
  );
}
