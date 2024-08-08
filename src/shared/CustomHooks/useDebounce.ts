import {useEffect, useState} from "react";


export const useDebounce = (value: string, delay: number = 250) => {
const [debounceValue, setDebounceValue] = useState<string>(value)
    useEffect(() => {
        const timeout = setTimeout(() => setDebounceValue(value), delay)
        return () => {
            clearTimeout(timeout)
        }
    }, [value, delay])
    return debounceValue
}