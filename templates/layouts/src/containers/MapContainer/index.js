
import { connect } from 'react-redux';
import { selectorsRegistry } from '@penta-b/ma-lib';
import {Box} from "@penta-b/chakra-ui";


const MapContainer = ({mapComponents}) =>{
    return <Box
        display="flex"
        width="100%"
        height="100%"
    >
        {mapComponents?.map((mapComponent) => {
            const { Component, props, id } = mapComponent;
            return <Component {...props} key={id} />
        })}
    </Box>
}

const mapStateToProps = (state) => {
    return {
        mapComponents: selectorsRegistry.getSelector('selectPanelComponents', state, "map-container")
    }
};

export default connect(mapStateToProps)(MapContainer);