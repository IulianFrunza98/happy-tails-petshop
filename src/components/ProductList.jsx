import { products as allProducts } from "../data";
import Product from "./Product";

function ProductList({ products }) {
  const displayProducts = products || allProducts;

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10 w-full max-w-6xl">
      {displayProducts.length === 0 ? (
        <li className="col-span-full text-center text-gray-500">
          No products found.
        </li>
      ) : (
        displayProducts.map((product, index) => (
          <Product key={product.id} product={product} index={index} />
        ))
      )}
    </ul>
  );
}

export default ProductList;
