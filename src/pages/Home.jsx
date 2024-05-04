import { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import BookCard from "../components/Card";
import CardGroup from "react-bootstrap/CardGroup";

const HomePage = () => {
  const firebase = useFirebase();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    firebase.listAllProducts().then((products) => setProducts(products.docs));
  }, []);
  return (
    <div className="container">
      List Books Here
      <CardGroup>
        {products.map((product) => (
          <BookCard
            link={`home/orderpage/${product.id}`}
            key={product.id}
            id={product.id}
            {...product.data()}
          />
        ))}
      </CardGroup>
    </div>
  );
};
export default HomePage;
