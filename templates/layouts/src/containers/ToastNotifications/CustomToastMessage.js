import {
    Flex,
    ToastIconIndicator,
    Toaster as ChakraToaster,
    Portal,
    Spinner,
    Toast,
    useToaster,
} from "@penta-b/chakra-ui";
import { useMemo } from "react";

const ToastBarIndicator = ({ type }) => {
    let color = useMemo(() => {
        switch(type){
            case "info":
                return "unset";
            case "error":
                return "red";
            case "warning":
                return "orange";
            case "success":
                return "green";
        }
    }, [type]);
    
    return <Flex bg={color} h={"full"} position={"inherit"} borderRadius={"sm"}  direction={"column"} width={"2.5"} />;
}

const CustomToastMessage = () => {
    let props = {
        toaster: useToaster()
    }
    return (
        <Portal>
            <ChakraToaster {...props}>
                {(toast) => {
                    return <>
                        <Toast.Root width={{ md: 'sm' }} bg={"bg"} color={"fg"} borderRadius={"sm"} shadow={"sm"} display={"flex"} flexDir={"row"} height={"auto"} p={"unset"} gap={"0"}>
                            <ToastBarIndicator type={toast.type}/>
                            <Flex display={"flex"} flexDirection={"row"} flex="1" p={"4"} gap={"2"}>
                                <Flex >
                                    {toast.type === 'loading' ? (
                                        <Spinner size='sm' color='primary.solid' />
                                    ) : (
                                        <ToastIconIndicator type={toast.type} />
                                    )}
                                </Flex>
                                <Flex direction={"column"} flex="1">
                                    {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
                                    {toast.description && <Toast.Description>{toast.description}</Toast.Description>}
                                </Flex>
                                <Flex>
                                    {toast.action && (
                                        <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
                                    )}
                                    <Toast.CloseTrigger />
                                </Flex>
                            </Flex>
                        </Toast.Root>
                    </>

                }}
            </ChakraToaster>
        </Portal>
    )
}

export default CustomToastMessage;