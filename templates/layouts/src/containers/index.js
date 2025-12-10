import MapContainer from "./MapContainer"
import PluginsTriggerContainer from "./PluginsTriggerContainer"
import "../assets/css/penta-plugings.scss"
import ToastNotifications from "./ToastNotifications/ToastNotifications";
import DialogContainer from "./DialogContainer";
import PromptsContainer from "./PromptsContainer";
import { overlayManager } from "../components/MapOverlay"
import { useEffect } from "react"
import { ContainersProvider } from "../context/containerContext";

export const Containers = () => {
    useEffect(() => {
        overlayManager.start();
        return () => overlayManager.stop();
    }, [])
    return (
        <ContainersProvider>
            <MapContainer />
            <PluginsTriggerContainer />
            <DialogContainer />
            <ToastNotifications />
            <PromptsContainer />
        </ContainersProvider>
    )
}