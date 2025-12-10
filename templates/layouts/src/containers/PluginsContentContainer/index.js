import { useCallback, useState, useContext, useEffect } from "react";
import { connect } from 'react-redux';
import { selectorsRegistry, componentRegistry, store, systemHideMoreInfo, actionsRegistry, withLocalize } from '@penta-b/ma-lib';
import { Box, PActionButton, PluginContainer, useDirection } from "@penta-b/chakra-ui";
import React, { useMemo } from 'react';
import Head from "../../components/Head";
import { ContainersContext } from "../../context/containerContext"


const MoreInfo = componentRegistry.getComponent("MoreInfo");

const ResizeHandle = ({ isRTL, ...props }) => {
    return (
        <Box
            position="absolute"
            left={isRTL ? 0 : 'auto'}
            right={isRTL ? 'auto' : 0}
            top={0}
            bottom={0}
            width="1"
            bg="rgba(0, 0, 0, 0.1)"
            cursor="ew-resize"
            transition="background 0.2s"
            _hover={{
                bg: "rgba(0, 0, 0, 0.3)"
            }}
            _after={{
                content: "''",
                position: "absolute",
                right: "-0.5",
                top: "50%",
                transform: "translateY(-50%)",
                width: "2",
                height: "5",
                bg: "rgba(0, 0, 0, 0.2)",
                borderRadius: "1"
            }}
            {...props}
        />
    );
};

const MIN_CONTAINER_WIDTH = 480;
const MAX_CONTAINER_WIDTH = 800;

const PluginsContentContainer = ({ pluginsComponents = [], moreInfoProps, removeComponent, t, clearPanel }) => {
    const [containerWidth, setContainerWidth] = useState(MIN_CONTAINER_WIDTH); // Default width
    const [openContainerInfo, setOpenContainerInfo] = useState({ title: "", icon: "", renderComponentId: "" });
    const [isFullView, setFullView] = useState(false);
    const [isMinimized, setMinimized] = useState(false);
    const { deactivateTrigger } = useContext(ContainersContext);

    const handleResize = useCallback((newWidth) => {
        setContainerWidth(newWidth);
    }, []);

    const isRTL = useDirection();
    const [isResizing, setIsResizing] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startWidth, setStartWidth] = useState(0);

    const handleMouseDown = useCallback((e) => {
        setIsResizing(true);
        setStartX(e.clientX);
        setStartWidth(containerWidth);

        // Prevent text selection during resize
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'ew-resize';
    }, [containerWidth]);

    const handleMouseMove = useCallback((e) => {
        if (!isResizing) return;

        const deltaX = isRTL ? startX - e.clientX : e.clientX - startX;
        const newWidth = Math.max(MIN_CONTAINER_WIDTH, Math.min(MAX_CONTAINER_WIDTH, startWidth + deltaX));
        handleResize(newWidth);
    }, [isResizing, startX, startWidth, handleResize]);

    const handleMouseUp = useCallback(() => {
        setIsResizing(false);
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
    }, []);

    useEffect(() => {
        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);

            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isResizing, handleMouseMove, handleMouseUp]);


    useEffect(() => {
        let newInfo = null;

        if (moreInfoProps) {
            newInfo = {
                title: t("ma-lib:more_info_title"),
                icon: t("ma-lib:moreinfo_icon"),
                renderComponentId: moreInfoProps.id
            };
        } else if (pluginsComponents?.length) {
            const componentToRender = pluginsComponents[pluginsComponents.length - 1];
            newInfo = {
                icon: componentToRender.Icon || componentToRender.props.icon,
                title: componentToRender.Title || componentToRender.props.title,
                renderComponentId: componentToRender.id
            };
        }

        // Update only if it actually changed because one of dependecies is not stable refernce..
        if (
            newInfo &&
            (newInfo.icon !== openContainerInfo.icon ||
                newInfo.title !== openContainerInfo.title ||
                newInfo.renderComponentId !== openContainerInfo.renderComponentId)
        ) {
            setOpenContainerInfo(newInfo);
        }
    }, [pluginsComponents, moreInfoProps, t]);


    const toggleLargeView = () => {
        if (isFullView) {
            setContainerWidth(MIN_CONTAINER_WIDTH);
            setFullView(false);
        } else {
            setContainerWidth(MAX_CONTAINER_WIDTH);
            setFullView(true);
        }
    }
    const renderedComponents = useMemo(() => {
        if (!pluginsComponents?.length) {
            return moreInfoProps ? <MoreInfo {...moreInfoProps} /> : null;
        }

        const componentToRender = pluginsComponents[pluginsComponents.length - 1];
        return (
            <>
                {moreInfoProps ? <MoreInfo {...moreInfoProps} /> : <componentToRender.Component {...componentToRender.props} key={componentToRender.id} toggleLargeView={toggleLargeView} />}
            </>
        );
    }, [pluginsComponents, moreInfoProps]);

    if ((!pluginsComponents || pluginsComponents.length === 0) && !moreInfoProps) {
        return <></>;
    }

    return <PluginContainer.Root
        variant="sidePanel"
        width={containerWidth}
        minimized={isMinimized}
    >
        <PActionButton.Wrapper>
            <Head
                icon={openContainerInfo.icon}
                title={openContainerInfo.title}
                onClose={() => {
                    removeComponent(openContainerInfo.renderComponentId);
                    moreInfoProps && store.dispatch(systemHideMoreInfo());
                    clearPanel();
                    deactivateTrigger();
                }}
                isMaximized={isMinimized}
                toggleMaximized={() => setMinimized(prev => !prev)}
            />
            {renderedComponents}
            <ResizeHandle
                isRTL={isRTL}
                onMouseDown={handleMouseDown}
                style={{ display: isResizing ? 'block' : 'block' }}
            />
        </PActionButton.Wrapper>
    </PluginContainer.Root>
}

const mapStateToProps = (state) => {
    return {
        pluginsComponents: selectorsRegistry.getSelector('selectPanelComponents', state, "plugins-sidebar-container"),
        moreInfoProps: state.systemReducer.moreInfo,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeComponent: (id) => dispatch(actionsRegistry.getActionCreator('removeComponent', id)),
        clearPanel: () => dispatch(actionsRegistry.getActionCreator('clearPanel', "plugins-sidebar-container"))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withLocalize(PluginsContentContainer));