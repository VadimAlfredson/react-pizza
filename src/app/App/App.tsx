import './App.css';
import '../Styles/scss/_variables.scss'
import '../Styles/scss/app.scss'
import Header from "../../widgets/Header/ui/Header";

import {Route, Routes} from "react-router-dom";

import NotFount from "../../pages/notFound/ui/NotFount";
import {lazy, Suspense} from "react";
import Main from "../../pages/main/ui/Main";
import Details from "../../pages/detailsPizza/ui/details";

const CartLazy = lazy(() => import("../../pages/cart/ui/Cart"))

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
