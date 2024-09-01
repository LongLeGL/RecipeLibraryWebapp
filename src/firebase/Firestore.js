import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDocs,
  query,
  where,
  limit,
} from "firebase/firestore";

class Firestore {
  constructor(app) {
    this.db = getFirestore(app);
  }

  async addUser(fname, lname, email) {
    try {
      const docRef = await addDoc(collection(this.db, "users"), {
        fname: fname,
        lname: lname,
        email: email,
      });
      console.log("User added with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding user: ", e);
    }
  }

  getUserByEmail(email) {
    const usersRef = collection(this.db, "users");
    const q = query(usersRef, where("email", "==", email), limit(1));
    // Execute query
    return new Promise((resolve, reject)=>{
      getDocs(q)
      .then((querySnapshot) => {
        if(querySnapshot.docs.length == 0){
          console.error("No user found with email:", email)
          reject(null);
        }
        
        querySnapshot.forEach((doc) => {
          resolve(doc.data());
        })
      })
    });
  }
}

export default Firestore;
