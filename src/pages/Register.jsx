import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';

const RegisterPage = () => {
   const firebase = useFirebase();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const navigate = useNavigate();

   useEffect(() => {
      if (firebase.isLoggedin) {
         navigate("/")
      }
   }, [navigate, firebase])

   const handleSubmit = async (e) => {
      e.preventDefault()
      console.log("getting signup.....");
      const result = await firebase.signupUserWithEmailAndPassword(email, password)
      console.log("signup successfull", result);
   }
   return (
      <div className="container mt-4">
         <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Email address</Form.Label>
               <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Label>Password</Form.Label>
               <Form.Control onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
            </Form.Group>
            <Button onClick={handleSubmit} variant="primary" type="submit">
               Create User
            </Button>
         </Form>
      </div>
   )
}
export default RegisterPage;