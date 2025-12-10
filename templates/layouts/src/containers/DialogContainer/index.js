import { Fragment, useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { actionsRegistry, selectModals, selectorsRegistry, withLocalize } from '@penta-b/ma-lib';

import { Box, CloseButton, Dialog, Heading, Portal, IconWrapper, PluginContainer } from "@penta-b/chakra-ui"


const DialogContainer = ({ components, modals, clearPanel, t }) => {
    const [isOpen, setIsOpen] = useState(false);
    const items = useMemo(() => {
        const normalize = (item, isModal) => {
            const Component = item?.Component;
            const props = item?.props || {};

            const onRemove = (id) => {
                if (typeof item?.onRemove === "function") {
                    item.onRemove();
                };
            }

            const title = props?.title || (Component && Component.Title) || "";
            const icon = props?.icon || (Component && Component.Icon) || "";
            const key = item?.id || props?._uid || props?.id || `${Component?.name || "component"}-${Math.random()}`;
            return { key, Component, props, title, icon, onRemove, id: item?.id };
        };
        const a = Array.isArray(components) ? components.map((i) => normalize(i, false)) : [];
        const b = Array.isArray(modals) ? modals.map((ii) => normalize(ii, true)) : [];
        return [...a, ...b];
    }, [components, modals]);


    const evaluateOpenState = (isOpen) => {
        setIsOpen(isOpen);
        if (!isOpen) {
            clearPanel()
        }
    }
    useEffect(() => {
        if (items.length > 0 && !isOpen) {
            setIsOpen(true);
        }
    }, [items])


    if (items.length === 0) return [];
    if (!isOpen) return [];

    return <PluginContainer.Root variant="dialogs" wrap="wrap" gap="4" height={"fit-content"}>
        <Dialog.Root
            closeOnInteractOutside={true}
            key={"center"}
            scrollBehavior="inside"
            open={isOpen}
            onOpenChange={(e) => {
                evaluateOpenState(e.open);
            }}
            lazyMount
            placement={"center"}
            motionPreset="slide-in-bottom"
        >
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content borderRadius={"xl"}>
                        {items.map(({ key, Component, props, title, icon, onRemove, id }) => {
                            let localizedTitle = title ? t(title) : "";
                            let resolvedIcon = icon ? icon : "";
                            return (
                                <Fragment key={key}>
                                    <Dialog.Header>
                                        <Dialog.Title display={"flex"} gap={"2.5"} justifyContent={"flex-start"}
                                            alignItems={"center"}>
                                            <IconWrapper src={resolvedIcon} />
                                            <Heading>{localizedTitle}</Heading>
                                        </Dialog.Title>
                                    </Dialog.Header>
                                    <Dialog.Body p={6} gap={6} display={"flex"} flexDir="column" alignItems="flex-start">
                                        <Component {...props} />
                                    </Dialog.Body>

                                    <Dialog.CloseTrigger asChild>
                                        <CloseButton size="sm" onClick={() => {
                                            onRemove?.(id);
                                        }} />
                                    </Dialog.CloseTrigger>
                                </Fragment>
                            )
                        })}
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    </PluginContainer.Root>

}
const mapStateToProps = (state) => {
    return {
        components: selectorsRegistry.getSelector('selectPanelComponents', state, "dialog-container"),
        modals: selectModals(state),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearPanel: () => dispatch(actionsRegistry.getActionCreator('clearPanel', "dialog-container"))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withLocalize(DialogContainer));