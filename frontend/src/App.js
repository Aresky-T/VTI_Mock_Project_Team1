import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeComponent from "./components/HomeComponents/HomeComponent";
import CreateRecipe from "./pages/CreateRecipe";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Home from "./pages/Home";
import Ingredient from "./pages/Ingredient";

const App = () => {
   return (
      <Router>
         <Navbar />
         <div className="container main">
            <Routes>
               {/* <Route path="/" element={<HomeComponent />} /> */}
               <Route path="/" element={<Home/>}/>
               <Route path="/profile" element={<Profile/>} />
               <Route path="/create-recipe" element={<CreateRecipe />} />
               <Route path="/settings" element={<Settings />} />
               <Route path="/auth">
                  <Route path="sign-in" element={<SignIn />} />
                  <Route path="sign-up" element={<SignUp />} />
               </Route>
               <Route path="/ingredient" element={<Ingredient/>}/>
            </Routes>
         </div>
      </Router>
   );
};

export default App;
