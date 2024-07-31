import { useState } from "react"



type JSONValue = string | number | boolean | null | JSONValue[] | { [key: string|number]: JSONValue }

function useLocalStorage<T extends JSONValue>(key:string, defaultValue?:T ){
    const [state, setState] = useState<T>(() => {
        const valueInLocalStorage = window.localStorage.getItem(key)
        if(valueInLocalStorage){
            return JSON.parse(valueInLocalStorage)
        }
        defaultValue !== undefined && window.localStorage.setItem(key, JSON.stringify(defaultValue))
        return defaultValue
    })

    function updateState(value: T){
        setState(value)
        window.localStorage.setItem(key, JSON.stringify(value))
    }

    return [state, updateState] as const
}


export default useLocalStorage