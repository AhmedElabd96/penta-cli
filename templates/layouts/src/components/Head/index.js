
import { Text, CloseButton, Flex, IconWrapper } from "@penta-b/chakra-ui";
import maximizedIcon from "../../assets/maximize.svg"
import minimizedIcon from "../../assets/minimize.svg"

export default ({
    icon, IconComponent, title, onClose, isMaximized, toggleMaximized
}) => {
    const viewIcon = isMaximized ? maximizedIcon : minimizedIcon;
    return (
        <Flex
            h={"10"}
            alignItems="center"
            gap="3"
            color={"primary.fg"}
        >
            
            {icon && <IconWrapper src={icon} />}
            {IconComponent && <IconComponent />}
            <Text flex={1} fontWeight={"semibold"}>{title}</Text>
            {toggleMaximized && <IconWrapper src={viewIcon} onClick={toggleMaximized}/>}
            <CloseButton onClick={onClose} />
        </Flex>
    )
}
