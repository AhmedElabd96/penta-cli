
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { Provider } from 'react-redux';
import {
    actionsRegistry,
    apiRegistry,
    systemRemovePopup,
    store,
    selectorsRegistry
} from '@penta-b/ma-lib';
import Head from '../Head';
import {
    PluginContainer
} from "@penta-b/chakra-ui";
import ThemeProvider from "../../theming";



const OverlayComponent = ({ component, onClose }) => {
    const { Component, props } = component;
    const { icon, title } = props || {};

    return (
        <PluginContainer.Root variant='mapOverlay'>
            <Head icon={icon} title={title} onClose={onClose} />
            <Component {...props} />
        </PluginContainer.Root>
    )
}

class OverlayManager {
    constructor() {
        this.registry = {};
        this.unsubscribe = null;
    }

    start() {
        this.unsubscribe = selectorsRegistry.subscribe(
            'selectPopups',
            (popups, prev) => this.handlePopups(popups, prev)
        );
    }

    stop() {
        if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
        }
        
        Object.values(this.registry).forEach(({ component }) =>
            this.remove(component)
        );
    }

    async add(component) {
        const { id, location = [0, 0] } = component;
        if (!id) return;

        try {
            const [Overlay] = await apiRegistry.getApis(['Overlay']);

            const popupDiv = document.createElement('div');
            const root = createRoot(popupDiv);

            const handleClose = () => {
                flushSync(() => {
                    this.remove(component);
                    store.dispatch(systemRemovePopup(id));
                });
                root.unmount();
                popupDiv.remove();
            };

            root.render(
                <Provider store={store}>
                    <ThemeProvider>
                        <OverlayComponent component={component} onClose={handleClose} />
                    </ThemeProvider>
                </Provider>
            );

            const overlay = new Overlay({
                className: 'overlay-container',
                element: popupDiv,
                position: location,
                positioning: 'bottom-center',
                offset: [0, -10],
                autoPan: true
            });

            actionsRegistry.dispatch('addOverlay', overlay);
            overlay.setPosition(location);

            this.registry[id] = { overlay, root, element: popupDiv, component };
        } catch (err) {
            console.error('Failed to add overlay:', err);
        }
    }

    update(component) {
        const { id, location } = component;
        const record = this.registry[id];
        if (!record?.overlay || !location) return;
        record.overlay.setPosition(location);
    }

    remove(component) {
        const { id } = component;
        const record = this.registry[id];
        if (!record) return;

        actionsRegistry.dispatch('removeOverlay', record.overlay);
        record.root?.unmount();
        record.element?.remove();
        delete this.registry[id];
    }

    handlePopups(next, prev) {
        const prevIds = new Set(prev.map(p => p.id));
        const nextIds = new Set(next.map(p => p.id));

        const added = next.filter(p => !prevIds.has(p.id));
        const removed = prev.filter(p => !nextIds.has(p.id));
        const updated = next.filter(p => prevIds.has(p.id));

        added.forEach(p => this.add(p));
        removed.forEach(p => this.remove(p));
        updated.forEach(p => this.update(p));
    }
}

export const overlayManager = new OverlayManager();
