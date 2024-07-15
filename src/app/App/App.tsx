import './App.css';
import '../../scss/_variables.scss'
import '../../scss/app.scss'
import Header from "../../components/Header";

import {Route, Routes} from "react-router-dom";
import Home from "../../Pages/Home";
import NotFount from "../../Pages/NotFount";
import PizzaInfo from "../../Pages/PizzaInfo";
import {lazy, Suspense} from "react";

const CartLazy = lazy(() => import("../../Pages/Cart"))

function App() {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Suspense fallback={'Загрузка...'}>
                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/cart' element={<CartLazy />}/>
                    <Route path='/*' element={<NotFount />}/>
                    <Route path='/pizza/:id' element={<PizzaInfo />}/>
                </Routes>
                </Suspense>
            </div>
        </div>
    );
}

export default App;
