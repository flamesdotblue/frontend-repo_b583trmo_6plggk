import { Filter } from "lucide-react";

const categories = ["All", "New", "Refurbished", "Used"];

export default function Filters({
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  priceRange,
  setPriceRange,
  brands,
  query,
  setQuery,
}) {
  return (
    <section className="w-full bg-white px-4 py-3 border-b border-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <Filter className="h-4 w-4" />
          <span className="text-sm font-medium">Filter & search</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="col-span-2 sm:col-span-1 flex gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full border text-sm whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="sm:col-span-1">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All brands</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search models, e.g., iPhone 12"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="sm:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Max price</label>
                <input
                  type="range"
                  min={5000}
                  max={100000}
                  step={1000}
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="w-24 text-right">
                <div className="text-xs text-gray-500">Up to</div>
                <div className="font-semibold">₹{priceRange.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
