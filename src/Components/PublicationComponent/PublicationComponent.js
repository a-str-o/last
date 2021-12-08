import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PublicationComponent.scss';
import Helmet from 'react-helmet'
import BeatLoader from "react-spinners/BeatLoader";
import axios from 'axios'
import { css } from "@emotion/core";
import * as Scroll from 'react-scroll';
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class PublicationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingArticle: true,
            article : {}
        }
    }
    

    getCurrentNew() {

        this.props.publicationState.forEach(res => {
            if (res.id === this.props.activePublication) {
                this.props.dispatch({ type: 'SET_CURRENT_PUBLICATIONS', data: res });
            }
        })

    }
    getArticle (){
        Scroll.animateScroll.scrollToTop()
        const article_id = window.location.href.replace(window.location.origin + '/publication/', '').split('?')[0];
        // console.log(article_id)
        axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/getArticle', {article_id : article_id}).then(result => {
                // console.log(result.data)
                this.setState({article : result.data})
                this.props.dispatch({ type: 'SET_CURRENT_PUBLICATIONS', data: result.data });
                this.setState({loadingArticle : false})
        })
        .catch(err => console.log(err))
        }
    getImage(){
        let uid = window.location.href.replace(window.location.origin + '/publication/', '').split('?')[0];
        console.log(uid)
        import(`../../assets/img/${uid}/${uid}.jpeg`).then( module => {
            this.setState({image : module.default})
        })
        .catch(err => {
            console.log(err)
        })
        

    }

    componentDidMount() {
        this.getImage()
        this.getArticle()
    }

    componentDidUpdate(prevProps) {
        // console.log(prevProps)
        if (prevProps.id!== this.props.id) {
          this.getImage();
        }
      }


    render() {

        return (
            <div className="article--root-container">
                        <Helmet>
    <title>{this.props.currentPublication.title}</title>
    <meta name="description" 
content={this.props.currentPublication.description} />    </Helmet>
        
<>
{/* <MagHeader publicationState={this.state.publicationState} /> */}
                <div className='container'>



                {/* style={{ backgroundImage: 'url(' + this.props.currentPublication.image + ')' }} */}
                    <div className='publication-image' >
<img alt="Prix de l'immobilier à Casablanca et au Maroc" className="background--publication"
src={this.state.image} 
/>
        </div>
        {this.state.loadingArticle ? (
                <BeatLoader color='#2ea7f9' loading={true} css={override} size={15} /> ) : (
                    <div className="publication--container">
                    <div className='publication-text'>
                        <div className='title--block'>
                            <h1 className='title--display'>{this.props.currentPublication.title}</h1>
                        </div>
                        <div className='publication-date'>
                            <p className='date--display'>{this.props.currentPublication.date}</p>
                        </div>
                        <div className='root-container' dangerouslySetInnerHTML={{__html: this.props.currentPublication.text}}>
 

                        </div> 
                    </div>
                    <div className="articles--right-side">
                        <div className="estimation--tool-container">
                        <p className="tool--title-estimation"><i class="fas fa-calculator"></i>
Estimez votre bien immobilier en 2 minutes</p>
                        <p className="tool--link"><a className="button button-primary" href="/estimation">Estimez votre bien </a></p>
                        </div>
                        <div className="pricint--tool-container">
                            <p className="tool--title"><i class="fas fa-map-marked-alt"></i>Comprendre les prix au m<sup>2</sup> autour de vous</p>
                            <p className="tool--link"><a className="button button-primary" href="/prix-immobilier">Voir la carte des prix </a></p>
                        </div>
                        <div className="pricint--tool-container">
                            <p className="tool--title"><i class="fas fa-user-tie"></i> Professionnel de l'immobilier ?</p>
                            <p className="tool--link"><a className="button button-primary" href="/Offres-pro">Découvrez nos offres pro</a></p>
                        </div>
                    </div>
                    </div>
                )}
        </div>

                <div className='col-md-12'>
                    <div className='socials-medias'>
                        <div className='facebook'><a aria-label="Facebook" href={`https://www.facebook.com/sharer/sharer.php?u=https://agenz.ma/publication/${this.props.currentPublication.link}`}><i className='fab fa-facebook-square'></i></a></div>
                        <div className='twitter'><a aria-label="Twitter" href={`https://twitter.com/intent/tweet?url=https://agenz.ma/publication/${this.props.currentPublication.link}&text=https://www.facebook.com/sharer/sharer.php?u=https://agenz.ma/publication/${this.props.currentPublication.link}`}><i className='fab fa-twitter-square'></i></a></div>
                        <div className='linked'><a aria-label="Linkedin" href={`https://www.linkedin.com/shareArticle?mini=true&url=https://agenz.ma/publication/${this.props.currentPublication.link}&title=&summary=&source=`}><i className='fab fa-linkedin'></i></a></div>
                        <div className='whatsapp'><a aria-label="Whatsapp" href={`whatsapp://send?text=https://agenz.ma/publication/${this.props.currentPublication.link}`}><i className='fab fa-whatsapp-square'></i></a></div>
                    </div>

                </div>
            </>
                      
            </div>

        );
    }
}
const mapStateToProps = (state) => {
    const uid = state.auth.email;
    const estimation = state.userEstimation;
    const publication = state.publication.publications;
    const activePublication = state.publication.activePublication;
    const currentPublication = state.publication.currentPublication;

    // console.log(state)
    return {
        uid: uid,
        estimation: estimation,
        publicationState: publication,
        activePublication: activePublication,
        currentPublication: currentPublication
    };
};
export default connect(mapStateToProps)(PublicationComponent);
