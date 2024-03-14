import { Container, Image, Text } from "@mantine/core"
import { STORED_IMAGES_URL } from "../utils/constants"

const CategoriaBlock = () => {
    return (
        <Container p='0px 10px' w={120} style={{
            border: '2px solid #D9D9D9',
            borderRadius: '20px',
            // background: 'rgba(0,0,0,0.8)',
            // backdropFilter: 'saturate("180%") blur("10px")',
        }}>
            <Image w={100} src={`${STORED_IMAGES_URL}image-1710443431910.png`} />
            <Text fw='bold'>Sushi</Text>
        </Container>
    )
}

export default CategoriaBlock