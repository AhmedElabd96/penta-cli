import { useCallback } from "react";
import {createContext, useState} from "react";

export const ContainersContext = createContext(null);

export const ContainersProvider = ({ children }) => {
    const [activeTriggerId , setActiveTriggerId] = useState(null);

    const deactivateTrigger = useCallback(() =>{
        setActiveTriggerId(null);
    },[])
  
    const value = {
        deactivateTrigger,
        activeTriggerId,
        setActiveTriggerId
    };
  
    return <ContainersContext.Provider value={value}>{children}</ContainersContext.Provider>;
  };