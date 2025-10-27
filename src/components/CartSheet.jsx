import { X, Plus, Minus } from "lucide-react";

export default function CartSheet({ open, onClose, items, onInc, onDec, onRemove }) {
  const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);

  return (
    <div
      className={`fixed inset-0 z-30 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
      />

      {/* Sheet */}
      <aside
        className={`absolute right-0 top-0 h-full w-[92%] sm:w-[420px] bg-white shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-50"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="h-[calc(100%-160px)] overflow-y-auto px-4 py-3">
          {items.length === 0 ? (
            <p className="text-gray-500 text-sm">Your cart is empty.</p>
          ) : (
            <ul className="space-y-3">
              {items.map((it) => (
                <li key={it.id} className="flex items-center gap-3 border border-gray-100 rounded-lg p-2">
                  <img src={it.image} alt={it.name} className="h-16 w-16 rounded object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{it.name}</p>
                    <p className="text-xs text-gray-500">₹{it.price.toLocaleString()}</p>
                    <div className="mt-1 inline-flex items-center gap-1">
                      <button
                        className="rounded border border-gray-200 p-1 hover:bg-gray-50"
                        onClick={() => onDec(it.id)}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-2 text-sm">{it.qty}</span>
                      <button
                        className="rounded border border-gray-200 p-1 hover:bg-gray-50"
                        onClick={() => onInc(it.id)}
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button
                        className="ml-3 text-xs text-red-600 hover:underline"
                        onClick={() => onRemove(it.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 p-4 bg-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">Total</span>
            <span className="text-lg font-semibold">₹{total.toLocaleString()}</span>
          </div>
          <button className="w-full rounded-lg bg-indigo-600 py-3 text-white font-medium hover:bg-indigo-700">
            Checkout
          </button>
          <p className="mt-2 text-center text-xs text-gray-500">COD and bank transfer supported.</p>
        </div>
      </aside>
    </div>
  );
}
