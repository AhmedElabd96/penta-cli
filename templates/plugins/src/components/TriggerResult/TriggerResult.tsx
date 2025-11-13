/**
 * TriggerResult component - Displays the result of the plugin trigger action
 */

import { withLocalize } from '@penta-b/ma-lib';
import { LOCALIZATION_NAMESPACE } from '@/constants/plugin-constants';
import { TriggerResultProps } from './TriggerResult.types';


/**
 * TriggerResult - Functional component that displays coordinates and localized text
 */
const TriggerResult = ({ coordinates, t }: TriggerResultProps) => {
	return (
		<>
			<div className="penta-h2">
				Coords are: [{coordinates?.[0]}, {coordinates?.[1]}]
			</div>
			<div className="penta-h2">Localization: {t('local')}</div>
		</>
	);
};

export default withLocalize(TriggerResult, LOCALIZATION_NAMESPACE);
