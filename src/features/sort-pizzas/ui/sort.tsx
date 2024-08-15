import React, {useEffect, useRef, useState} from 'react';
import '../../../app/Styles/scss/_variables.scss'
import '../../../app/Styles/scss/app.scss'
import '../ui/sort.scss'
import {setSort} from "../../../app/Redux/Slices/filterSlice";
import {useAppDispatch, useAppSelector} from "../../../app/Redux/Types/types";
import {orderSelector} from "../model/selectors";
import {SortIcon} from "../../../shared/ui/icons/sortIcon";

export const Sort: React.FC<{ Order: () => void }> = (props) => {
    const [open, setOpen] = useState<boolean>(false)
    const [selected, setSelected] = useState<number>(0)
    const list: Array<string> = ['популярности', 'цене', 'алфовиту']
    const sortRef = useRef<HTMLDivElement | null>(null)

    const order = useAppSelector(orderSelector)

    const dispatch = useAppDispatch()

    const onSelectedItemClick = (index: number) => {
        setSelected(index)
        dispatch(setSort(index))
    }

    useEffect(() => {
        const handelClickSortRef = (event: MouseEvent) => {
            if (!event.composedPath().includes(sortRef.current as HTMLDivElement)) {
                setOpen(false)
            }
        }

        document.body.addEventListener('click', handelClickSortRef)
        return () => {
            document.body.removeEventListener('click', handelClickSortRef)
        }
    }, [])

    return (
        <div className="sort" ref={sortRef}>
            <div className="sort__label">
                <SortIcon/>
                <b>Сортировка по:</b>
                <span onClick={() => setOpen(open => !open)}>{list[selected]}</span>
                <img className='sortIcon' style={{transform: `rotate(${order === 'desc' ? 180 : 0}deg) scaleY(-1)`}}
                     src={`${process.env.PUBLIC_URL}/sort.png`} onClick={props.Order} alt={'sort icon'}/>
            </div>
            {open && <div className="sort__popup">
                <ul>
                    {list.map((item, index) => <li className={selected === index ? "active" : ''}
                                                   onClick={() => onSelectedItemClick(index)} key={index}>{item}</li>)}
                </ul>
            </div>}
        </div>
    )
};