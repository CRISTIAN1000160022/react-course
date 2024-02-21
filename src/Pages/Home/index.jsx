import { useContext } from "react";
import { Layout } from "../../Components/Layout";
import { Card } from "../../Components/Card";
import { ProductDetail } from "../../Components/ProductDetail";
import { ShoppingCartContext } from "../../Hooks/Context";

function Home() {
  const context = useContext(ShoppingCartContext);

  const renderView = () => {
      if (context.filteredItems?.length > 0) {
        return context.filteredItems?.map((item) => (
          <Card key={item.id} item={item} />
        ));
      } else {
        return (
          <div className="flex items-center justify-center w-full">
            <h1 className="font-medium text-2xl">No products found</h1>
          </div>
        );
      }
    } 

  return (
    <Layout>
      <div className="flex items-center justify-center relative w-80 mb-4">
        <h1 className="font-medium text-2xl">Exclusive Products</h1>
      </div>
      <input
        className="rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        type="text"
        placeholder="Search product"
        onChange={(event) => context.setSearchByTitle(event.target.value)}
      />
      <div className="grid gap-4 grid-cols-4 w-full max-w-screen-lg">
        {renderView()}
      </div>
      <ProductDetail />
    </Layout>
  );
}

export { Home };
