import { useState } from "react";

const CATEGORIES = ["All", "Food", "Toys", "Accessories"];

export default function MobileFilters({
  selectedCategory,
  setSelectedCategory,
  search,
  setSearch,
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="sm:hidden mb-6 space-y-3">
      <div className="relative w-full">
        <p className="block text-sm font-semibold mb-1 text-orange-600">
          Filters
        </p>
        <button
          className="w-full px-2 py-1 bg-white text-sm border border-gray-300 rounded-lg text-left"
          onClick={() => setOpen(!open)}
        >
          {selectedCategory}
        </button>
        {open && (
          <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 z-10">
            {CATEGORIES.map((cat) => (
              <li
                key={cat}
                className="px-2 py-1 text-sm hover:bg-orange-100 cursor-pointer"
                onClick={() => {
                  setSelectedCategory(cat);
                  setOpen(false);
                }}
              >
                {cat}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1 text-orange-600">
          Search
        </label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full px-2 py-1 text-sm border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400"
        />
      </div>
    </div>
  );
}
