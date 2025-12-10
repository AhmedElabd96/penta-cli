import React from 'react';
import { connect } from 'react-redux';
import { withLocalize, componentRegistry, systemAddModal, systemHideMoreInfo, getLocale } from '@penta-b/ma-lib'
import { Form } from '@penta-b/mna-penta-smart-forms'
import { Flex, Link, PentaActionButton, PluginContainer, Text } from '@penta-b/chakra-ui';
import {LOCALIZATION_NAMESPACE} from "../../constants/constants"
import backIcon from "../../assets/back.svg?url"
import backrtl from "../../assets/backrtl.svg?url"
const NULL_PLACE_HOLDER = "--"


const parseJson = (value) => {
    try {
        return JSON.parse(value);
    } catch {
        return value
    }
}

const Buttons = [
    "ZoomToFeatureButton",
    "HighlightFeatureButton",
    "ReportingButton"
];

const URL_REGEX = /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/

const TextField = (props) => {
    const { id, alias, value } = props;

    let finalValue = value?.toString?.();
    if (finalValue?.match(URL_REGEX)) {
        finalValue = <Link key={finalValue} href={finalValue} target="_blank">{finalValue}</Link>;
    }

    return (
        <Flex key={id} gap={3} w={"full"}>
            <Text fontWeight="bold">{alias}:</Text>
            <Text truncate flex={1} title={finalValue ||""}>{finalValue || NULL_PLACE_HOLDER}</Text>
        </Flex>
    )
}

const ImageField = connect(null, dispatch => ({
    showImageModal: (url) => dispatch(systemAddModal(ImageViewComponent, { url }))
}))((props) => {
    const { id, alias, value, showImageModal } = props;

    return (
        <div key={id} className="penta-item">
            <span>{alias}</span>
            <div className="penta-gallery">
                {
                    value?.split?.(",").map((url, i) =>
                        <img key={i} src={url} onClick={showImageModal.bind(this, url)} />
                    )
                }
            </div>
        </div>
    )
})

const ImageViewComponent = ({ url }) => <img src={url} />

const FormField = (props) => {
    const { key, alias, schema, data } = props
    return (
        <div key={key} className="penta-item">
            <span>{alias}</span>
            <Form schema={schema || {}}
                data={data || {}}
                actions={{}}
                readonly={true} />
        </div>
    )
}

const MoreInfo = (props) => {
    const { isrtl } = getLocale()
    const { id, layerName, alias, idField, fields, geometry, t } = props;
    return (
        <>
            <PluginContainer.Header justifyContent="start" gap="2" alignItems="center">
                <PentaActionButton
                    justifyContent="center"
                    title={t('ma-lib-layout:back')}
                    icon={isrtl? backrtl : backIcon}
                    onClick={props.hideMoreInfo} />
                    <Text>{alias}</Text>
                {/* <Back /> */}
            </PluginContainer.Header>
            <PluginContainer.Body gap={4}>
                {
                    fields && fields
                        .filter(field => field.displayType !== "Hidden")
                        .map(field => {
                            if (field.isFormField) {
                                let formValue = field.value && parseJson(field.value)
                                return <FormField key={field.id} alias={field.alias} data={formValue && formValue.data} schema={formValue && formValue.schema} />
                            }
                            else if (field.displayType === "ImageURL") {
                                return <ImageField key={field.id} alias={field.alias} value={field.value} />
                            }
                            return <TextField key={field.id} alias={field.alias} value={field.value} />
                        })
                }
            </PluginContainer.Body>

            <PluginContainer.Footer>
                <ul className="penta-toolbar">
                    {
                        Buttons.map(button => {
                            const ButtonComponent = componentRegistry.getComponent(button);

                            return (
                                <ButtonComponent
                                    recordsData={{
                                        id,
                                        layerName,
                                        alias,
                                        idField,
                                        fields,
                                        geometry
                                    }}
                                    key={button} />
                            );
                        })
                    }
                </ul>
            </PluginContainer.Footer>
        </>

    );

}

const mapDispatchToProps = dispatch => ({
    hideMoreInfo: () => dispatch(systemHideMoreInfo())
})

export default connect(null, mapDispatchToProps)(withLocalize(MoreInfo, LOCALIZATION_NAMESPACE));