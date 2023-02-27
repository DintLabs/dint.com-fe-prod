import Carousel from "react-spring-3d-carousel";
import { useState, useEffect } from "react";
import { config } from "react-spring";

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
        <div
            style={{ width: props.width, height: props.height, margin: props.margin }}
        >
            <Carousel
                slides={cards}
                goToSlide={goToSlide}
                offsetRadius={offsetRadius}
                showNavigation={showArrows}
                animationConfig={config.gentle}
            />
        </div>
    );
}

export default CustomCarousel;