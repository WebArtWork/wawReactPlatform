export const useStorage = (key: string) => {
    const value = () => {
        const value: string | null = localStorage.getItem(key)
        if (value !== null)
            return JSON.parse(value)
        return {}
    }

    const setValue = (obj: object) => {
        return localStorage.setItem(key, JSON.stringify(obj))
    }
    return [
        value,
        setValue
    ]
}