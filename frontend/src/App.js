<<<<<<< Updated upstream
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
=======
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreateRecipe from "./pages/CreateRecipe";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import ProfilePage from "./pages/ProfilePage";
import Settings from "./pages/Settings";
import HomePage from "./pages/HomePage";

const App = () => {
   return (
      <Router>
         <Navbar />
         <div className="container main">
            <Routes>
               <Route path="/" element={<HomePage />} />
               <Route path="/userprofile" element={<ProfilePage />} />
               <Route path="/create-recipe" element={<CreateRecipe />} />
               <Route path="/settings" element={<Settings />} />
               <Route path="/auth">
                  <Route path="sign-in" element={<SignIn />} />
                  <Route path="sign-up" element={<SignUp />} />
               </Route>
            </Routes>
         </div>
      </Router>
   );
};
>>>>>>> Stashed changes

export default App;
