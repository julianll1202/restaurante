import { Carousel } from "@mantine/carousel"
import CategoriaBlock from "./CategoriaBlock"
import { useCallback, useEffect, useState } from "react"
import { PropTypes } from 'prop-types';

const CarruselCategorias = ({ categorias }) => {
    const [embla, setEmbla] = useState(null)
    const [catIndex, setCatIndex] = useState(1)
    const arrau = [1,2,3,4,5,6]
    const changeCatIndex = useCallback(() => {
        if (!embla) {
            return
        }
        setCatIndex(embla.selectedScrollSnap())
    }, [embla, setCatIndex])
    useEffect(() => {
        if (embla) {
            embla.on('scroll', changeCatIndex)
            changeCatIndex()
        }
    }, [embla])
    return (
        <Carousel mt={15} w={300} getEmblaApi={setEmbla} initialSlide={1} slideGap='xs' slideSize='45%' loop orientation='horizontal' >

                { categorias !== null ? categorias.map((cat, index) => {
                    return (
                        <Carousel.Slide key={index}>
                            <CategoriaBlock selected={catIndex === index} imgUrl={cat.imagen.url} nombre={cat.categoriaNombre} />
                        </Carousel.Slide>

                    )
                }) : null}

        </Carousel>
    )
}
CarruselCategorias.propTypes = {
    categorias: PropTypes.array,
}
export default CarruselCategorias