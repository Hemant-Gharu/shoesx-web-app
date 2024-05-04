import React, { useState } from 'react';

const OrderPage = () => {
   const [name, setName] = useState('');
   const [address, setAddress] = useState('');
   const [phoneNumber, setPhoneNumber] = useState('');

   const handleSubmit = async (e) => {
      // e.preventDefault();

      // try {
      //    const firestore = firebase.firestore();
      //    await firestore.collection('orders').add({
      //       name,
      //       address,
      //       phoneNumber,
      //       timestamp: firebase.firestore.FieldValue.serverTimestamp()
      //    });
      //    // Optionally, you can redirect the user to a thank you page or display a success message
      // } catch (error) {
      //    console.error('Error saving order:', error);
      // }
   };

   return (
      <div>
         <h1>Order Page</h1>
         <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

            <label>Address:</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />

            <label>Phone Number:</label>
            <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />

            <button type="submit">Place Order</button>
         </form>
      </div>
   );
};

export default OrderPage;
