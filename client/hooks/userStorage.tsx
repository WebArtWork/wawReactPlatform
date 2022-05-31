import {useEffect, useState} from "react";

export const userStorage = (key: string) => {
    const [value, setValue] = useState(null);
    useEffect(() => {
        setValue(getLocalStorageValue);
    }, [value])

    const getLocalStorageValue = () => {
        const value: string | null = localStorage.getItem(key)
        if (value)
            return JSON.parse(value)

        return value
    }

    const setLocalStorageValue = (obj: object | null) => {
        return localStorage.setItem(key, JSON.stringify(obj))
    }
    return [
        value,
        setValue
    ]
}