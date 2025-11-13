export interface Settings {
	behaviorSettings: Record<string,any>;
	dataSettings: Record<string,any>;
}
export interface DefaultComponentProps {
	settings?: Settings;
	t:(k:string)=> any;
}

