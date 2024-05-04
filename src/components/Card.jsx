import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useFirebase } from "../context/Firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BookCard = (props) => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [url, setURL] = useState(null);

  // console.log("props => ",props.link);

  //show image
  useEffect(() => {
    firebase.getImageURL(props.imageURL).then((url) => setURL(url));
  }, []);

  return (
    <Card style={{ width: "15rem", margin: "1rem" }}>
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          This book has a title Complete React Series By {props.name} and this
          book is sold by {props.name} and this book costs Rs. {props.price}
        </Card.Text>
        <Button onClick={(e)=> navigate(props.link)} variant="primary">View</Button>
      </Card.Body>
    </Card>
  );
};
export default BookCard;
