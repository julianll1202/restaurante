import { Carousel } from "@mantine/carousel"
import CategoriaBlock from "./CategoriaBlock"
import { useCallback, useEffect, useState } from "react"
import { PropTypes } from 'prop-types';

const CarruselCategorias = ({ categorias, setCatIndex }) => {
    const [embla, setEmbla] = useState(null)
    const [categoryI, setCategoryI] = useState(1)
    const changeCatIndex = useCallback(() => {
        if (!embla) {
            return
        }
        setCatIndex(embla.selectedScrollSnap())
        setCategoryI(embla.selectedScrollSnap())
    }, [embla, setCatIndex])
    useEffect(() => {
        if (embla) {
            embla.on('select', changeCatIndex)
            changeCatIndex()
        }
    }, [embla])
    return (
        <Carousel mt={15} w={300} getEmblaApi={setEmbla} initialSlide={1} slideGap='xs' slideSize='45%' loop orientation='horizontal' >

                { categorias !== null ? categorias.map((cat, index) => {
                    return (
                        <Carousel.Slide key={index}>
                            <CategoriaBlock selected={categoryI === index} imgUrl={cat.imagen.url} nombre={cat.categoriaNombre} />
                        </Carousel.Slide>

                    )
                }) : null}

        </Carousel>
    )
}
CarruselCategorias.propTypes = {
    categorias: PropTypes.array,
    setCatIndex: PropTypes.func
}
export default CarruselCategorias