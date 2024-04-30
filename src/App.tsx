import './App.css';
import './scss/_variables.scss'
import './scss/app.scss'
import Header from "./components/Header";

import {Route, Routes} from "react-router-dom";
import Home from "./Pages/Home";
import NotFount from "./Pages/NotFount";
import Cart from "./Pages/Cart";



function App() {

    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/cart' element={<Cart />}/>
                    <Route path='/*' element={<NotFount />}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
