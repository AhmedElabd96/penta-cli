import Trigger from '@/components/Trigger';
import TriggerResult from '@/components/TriggerResult';
import defaultLocalization from '@/localization/messages';
import { LOCALIZATION_NAMESPACE } from '@/constants/plugin-constants';


(Trigger as any).Title = `${LOCALIZATION_NAMESPACE}:title`;
(Trigger as any).Icon = `${LOCALIZATION_NAMESPACE}:icon`;

const components = {
	Trigger,
	TriggerResult,
};

const localization = {
	namespace: LOCALIZATION_NAMESPACE,
	defaultLocalization,
};

export { components, localization };
