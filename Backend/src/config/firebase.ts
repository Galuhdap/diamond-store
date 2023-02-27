import { initializeApp } from "firebase/app";

class Firebase{

    static async init() {
        const firebaseConfig = {
            apiKey: "AIzaSyDAudwkoXCl4B7gxC57GDw-l8Sp_-COvz0",
            authDomain: "diamondstore-64aaa.firebaseapp.com",
            projectId: "diamondstore-64aaa",
            storageBucket: "diamondstore-64aaa.appspot.com",
            messagingSenderId: "303687088760",
            appId: "1:303687088760:web:c0e37fedfad94eeb40cb8d"
          };
          
          initializeApp(firebaseConfig);
    }


}

export default Firebase;