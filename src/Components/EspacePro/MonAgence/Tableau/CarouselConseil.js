import React, { Component } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './CarouselConseil.scss'
import ProgressBar from "@ramonak/react-progress-bar";
import { connect } from "react-redux";

const CustomRightArrow = ({ onClick, ...rest }) => {

    // onMove means if dragging or swiping in progress.
    return <span className="carousel-right-arrow-conseil" onClick={() => onClick()}><i class="fas fa-chevron-right"></i></span>;
  };
  
  const CustomLeftArrow = ({ onClick, ...rest }) => {
    // onMove means if dragging or swiping in progress.
    return <span className="carousel-left-arrow-conseil" onClick={() => onClick()}><i class="fas fa-chevron-left"></i></span>;
  };
export class CarouselConseil extends Component {
  constructor(props) {
    super(props);
    this.state = {
        progress : 0
    }
    
}

  setVitrine(){
    this.props.dispatch({ type: 'RESET_ESTIMATION_FILTER'});
    this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false })
    this.props.dispatch({ type: 'SET_PRO_ACCOUNT_ACTIVE_MENU', data: "vitrine"})
  }

  setTransaction(){
    this.props.dispatch({ type: 'RESET_ESTIMATION_FILTER'});
    this.props.dispatch({ type: 'SET_ESTIMATION_FILTER', data: false })
    this.props.dispatch({ type: 'SET_PRO_ACCOUNT_ACTIVE_MENU', data: "addtransactions"})
  }

    render() {
        return (
          <div className="carousel--container">
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

                <div className="slide--container">
                    <div className="slide--header">
                        <p className="header-text">Ajoutez un logo
                        {this.props.logo ? (
                        <span className="check-icon"><i class="fas fa-check-circle"></i></span>
                        ) : ("")}
                        </p>
                    </div>
                    <div className="slide--helper">
                        <p className="helper-text">Le logo aide le particulier à identifier votre agence sur Agenz</p>
                        
                    </div>
                    <div className="slide--button">
                        <button onClick={()=> this.setVitrine()} className="button button-primary button--secondary  slide-btn">Ajouter mon logo</button>
                    </div>

                </div>
          
                <div className="slide--container">
                    <div className="slide--header">
                        <p className="header-text">Ajoutez une photo d'en-tête
                        {this.props.cover ? (
                        <span className="check-icon"><i class="fas fa-check-circle"></i></span>
                        ) : ("")}
                        </p>
                    </div>
                    <div className="slide--helper">
                        <p className="helper-text">La photo est déterminante pour laisser une bonne première impression (photo de votre agence, du quartier, de biens, etc.). Taille : 1200x350 (format paysage). Formats acceptés : JPG, PNG. </p>
                    </div>
                    <div className="slide--button">
                        <button onClick={()=> this.setVitrine()} className="button button-primary button--secondary  slide-btn">Choisir une photo</button>
                    </div>

                </div>

                <div className="slide--container">
                    <div className="slide--header">
                        <p className="header-text">Présentez votre agence
                        {this.props.vitrine ? (
                        <span className="check-icon"><i class="fas fa-check-circle"></i></span>
                        ) : ("")}
                        </p>
                    </div>
                    <div className="slide--helper">
                        <p className="helper-text">Votre description doit présenter aux particuliers votre savoir-faire, vos spécialités, vos valeurs et vos informations clefs.</p>
                    </div>
                    <div className="slide--button">
                        <button onClick={()=> this.setVitrine()} className="button button-primary button--secondary  slide-btn">Présenter l'agence</button>
                    </div>

                </div>

                <div className="slide--container">
                    <div className="slide--header">
                        <p className="header-text">Publiez vos derniers biens vendus
                        {this.props.transac ? (
                        <span className="check-icon"><i class="fas fa-check-circle"></i></span>
                        ) : ("")}
                        </p>
                    </div>
                    <div className="slide--helper">
                        <p className="helper-text">Une agence qui affiche au moins 10 biens vendus multiplie sa visibilité par 10 et le nombre de ses contacts par 6.</p>
                        <button onClick={()=> this.setTransaction()} className="button button-primary button--secondary  slide-btn">Ajouter des ventes</button>
                        <p className="transactions-count">{Math.min(this.props.progress,10)}/10</p>
                        <ProgressBar 
    completed={this.props.progress*10}
    bgColor="#2da7f9"
    labelAlignment="outside"
    isLabelVisible={false}
    labelColor="#e80909"
    />
                    </div>
                    

                </div>

</Carousel>
       </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    uid: state.auth.uid,
  }
}; 

export default connect(mapStateToProps)(CarouselConseil)

