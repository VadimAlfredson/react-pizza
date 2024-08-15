import React from 'react';

import '../../../app/App/App.css';
import '../../../app/Styles/scss/_variables.scss'
import '../../../app/Styles/scss/app.scss'
import style from "../ui/not-found.module.scss";

export const NotFount: React.FC = () => {

    return <div className={style.root}>
        <span>😕</span>
        <h1>Страница не найдена</h1>
    </div>
};