import FeaturedProductsList from "../components/FeaturedProductsList";

function FeaturedProducts() {
  return (
    <section id="featuredproducts" className="relative">
      <h1 className="text-4xl font-bold text-orange-600">Featured Products</h1>

      <FeaturedProductsList />
    </section>
  );
}

export default FeaturedProducts;
