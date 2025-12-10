import { connect } from 'react-redux';
import { selectorsRegistry, withLocalize, actionsRegistry } from '@penta-b/ma-lib';
import { Box, Popover, IconWrapper, Separator, useDirection } from "@penta-b/chakra-ui";
import useIsMobile from '../../hooks/use-mobile';
import React, { useContext, useMemo, useRef, useState } from 'react';
import PluginsContentContainer from "../PluginsContentContainer";
import { ContainersContext } from '../../context/containerContext';
import { MAX_TRIGGER_COMP } from '../../constants/constants';
import { useEffect } from 'react';

// UI Components...
const Wrapper = ({ isRTL, ...props }) => (
    <Box
        position="absolute"
        bottom={"auto"}
        height={"0"}
        top={"3"}
        left={isRTL ? "auto" : "3"}
        right={isRTL ? "4" : "auto"}
        gap="4"
        display="flex"
        alignItems="start"
        {...props}
    />
)

const Toolbar = (props) => {
    return (
        <Box
            display="flex"
            alignItems="center"
            transition="all 0.5s ease-in-out"
            transformOrigin="center"
            backdropFilter="blur(8px)"
            bg={"bg"}
            boxShadow="0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)"
            borderRadius={'xl'}
            flexDirection={'column'}
            gap="0.5rem"
            py={'0.5rem'}
            px={'0.4rem'}
            transform={'scale(1)'}
            opacity={1}
            pointerEvents={'auto'}
            {...props}
        />
    )
};

const ToolbarButton = (props) => <Box
    cursor="pointer"
    border="none"
    borderRadius="full"
    transition="all 0.3s"

    display="flex"
    position={"relative"}
    alignItems="center"
    justifyContent="center"
    p="1"
    _hover={{
        bg: { _light: "primary.50", _dark: "gray.600" },
        color: 'primary.800',
    }}

    {...props}
/>


// Start container...
const PluginsTriggersContainer = ({ triggers, triggersMenu, t }) => {
    const isMobile = useIsMobile();
    const isRTL = useDirection();
    const [isOpen, setIsOpen] = useState(false);
    const { deactivateTrigger, activeTriggerId, setActiveTriggerId } = useContext(ContainersContext);
    const triggerRefs = useRef({});

    const onTrigger = (id) => {
        if (activeTriggerId === id) {
            deactivateTrigger();
            setIsOpen(false);
            return;
        }
        // deactivateTrigger();
        setActiveTriggerId(id);
        setIsOpen(true);
    };


    // Memoize only the triggers array processing, not the entire component
    const processedTriggers = useMemo(() => {
        if (!triggers || triggers.length === 0) {
            return [];
        }
        return triggers;
    }, [triggers, activeTriggerId]);

    const listTriggersMenu = useMemo(() => {
        if (!triggersMenu || triggersMenu.length === 0) {
            return [];
        }
        return triggersMenu;
    }, [triggersMenu]);

    // Early return if no triggers
    if (processedTriggers.length === 0) {
        return null;
    }

    return <Wrapper isRTL={isRTL}>
        <Toolbar>
            {processedTriggers.map((tool, _idx) => {
                let isActive = activeTriggerId === tool.id;
                let RenderComponent = tool.Component;
                return (
                    <Box key={tool.pluginId}>
                        <Popover.Root
                            closeOnEscape
                            closeOnInteractOutside
                            open={isOpen && isActive}
                            positioning={{
                                placement: isMobile ? "top-center" : isRTL ? 'right-center' : 'left-center',

                            }}
                            onOpenChange={(e) => {
                                setIsOpen(e.open)
                            }}
                        >
                            <Box id={tool.pluginId + "-" + tool.panelId} style={isMobile ? { display: "flex" } : {}}
                                ref={(el) => (triggerRefs.current[tool.id] = el)}>
                                <Popover.Trigger asChild>
                                    <ToolbarButton
                                        onClick={() => onTrigger(tool.id)}
                                        title={t(RenderComponent.Title)}
                                        bg={isActive ? "{colors.primary.50}" : "unset"}
                                        color={isActive ? "{colors.primary.600}" : ""}
                                    >
                                        {RenderComponent.Icon && <IconWrapper src={t(RenderComponent.Icon)} />}
                                        <RenderComponent {...tool.props} isActive={isActive}
                                            deactivate={() => { }} />
                                    </ToolbarButton>
                                </Popover.Trigger>

                                {_idx < triggers?.length - 1 && (
                                    <Separator orientation={isMobile ? "vertical" : "horizontal"} />
                                )}

                                {isActive && listTriggersMenu.length > 0 &&
                                    <Popover.Positioner>
                                        <Popover.Content width={"fit-content"} >
                                            <Popover.Arrow />
                                            <Popover.Body p={1}>
                                                {listTriggersMenu.map(({ id, Component, props }) => {
                                                    return <Component {...props} key={id} />
                                                })}
                                            </Popover.Body>
                                        </Popover.Content>
                                    </Popover.Positioner>

                                }
                            </Box>
                        </Popover.Root>
                    </Box>
                );
            })}


        </Toolbar>
        <PluginsContentContainer />

    </Wrapper>

}

const mapStateToProps = (state) => {
    return {
        triggers: selectorsRegistry.getSelector('selectPanelComponents', state, "plugins-trigger-container"),
        triggersMenu: selectorsRegistry.getSelector('selectPanelComponents', state, "plugins-trigger-menu-container"),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

        clearPanel: () => dispatch(actionsRegistry.getActionCreator('clearPanel', "plugins-sidebar-container"))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withLocalize(PluginsTriggersContainer));