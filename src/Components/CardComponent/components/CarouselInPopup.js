import React from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './CarouselInPopup.scss'
const CustomRightArrow = ({ onClick, ...rest }) => {

  // onMove means if dragging or swiping in progress.
  return <span className="carousel-right-arrow" onClick={() => onClick()}><i class="fas fa-chevron-right"></i></span>;
};

const CustomLeftArrow = ({ onClick, ...rest }) => {
  // onMove means if dragging or swiping in progress.
  return <span className="carousel-left-arrow" onClick={() => onClick()}><i class="fas fa-chevron-left"></i></span>;
};
// const containerWidth = document.getElementsByClassName(".react-multi-carousel-list").offsetWidth;

const CarouselInPopup = (props) => {
  //console.log(props.images);
  return (
<Carousel
  additionalTransfrom={0}
  autoPlaySpeed={3000}
  customLeftArrow={<CustomLeftArrow />}
  customRightArrow={<CustomRightArrow />}
  centerMode={false}
  className=""
  containerClass="container-with-dots"
  dotListClass=""
  draggable
  focusOnSelect={false}
  infinite
  itemClass=""
  keyBoardControl
  minimumTouchDrag={80}
  renderButtonGroupOutside={false}
  renderDotsOutside={false}
  responsive={{
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024
      },
      items: 1,
      partialVisibilityGutter: 40
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0
      },
      items: 1,
      partialVisibilityGutter: 30
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464
      },
      items: 2,
      partialVisibilityGutter: 30
    }
  }}
  showDots={false}
  sliderClass=""
  slidesToSlide={1}
  swipeable
>
{ props.images.map((image, index) =>
                <div
                className="d-block w-100"
                style={{
                  backgroundImage: `url('${image}')`,
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  height: '113px'
                }}>
                  {props.venduLabel ? (
                    <div className="label--sold-container">
                      <p className="label-sold">VENDU</p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
          )}

</Carousel>
  );
}

export default CarouselInPopup;