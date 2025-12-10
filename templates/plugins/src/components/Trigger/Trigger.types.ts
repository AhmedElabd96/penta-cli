import { IDefaultComponentProps } from "@/types";


export interface TriggerComponentProps
	extends IDefaultComponentProps {
	singleClick: {
		coordinate: [number, number];
	};
	isActive: boolean;
	deactivate: () => void;
	updateComponent: (id: any, props: Record<any, any>) => void;
	removeMapClickResult: (id: string) => void;
	showMapClickResult: (props: Record<string, any>, onAdd: (id: string) => void) => void;
}