import {useEffect, useState} from "react";

// export const useStorage =<T>(key: string):T[] => {
//     const [value, setValue] = useState('');
//     const [storageValue, setStorageValue] = useState<Object | null>(null)
//
//     useEffect(() => {
//         setValue(getLocalStorageValue);
//     }, [storageValue])
//
//     const getLocalStorageValue = () => {
//         const value: string | null = localStorage.getItem(key)
//         if (value)
//             return JSON.parse(value)
//
//         return value
//     }
//
//     const setLocalStorageValue = (obj: object | null) => {
//         localStorage.setItem(key, JSON.stringify(obj))
//         setStorageValue(obj)
//     }
//     return [
//         value,
//         setLocalStorageValue
//     ]
// }

// export const useStorage = (key: string) => {
//     const [value, setValue] = useState()
//     useEffect(() => {
//         setValue(getStorage())
//     },[])
//
//     const getStorage = () => {
//         const value: string | null = localStorage.getItem(key)
//         if (value !== null)
//             return JSON.parse(value)
//         return null
//     }
//
//     const setStorage = (obj: object) => {
//         return localStorage.setItem(key, JSON.stringify(obj))
//     }
//     return [
//         value,
//         setStorage
//     ]
// }

export const useStorage = <T> (storageKey: string, fallbackState: any) => {
        const [value, setValue] = useState(
            typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem(storageKey)) : fallbackState
        );

        useEffect(() => {
            localStorage.setItem(storageKey, JSON.stringify(value));
        }, [value, storageKey]);

        return [value, setValue];
};