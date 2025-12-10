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
declare module "@penta-b/ma-lib" {
	import type { ComponentType } from "react";

	// Selectors Registry
	export const selectorsRegistry: {
		getSelector: (selectorName: string, state: any, ...args: any[]) => any;
	};

	// Actions Registry
	export const actionsRegistry: {
		getActionCreator: (actionType: string, ...args: any[]) => any;
	};

	// Redux Store
	export const store: {
		getState: () => any;
		dispatch: (action: any) => any;
	};

	// Localization HOC
	export function withLocalize<P = {}>(
		Component: ComponentType<P>,
		namespace: string
	): ComponentType<Omit<P, "t">>;

	// Add other exports from @penta-b/ma-lib as needed
	export const configureStore: any;
	export const createReducer: any;
	export const createAction: any;

	// Locale type
	export interface Locale {
		name: string;
		alias: string;
		isrtl: boolean;
		icon: string;
	}

	// User info and locale functions
	export function getLocale(): Locale | undefined;

	// Localization functions
	export function getFixedT(
		lng: string | null,
		ns: string
	): (key: string) => string;

	// Minimal HTTP client used by query-feature gateway
	export const request: {
		post: (url: string, body?: unknown) => Promise<any>;
		get?: (url: string) => Promise<any>;
	};

	export class StompSocketClass {
		constructor(endpoint: string);
		subscribe(
			topic: string,
			callback: (frame: { body?: string }) => void
		): void;
		unsubscribe(
			topic: string,
			callback: (frame: { body?: string }) => void
		): void;
	}

	// System notifications
	export function systemAddNotification(
		message: string,
		type: "success" | "error" | "warning" | "info"
	): any;
}


