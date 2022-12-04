/* eslint-disable react-hooks/exhaustive-deps */
import Home  from './pages/Home';
import { Route, Routes, useNavigate, } from 'react-router-dom'
import './CSS/Login.css';
import Profile from './pages/Profile';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart'
import AddProduct from './pages/AddProduct';
import AddTopping from './pages/AddTopping';
import { API, setAuthToken } from "./config/api";
import { useContext, useEffect} from "react";
import { UserContext } from "../src/context/userContext";
import Transaction from "../src/pages/Transaction";



function App() {
  let navigate = useNavigate();

  // Init user context 
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    // Redirect Auth
    if (state.isLogin === false) {
      navigate('/');
    } else {
      if (state.user.role === 'admin') {
        navigate('/transaction');
      } else if (state.user.role === 'user') {
        navigate('/');
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  useEffect(() => {
    checkUser();
  }, []);


  
  return (
   
    
    <>

    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/product/:id" element={<ProductDetail />} />
      <Route exact path="/cart" element= {<Cart/>} />
      <Route exact path="/transaction" element = {<Transaction/>} />
      <Route exact path="/addproduct" element= {<AddProduct/>} />
      <Route exact path="/addtopping" element= {<AddTopping/>} />
    </Routes>
    </>
  );

}

export default App;

