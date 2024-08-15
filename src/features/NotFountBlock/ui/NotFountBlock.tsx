import React from 'react';
import style from './NotFountBlock.module.scss'

const NotFountBlock: React.FC = () => {
    return <div className={style.root}>
        <span>😕</span>
        <h1>Страница не найдена</h1>
    </div>
};

export default NotFountBlock;