import { connect } from "react-redux";
import { withLocalize, systemClearNotifications , selectorsRegistry } from "@penta-b/ma-lib"
import { useToaster } from "@penta-b/chakra-ui";
import { useEffect } from "react";


const ToastNotifications = ({clearNotifications}) => {
    const toaster = useToaster();
    
    useEffect(() =>{
        let unsubscribe = selectorsRegistry.subscribe("selectNotifications" , (current , prev) =>{
            let newNotifications = current.filter(n => !prev.some(o => o.msg === n.msg && o.type === n.type));

            newNotifications.forEach(notification => {
                if (notification.status !== "unmounted") {
                    queueMicrotask(() => {
                        toaster.create({
                            title: notification.title,
                            description: notification.msg,
                            type: notification.type
                        })
                    })
        
                }
        
            })
        })
        return () =>{
            selectorsRegistry.unsubscribe(unsubscribe);
            clearNotifications();
        }
    },[])
    return null;
}

const mapDispatchToProps = (dispatch) => ({
    clearNotifications: () => dispatch(systemClearNotifications())
});

export default connect(null, mapDispatchToProps)(withLocalize(ToastNotifications))