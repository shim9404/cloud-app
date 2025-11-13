/*  
 * firebase API를 사용하여 웹 서비스를 제공받기 위한 초기화 작업
*/
// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyD1B-S8pXv0RrLi6Pxw8Ch6AcrMqZ_Jm_g",
    authDomain: "f-kosmo-251110.firebaseapp.com",
    projectId: "f-kosmo-251110",
    storageBucket: "f-kosmo-251110.firebasestorage.app",
    messagingSenderId: "316195913839",
    appId: "1:316195913839:web:7bdd72308ba4a28dae0d9a"
  };

  // Initialize Firebase
  // 변수(app) 앞에 export를 붙여서 외부(html, js)에서 사용 가능하도록 구현함.
  export const app = initializeApp(firebaseConfig);

