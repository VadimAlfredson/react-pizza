import React, {useEffect, useRef, useState} from 'react';
import '../scss/_variables.scss'
import '../scss/app.scss'
import {setSort} from "../app/Redux/Slices/filterSlice";
import {useAppDispatch} from "../types/types";

const Sort: React.FC<{Order: () => void}> = (props) => {
    const [open, setOpen] = useState<boolean>(false)
    const [selected, setSelected] = useState<number>(0)
    const list: Array<string> = ['популярности', 'цене', 'алфовиту']
    const sortRef = useRef<HTMLDivElement | null>(null)

    const dispatch = useAppDispatch()

    const onSelectedItemClick = (index: number) => {
        setSelected(index)
        dispatch(setSort(index))
    }

    useEffect(() => {
        const handelClickSortRef = (event: MouseEvent) => {
            if (!event.composedPath().includes(sortRef.current as HTMLDivElement)){
                setOpen(false)
            }
        }

        document.body.addEventListener('click', handelClickSortRef)
        return () => {document.body.removeEventListener('click', handelClickSortRef)
    }}, [])

    return (
        <div className="sort" ref={sortRef}>
            <div className="sort__label">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={() => setOpen(open => !open)}>{list[selected]}</span>
                <img style={{width: 20, height: 20, margin: 3}} src={`${process.env.PUBLIC_URL}/sort.png`} onClick={props.Order} alt={'sort icon'}/>
            </div>
            {open && <div className="sort__popup">
                <ul>
                    {list.map((item, index) => <li className={selected === index ? "active" : ''} onClick={() => onSelectedItemClick(index)} key={index}>{item}</li>)}
                </ul>
            </div>}
        </div>
    )
};

export default Sort;