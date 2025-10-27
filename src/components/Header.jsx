import { ShoppingCart, Phone, User } from "lucide-react";

export default function Header({ onCartOpen, cartCount }) {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <Phone className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <p className="text-sm text-gray-500">Refurb & Resale</p>
            <h1 className="text-lg font-semibold tracking-tight">Mobile Mart</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-50"
          >
            <User className="h-4 w-4" />
            <span>Sign in</span>
          </button>
          <button
            type="button"
            onClick={onCartOpen}
            aria-label="Open cart"
            className="relative inline-flex items-center rounded-full border border-gray-200 p-2 hover:bg-gray-50"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 min-w-[1.25rem] rounded-full bg-indigo-600 px-1 text-center text-xs font-semibold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
