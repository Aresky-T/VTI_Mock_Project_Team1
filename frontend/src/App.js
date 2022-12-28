import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import CreateRecipe from './pages/CreateRecipe'
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className='container main'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/create-recipe' element={<CreateRecipe />} />
                    <Route path='/auth'>
                        <Route path='sign-in' element={<SignIn/>}/>
                        <Route path='sign-up' element={<SignUp/>}/>
                    </Route>
                </Routes>
            </div>
        </Router>
    )
}

export default App