import Carousel from "react-spring-3d-carousel";
import { useState, useEffect } from "react";
import { config } from "react-spring";
import { Box } from "@mui/material";

const CustomCarousel = (props: any) => {
    const table = props.cards.map((element: any, index: number) => {
        return { ...element, onClick: () => {
            setGoToSlide(index)} };
    });

    const [offsetRadius, setOffsetRadius] = useState(2);
    const [showArrows, setShowArrows] = useState<boolean>(false);
    const [goToSlide, setGoToSlide] = useState<number>();
    const [cards] = useState(table);

    useEffect(() => {
        setOffsetRadius(props.offset);
        setShowArrows(props.showArrows);
    }, [props.offset, props.showArrows]);

    useEffect(() => {
      setGoToSlide(props.goToSlide)
    }, [props.goToSlide])
    

    return (
        <Box
            sx={{
                '@media screen and (max-width: 899px)': {
                    '>div': {
                        '>div': {
                            left: '0 !important' ,
                            top: '0 !important',
                            transform: 'unset !important',
                            width: '100% !important',
                            height: '100% !important',
                        },
                    },
                },
            }}
            style={{ width: props.width, height: props.height, margin: props.margin }}
        >
            <Carousel
                slides={cards}
                goToSlide={goToSlide}
                offsetRadius={offsetRadius}
                showNavigation={showArrows}
                animationConfig={config.gentle}
            />
        </Box>
    );
}

export default CustomCarousel;