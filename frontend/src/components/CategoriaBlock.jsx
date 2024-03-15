import { Container, Image, Text } from "@mantine/core"
import { STORED_IMAGES_URL } from "../utils/constants"
import { PropTypes } from 'prop-types';

const CategoriaBlock = ({selected=false}) => {
    // className={`glass-effect ${selected ?  'selected-cat' : null}`}
    return (
        <Container p='0px 10px' w={120} className={`${!selected ?  'glass-effect' : null}`}  style={{
            border: '2px solid #D9D9D9',
            borderRadius: '20px',
        }} >
            <Image w={100} src={`${STORED_IMAGES_URL}image-1710443431910.png`} />
            <Text fw='bold' >Sushi</Text>
        </Container>
    )
}
CategoriaBlock.propTypes = {
    selected: PropTypes.bool
}
CategoriaBlock.defaultProps = {
    selected: false,
}
export default CategoriaBlock