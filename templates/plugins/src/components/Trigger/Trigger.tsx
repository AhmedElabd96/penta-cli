import { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { selectorsRegistry, actionsRegistry, withLocalize } from '@penta-b/ma-lib';
import { LOCALIZATION_NAMESPACE } from '@/constants';
import { TriggerComponentProps } from './Trigger.types';



/**
 * Trigger component - Handles plugin activation and deactivation
 */
const Trigger = (props: TriggerComponentProps) => {
	const componentIdRef = useRef<string>('');
	

	// handle show result component when plugin trigger is activated.
	useEffect(() => {
		if (props.isActive) {
			// Clean up any existing result
			if (componentIdRef.current) {
				props.removeMapClickResult(componentIdRef.current);
			}

			// Show new map click result
			props.showMapClickResult(
				{
					coordinates: props.singleClick?.coordinate,
				},
				(id: string) => {
					componentIdRef.current = id;
				},
			);
		} else {
			// Clean up when deactivated
			if (componentIdRef.current) {
				props.removeMapClickResult(componentIdRef.current);
				componentIdRef.current = '';
			}
			props.deactivate?.();
		}
	}, [props.isActive]);


	// handle update the result component props when coordinates changed.
	useEffect(() =>{
		if(componentIdRef.current){
			props.updateComponent(componentIdRef.current , {coordinates: props.singleClick?.coordinate,})
		}
	},[props.singleClick])

	// Log settings for debugging
	useEffect(() => {
		console.log('Plugin settings:', props.settings);
	}, [props.settings]);

	return null;
};


// Redux state mapping
const mapStateToProps = (state: any, ownProps: any) => {
	return {
		singleClick: selectorsRegistry.getSelector(
			'selectMapSingleClick',
			state,
			ownProps.reducerId,
		),
	};
};

// Redux dispatch mapping
const mapDispatchToProps = (dispatch: any) => {
	return {
		updateComponent: (id : any, props:Record<any,any>) => dispatch(actionsRegistry.getActionCreator('updateComponent', id , props)),
		showMapClickResult: (props: any, onAdd: (id: string) => void) =>
			dispatch(
				actionsRegistry.getActionCreator(
					'showComponent',
					'test-plugin',
					'TriggerResult',
					props,
					onAdd,
				),
			),
		removeMapClickResult: (id: string) =>
			dispatch(actionsRegistry.getActionCreator('removeComponent', id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withLocalize(Trigger, LOCALIZATION_NAMESPACE));
