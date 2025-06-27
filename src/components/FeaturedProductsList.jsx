import FeaturedProduct from "../components/FeaturedProduct";
import { featuredProducts } from "../data/data";

function FeaturedProductsList() {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10 w-full max-w-6xl">
      {featuredProducts.length === 0 ? (
        <li className="col-span-full text-center text-gray-500">
          No products found.
        </li>
      ) : (
        featuredProducts.map((product, index) => (
          <FeaturedProduct
            key={product.id}
            featuredProduct={product}
            index={index}
          />
        ))
      )}
    </ul>
  );
}

export default FeaturedProductsList;
