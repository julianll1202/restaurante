import { Container, Image, Text } from "@mantine/core"
import { STORED_IMAGES_URL } from "../utils/constants"
import { PropTypes } from 'prop-types';

const CategoriaBlock = ({selected=false, imgUrl, nombre}) => {
    // className={`glass-effect ${selected ?  'selected-cat' : null}`}
    return (
        <Container p='0px 10px' w={125} className={`${!selected ?  'glass-effect' : null}`}  style={{
            border: '2px solid #D9D9D9',
            borderRadius: '20px',
        }} >
            <Image w={100} src={`${STORED_IMAGES_URL}${imgUrl}`} />
            <Text fz={14} fw='bold' >{ nombre }</Text>
        </Container>
    )
}
CategoriaBlock.propTypes = {
    selected: PropTypes.bool,
    imgUrl: PropTypes.string,
    nombre: PropTypes.string
}
CategoriaBlock.defaultProps = {
    selected: false,
}
export default CategoriaBlock