import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { selectPrompts, systemRemovePrompt, withLocalize, store } from '@penta-b/ma-lib';

import { Button, CloseButton, Dialog, HStack, Portal, Box, useDirection } from "@penta-b/chakra-ui"

const PromptsContainer = ({ prompts, removePrompt, t }) => {
    const isRTL = useDirection();
    const [isOpen, setIsOpen] = React.useState(false);

    useEffect(() => {
        if ((prompts?.length > 0) && !isOpen) {
            setIsOpen(true);
        }
    }, [prompts])



    return useMemo(() => {
        if (!prompts || prompts.length === 0) return [];
        return <HStack wrap="wrap" gap="4" height={"fit-content"}>
            <Dialog.Root
                key={"center"}
                open={isOpen}
                dir={isRTL ? "rtl" : "ltr"}
                onOpenChange={(e) => {
                    setIsOpen(e.open);
                }}
                lazyMount
                placement={"center"}
                motionPreset="slide-in-bottom"
            >
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Box>
                                {prompts.map((prompt, index) => {
                                    const {
                                        headerText,
                                        bodyText,
                                        onPositive,
                                        onNegative,
                                        onCancel,
                                        positiveText,
                                        negativeText
                                    } = prompt;
                                    return <React.Fragment key={index}>
                                        <Dialog.Header>
                                            <Dialog.Title>{headerText}</Dialog.Title>
                                        </Dialog.Header>
                                        <Dialog.Body>
                                            {bodyText}
                                        </Dialog.Body>
                                        <Dialog.Footer>
                                            <Dialog.ActionTrigger asChild>
                                                <Button variant="outline" onClick={() => {
                                                    removePrompt(prompt);
                                                    setIsOpen(false)
                                                    onNegative();
                                                }}>{negativeText}</Button>
                                            </Dialog.ActionTrigger>
                                            <Button variant={"solid"} onClick={() => {
                                                removePrompt(prompt);
                                                setIsOpen(false)
                                                onPositive();
                                            }}>{positiveText}</Button>
                                        </Dialog.Footer>
                                        <Dialog.CloseTrigger asChild>
                                            <CloseButton size="sm" onClick={() => store.dispatch(systemRemovePrompt(prompt))} />
                                        </Dialog.CloseTrigger>
                                    </React.Fragment>
                                })}

                            </Box>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </HStack>
    }, [prompts, isOpen]);
}

const mapStateToProps = (state) => {
    return {
        prompts: selectPrompts(state),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        removePrompt: (prompt) => dispatch(systemRemovePrompt(prompt))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withLocalize(PromptsContainer));