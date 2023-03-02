import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import CreateRecipe2 from "./pages/CreateRecipe2";
import Home2 from "./pages/Home2";
import Footer from "./components/Footer";
import RecipeDetail from "./pages/RecipeDetail";
import UserInfo from "./components/ProfileComponent/UserInfo";
import Account from "./components/ProfileComponent/Account";
import RecipeManagement from "./components/ProfileComponent/RecipeManagement";
import ExchangeHistory from "./components/ProfileComponent/ExchangeHistory";
import { useSelector } from "react-redux";
import ModalLogin from "./components/auth/ModalLogin";
import Loading from "./components/Loading";
import { Toaster } from "react-hot-toast";

const App = () => {

   const isShowPopup = useSelector(state => state.auth.signIn.isShowPopup);
   const isLoading = useSelector(state => state.loading.isLoading);

   return (
      <Router>
         <Navbar />
         <div className="container main">
            <Routes>
               {/* <Route path="/" element={<HomeComponent />} /> */}
               <Route path="/" element={<Home2/>}/>
               <Route path="/profile" element={<Profile/>}>
                  <Route path="information" element={<UserInfo/>}/>
                  <Route path="account" element={<Account/>}/>
                  <Route path="recipes" element={<RecipeManagement/>}/>
                  <Route path="exchange-history" element={<ExchangeHistory/>}/>
               </Route>
               <Route path="/create-recipe" element={<CreateRecipe2 />} />
               <Route path="/settings" element={<Settings />} />
               <Route path="/auth">
                  <Route path="sign-in" element={<SignIn />} />
                  <Route path="sign-up" element={<SignUp />} />
               </Route>
               <Route path="recipe/:id" element={<RecipeDetail/>}/>
            </Routes>
         </div>
         <Footer/>
         <Toaster
            position="top center"
         />
         {isShowPopup && <ModalLogin/>}
         {isLoading && <Loading isLoading={isLoading}/>}
      </Router>
   );
};

export default App;
