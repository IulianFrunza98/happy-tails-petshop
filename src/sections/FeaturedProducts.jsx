import { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import ProductList from "../components/ProductList";
import { products } from "../data";

const PRODUCTS_PER_PAGE = 4;

function FeaturedProducts() {
  const [page, setPage] = useState(0);

  const maxPage = Math.ceil(products.length / PRODUCTS_PER_PAGE) - 1;
  const start = page * PRODUCTS_PER_PAGE;
  const end = start + PRODUCTS_PER_PAGE;
  const visibleProducts = products.slice(start, end);

  const handlePrev = () => setPage((p) => Math.max(0, p - 1));
  const handleNext = () => setPage((p) => Math.min(maxPage, p + 1));

  return (
    <section id="featuredproducts" className="relative">
      <h1 className="text-4xl font-bold text-orange-600">Featured Products</h1>
      <span
        className="text-2xl bg-white rounded-full shadow-sm p-2 absolute text-gray-500 cursor-pointer left-20 top-2/4 -translate-y-2/4"
        onClick={handlePrev}
        aria-disabled={page === 0}
        style={{ opacity: page === 0 ? 0.5 : 1 }}
      >
        <BsArrowLeft />
      </span>
      <ProductList products={visibleProducts} />
      <span
        className="text-2xl bg-white rounded-full shadow-sm p-2 absolute right-20 text-gray-500 cursor-pointer top-2/4 -translate-y-2/4"
        onClick={handleNext}
        aria-disabled={page === maxPage}
        style={{ opacity: page === maxPage ? 0.5 : 1 }}
      >
        <BsArrowRight />
      </span>
    </section>
  );
}

export default FeaturedProducts;
