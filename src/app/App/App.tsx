import './App.css';
import '../Styles/scss/_variables.scss'
import '../Styles/scss/app.scss'
import Header from "../../widgets/header/ui/header";

import {Route, Routes} from "react-router-dom";
import {lazy, Suspense} from "react";
import Main from "../../pages/main/ui/main";
import {NotFount} from "../../pages/notFound/ui/not-fount";
import {Details} from "../../pages/detailsPizza/ui/details";

const CartLazy = lazy(() => import("../../pages/cart/ui/cart").then(module => ({default: module.Cart})))

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
