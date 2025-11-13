// Asset declarations
declare module '*.svg' {
	const content: any;
	export default content;
}

declare module '*.png' {
	const content: any;
	export default content;
}

declare module '*.jpg' {
	const content: any;
	export default content;
}

declare module '*.jpeg' {
	const content: any;
	export default content;
}

declare module '*.gif' {
	const content: any;
	export default content;
}

// @penta-b/ma-lib type declarations
declare module '@penta-b/ma-lib' {
	import { ComponentType } from 'react';

	// Selectors Registry
	export const selectorsRegistry: {
		getSelector: (selectorName: string, state: any, reducerId?: string) => any;
	};

	// Actions Registry
	export const actionsRegistry: {
		getActionCreator: (actionType: string, ...args: any[]) => any;
	};

	// Localization HOC
	export function withLocalize<P = {}>(
		Component: ComponentType<P>,
		namespace: string
	): ComponentType<Omit<P, 't'>>;

	// Add other exports from @penta-b/ma-lib as needed
	export const configureStore: any;
	export const createReducer: any;
	export const createAction: any;
}

// @penta-b/chakra-ui type declarations
declare module '@penta-b/chakra-ui' {
	export * from '@chakra-ui/react';
}
