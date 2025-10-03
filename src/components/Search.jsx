const CATEGORIES = ["All", "Food", "Toys", "Accessories"];

export default function Search({
  selectedCategory,
  setSelectedCategory,
  search,
  setSearch,
  className = "",
}) {
  return (
    <aside className={`md:w-64 w-full ${className}`}>
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <h2 className="text-lg font-bold mb-4 text-orange-600">Filter</h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Category</label>
          <div className="flex flex-col gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`text-left px-3 py-2 rounded transition ${
                  selectedCategory === cat
                    ? "bg-orange-500 text-white"
                    : "hover:bg-orange-100"
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Search</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
      </div>
    </aside>
  );
}
