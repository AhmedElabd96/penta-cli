
export interface ILayer {
	id: string;
	alias?: string;
	layerName?: string;
	ymin?: number;
	ymax?: number;
	xmin?: number;
	xmax?: number;
	useMultiband?: boolean;
	type?: string;
	bands?: unknown[];
	enableOfflineEdit?: boolean;
	basicSettings?: Record<string, unknown>;
	advancedSettings?: Record<string, unknown>;
	keyField?: Record<string, unknown>;
	attachmentUrl?: string;
	crs?: string;
	defaultStyle?: string;
	basicFields?: unknown[];
	version?: string;
	url?: string;
	datasourceType?: string;
	wfsLayerName?: string;
	geometryField?: Record<string, unknown>;
	approvalCondition?: string;
	displayField?: Record<string, unknown>;
	fields?: unknown[];
	enableAttachment?: boolean;
	geometryType?: string;
}


export interface IDataSettings {
	layers: ILayer[];
}

export interface IBehaviorSettings { }

export interface ISettings {
	behaviorSettings: IBehaviorSettings;
	dataSettings: IDataSettings;
}

export type TranslateFunction = (
	key: string,
	options?: Record<string, any> | string
) => string;

export interface IDefaultComponentProps {
	settings?: ISettings;
}
