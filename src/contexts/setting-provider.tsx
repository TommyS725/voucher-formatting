import useLocalStorage from "@/hooks/useLocalStorage";
import { createContext, useContext } from "react";


type SettingConfig<T> = {
    StorageKey: string
    defaultValue: T
} 

type SettingProviderProps = {
    children: React.ReactNode
    config:{
        autoIncrement: SettingConfig<boolean>
    }
}

type SettingEntrySatate<T> = {
    value:T
    setValue:(value:T)=>void
}

type SettingProviderState = {
    autoIncrement: SettingEntrySatate<boolean>
}

const initialState = {
    autoIncrement:{
        value:false,
        setValue:()=>{}
    }
} satisfies SettingProviderState



const SettingProviderContext = createContext<SettingProviderState>(initialState)



export function SettingProvider({ children ,config}:SettingProviderProps) {
    const {autoIncrement: autoIncrementConfig} = config
    const [autoIncrement, setAutoIncrement] = useLocalStorage<boolean>(autoIncrementConfig.StorageKey, autoIncrementConfig.defaultValue)

    const value = {
        autoIncrement:{
            value:autoIncrement,
            setValue:setAutoIncrement
        }
    }
    return (
        <SettingProviderContext.Provider value={value}>
            {children}
        </SettingProviderContext.Provider>
    )
}

export function useSettingContext(){
    const context =  useContext(SettingProviderContext)
    return context
}