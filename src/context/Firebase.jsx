import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
   getAuth,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   GoogleAuthProvider,
   signInWithPopup,
   onAuthStateChanged,
} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";

const firebaseContext = createContext(null);

const firebaseConfig = {
   apiKey: "AIzaSyDngiPlO6Qq8pVk_rZPVEl5BKhISS2seB8",
   authDomain: "bookify-b7246.firebaseapp.com",
   projectId: "bookify-b7246",
   storageBucket: "bookify-b7246.appspot.com",
   messagingSenderId: "679943913111",
   appId: "1:679943913111:web:fa41018de0dfadddbff3d2",
};

export const useFirebase = () => useContext(firebaseContext);

const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
   // instances
   const firebaseApp = initializeApp(firebaseConfig);
   const firebaseAuth = getAuth(firebaseApp);
   const firestore = getFirestore(firebaseApp);
   const storage = getStorage(firebaseApp);

   const [user, setUser] = useState(null);

   useEffect(() => {
      onAuthStateChanged(firebaseAuth, (user) => {
         if (user) {
            setUser(user);
         } else {
            setUser(null);
         }
      });
   }, []);

   // create new list
   const handleCreateNewListing = async (name, isbn, price, cover) => {
      const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
      const uploadResult = await uploadBytes(imageRef, cover);
      return await addDoc(collection(firestore, "products"), {
         name,
         isbn,
         price,
         imageURL: uploadResult.ref.fullPath,
         // userID: user.uid,
         // userEmail: user.email,
         // displayName: user.displayName,
         // photoURl: user.photoURL,
      });
   };

   //show list
   const listAllProducts = () => {
      return getDocs(collection(firestore, "books"));
   };

   // show data of a partucular book
   const getProductById = async (id) => {
      const docRef = doc(firestore, "books", id);
      const result = await getDoc(docRef);
      return result;
   }

   // get image
   const getImageURL = (path) => {
      return getDownloadURL(ref(storage, path));
   };



   //user signup
   const signupUserWithEmailAndPassword = (email, password) => {
      createUserWithEmailAndPassword(firebaseAuth, email, password);
   };
   //user login
   const singinUserWithEmailAndPass = (email, password) => {
      signInWithEmailAndPassword(firebaseAuth, email, password);
   };
   // user signup with google
   const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

   const isLoggedIn = user ? true : false;

   return (
      <firebaseContext.Provider
         value={{
            signinWithGoogle,
            signupUserWithEmailAndPassword,
            singinUserWithEmailAndPass,
            handleCreateNewListing,
            listAllProducts,
            getProductById,
            getImageURL,
            isLoggedIn,
            user
         }}
      >
         {props.children}
      </firebaseContext.Provider>
   );
};
