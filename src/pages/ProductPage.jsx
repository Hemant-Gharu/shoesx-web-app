import { useNavigate, useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { useEffect, useState } from "react";
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import styles from "../styles/productPage.module.css"
import pic from "../assets/jumpman-mvp-shoes-JV1HCs (4).png"
import { LiaRupeeSignSolid } from "react-icons/lia";
import { IoIosStar } from "react-icons/io";
import { FaShippingFast } from "react-icons/fa";

const ProductPage = () => {
   const firebase = useFirebase();
   const params = useParams();
   const navigate = useNavigate()

   const [data, setData] = useState(null);
   const [url, setURL] = useState(null);
   const [qty, setQty] = useState(1);

   // get data
   useEffect(() => {
      firebase.getProductById(params.productId).then((value) => setData(value.data()))
   }, [])

   //get image
   useEffect(() => {
      if (data) {
         const imageURL = data.imageURL
         firebase.getImageURL(imageURL).then((url) => setURL(url));
      }
   }, [data])

   const placeOrder = async () => {
      const result = await firebase.placeOrder(params.bookId, qty);
      console.log("result", result);
   }

   if (data == null) return <h1>Loading...</h1>
   return (
      <div className={`container col-lg ${styles.productPage}`}>
         <div className={`col-lg col-md ${styles.imageContainer}`}>
            <div className={styles.smallImageSection}>
               <div className={styles.smallImages}></div>
               <div className={styles.smallImages}></div>
               <div className={styles.smallImages}></div>
               <div className={styles.smallImages}></div>
               <div className={styles.smallImages}></div>
            </div>
            <div className={styles.largeImageSection}>
               <img src={pic} className={styles.image} />
            </div>
         </div>
         <div className={`col-lg col-md ${styles.descriptionContainer}`}>
            <h2 className={styles.brand}>{data.brand}</h2>
            <p className={styles.title}>{data.title}</p>
            <div className={styles.priceSection}>
               <div className={styles.price}>MRP <LiaRupeeSignSolid />: {data.price}.00
                  <span className={styles.off}>40% off</span>
                  <p className={styles.tax}>(Inclusive of all Taxes)</p>
               </div>
            </div>
            <p className={styles.ratings}>{data.rating}<IoIosStar className={styles.star} /> </p><span>77 Ratings</span>
            <div className={styles.shipping}>
               <FaShippingFast className={styles.shippingIcon} />
               <span className={styles.shippingText}>Free Shipping</span>
            </div>
            <div className={styles.sizeSection}>
               Size:
               <button className={styles.size}>UK 6</button>
               <button className={styles.size}>UK 7</button>
               <button className={styles.size}>UK 8</button>
               <button className={styles.size}>UK 9</button>
               <button className={styles.size}>UK 10</button>
            </div>
            <p className={styles.color}>Color: {data.color}</p>
            <div className={styles.buyBtn}>
               <button onClick={()=> navigate(`/home/orderpage/:${params.productId}/order`)} className={styles.btn}>BUY NOW</button>
               <button className={styles.btn}>ADD TO CART</button>
            </div>
            <div className={styles.return}>
               <h3 className={styles.returnHeading}>Shipping and Returns</h3>
               <p>Free return for all qualifying orders within <strong>15 days of your order delivery date.</strong> Visit our <a href="https://in.puma.com/in/en/help/returns">Return Policy </a>for more information.</p>
               <p className={styles.contact}>For any queries, please contact Customer Service at 080-35353535 or via customercareindia@shoesx.com .</p>
            </div>
         </div>
      </div>
   )

}
export default ProductPage;