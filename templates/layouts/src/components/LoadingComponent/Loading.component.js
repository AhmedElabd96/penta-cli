import { connect } from 'react-redux';
import { isShowLoading } from '@penta-b/ma-lib';
import { Box } from '@penta-b/chakra-ui';

export const SystemLoadingComponent = () => {
    return (
        <Box
            className='penta-contant-load'
            w="full"
            h={"full"}
            position={"absolute"}
            inset={0}
            zIndex={3}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Box className="penta-loader"></Box>
        </Box>
    )
}

const LoadingComponent = ({showLoading}) => {
    return showLoading ? <SystemLoadingComponent /> : <></>;
}

const mapStateToProps = (state) => ({
    showLoading: isShowLoading(state)
});

export default connect(mapStateToProps)(LoadingComponent);