import ProductsListHeader from "./ProductsListHeader";
import ProductsListSwpier from "./ProductsListSwpier";

export default function ProductList({ haveTime, name, link }) {
  return (
    <div className="mt-10 md:mt-20">
      <ProductsListHeader haveTime={haveTime} name={name} link={link} />
      <ProductsListSwpier />
    </div>
  );
}
