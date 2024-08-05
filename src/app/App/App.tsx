import './App.css';
import '../../scss/_variables.scss'
import '../../scss/app.scss'
import Header from "../../components/Header";

import {Route, Routes} from "react-router-dom";

import NotFount from "../../Pages/NotFount";
import {lazy, Suspense} from "react";
import Main from "../../Pages/main/ui/Main";
import Details from "../../Pages/detailsPizza/ui/details";

const CartLazy = lazy(() => import("../../Pages/Cart"))

function App() {
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Suspense fallback={'Загрузка...'}>
                    <Routes>
                        <Route path='/' element={<Main/>}/>
                        <Route path='/cart' element={<CartLazy/>}/>
                        <Route path='/*' element={<NotFount/>}/>
                        <Route path='/pizza/:id' element={<Details/>}/>
                    </Routes>
                </Suspense>
            </div>
        </div>
    );
}

export default App;
