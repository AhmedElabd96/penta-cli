import { componentRegistry, selectorsRegistry, apiRegistry } from "@penta-b/ma-lib";
import LoadingComponent, { SystemLoadingComponent } from "./components/LoadingComponent/Loading.component";
import { messages } from "./messages";
import { LOCALIZATION_NAMESPACE } from "./constants/constants";
import { Box, PentaToasterProvider, useDirection } from "@penta-b/chakra-ui";
import ThemeProvider from "./theming";
import { Containers } from "./containers";
import CustomToastMessage from "./containers/ToastNotifications/CustomToastMessage";
import { ContainersContext } from "./context/containerContext";
import MoreInfo from "./components/MoreInfo";
import "./assets/css/penta-plugings.scss"

//# Register selectors (should be exposed by ma-lib)
selectorsRegistry.register("selectPopups", (state) => state.systemReducer.popups)
selectorsRegistry.register("selectNotifications", (state) => state.systemReducer.notifications)

//# Register components
componentRegistry.register("SystemLoadingComponent", SystemLoadingComponent); // override loading indecator.
componentRegistry.register("MoreInfo", MoreInfo); //override default moreinfo from the framework.
componentRegistry.register("ThemeProvider", ThemeProvider) // register theme provider to be used by plugins if needed in Overlays.


//# Register APIs
apiRegistry.register("ContainersContext", ContainersContext); // register the ContainerContext to handle deactivate triggers when needed.

//# Register localizations
export const localization = {
    namespace: LOCALIZATION_NAMESPACE, defaultLocalization: messages,
};

// define toast config
const ToastConfig = {
    placement: 'bottom',
    pauseOnPageIdle: false,
    overlap: true,
    max: 3
}

export const main = () => {
    const isRTL = useDirection();
    return <ThemeProvider>
        <PentaToasterProvider config={ToastConfig}>
            <Box
                position="relative"
                width="100%"
                height="100%" className={LOCALIZATION_NAMESPACE}
                direction={isRTL ? "rtl" : "ltr"}
            >
                <Containers />
                <LoadingComponent />
                <CustomToastMessage />
            </Box>
        </PentaToasterProvider>
    </ThemeProvider>;
};
