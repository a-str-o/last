import React, { Component } from 'react';
import './LastNews.scss';
import firebase from '../../Config/FirebaseConfig';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import * as Scroll from 'react-scroll';
import axios from 'axios'
import Pagination from '../../Pages/RapportEstimation/Pagination'
class LastNews extends Component {
    constructor(props) {
        super(props);
        this.state = { allPublications: this.props.publicationState, 
            currentPublications: [], 
            currentPage: null, 
            totalPages: null ,
        displayPagination : false}
        }
    
    getPublication (){
        const newsData = [];
        const db = firebase.firestore();
        db.collection('articles').orderBy("id", "desc").onSnapshot((snapshot) => {
            snapshot.forEach((doc) => newsData.push({ ...doc.data()}));
            this.props.dispatch({ type: 'SET_PUBLICATIONS', data: newsData});
            this.setState({displayPagination : true})
        });
        this.setState({allPublications : newsData})
    }
    updateArticle (article_id){
        Scroll.animateScroll.scrollToTop()
        //console.log(article_id)
        axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/getArticle', {article_id : article_id}).then(result => {
                //console.log(result.data)
                this.props.dispatch({ type: 'SET_CURRENT_PUBLICATIONS', data: result.data });
                this.setState({loadingArticle : false})

        })
        .catch(err => console.log(err))
        }
    componentDidMount = () => {
        this.getPublication()
        
    }
    componentDidUpdate = () => {
        // window.scrollTo(0, 0)
    }

    goToDetails = (e) => {
        Scroll.animateScroll.scrollToTop()
    }

    onPageChanged = data => {
        const { allPublications } = this.state;
        const { currentPage, totalPages, pageLimit } = data;
    
        const offset = (currentPage - 1) * pageLimit;
        const currentPublications = allPublications.slice(offset, offset + pageLimit);
    
        this.setState({ currentPage, currentPublications, totalPages });
      }
    
    render(){
        const { allPublications} = this.state;
        const totalPublications = allPublications.length;
        return (
            <div className="last-news-section">
                <div className="last-news-section-title">
                    <p className="lastnews--title">Nos dernières publications</p>
                </div>
                <div className="row">
                    {this.state.currentPublications.map((latsnew, index) => {
                        
                        return(
                            <>
                                { latsnew.url !=="" ?

                                    (
                                        <div className="col-md-4" key={index}>
                                            <div className="last-new">
                                                <Link to={latsnew.url} onClick={() =>{this.goToDetails(latsnew.id)}}>
                                                
                                                <div className="last-new-image" style={{backgroundImage: "url("+latsnew.image+")"}}></div>
                                                <div className="last-new-content">
                                                    <div className="last-new-title">
                                                        {latsnew.title}
                                                    </div>
                                                    <div className="last-new-date">
                                                        {latsnew.date}
                                                    </div>
                                                    <div className="last-new-text">
                                                        {latsnew.description}
                                                    </div>
                                                    <div className="last-new-button">
                                                        <span>En savoir plus</span>
                                                    </div>
                                                </div>
                                                </Link>
                                                
                                            </div>
                                        </div>
                                    )
                                    :
                                    (
                                        <div className="col-md-4" key={index} onClick={() =>{this.updateArticle(latsnew.link)}}>
                                            <div className="last-new">
                                            <Link to={`/publication/${latsnew.link}`} >
                                                <div className="last-new-image" style={{backgroundImage: "url("+latsnew.image+")"}}>
                    
                                                </div>
                                                <div className="last-new-content">
                                                    <div className="last-new-title">
                                                        {latsnew.title}
                                                    </div>
                                                    <div className="last-new-date">
                                                        {latsnew.date}
                                                    </div>
                                                    <div className="last-new-text">
                                                        {latsnew.description}
                                                    </div>
                                                    <div className="last-new-button">
                                                        <span > En savoir plus </span>
                                                    </div>
                                                </div>
                                            </Link>  
                                            </div>
                                        </div>
                                    )

                                }
                                
                            </>
                        
                            );
                        }) 
                    }
                </div>
                {this.state.displayPagination ? (
                <div className="d-flex flex-row py-4 align-items-center pagination--container">
              <Pagination totalRecords={totalPublications} pageNeighbours={1} onPageChanged={this.onPageChanged} pageLimit={3} />
</div>
                ) : ('')}
    
            </div>
        );
    }
    
    
}
const mapStateToProps = (state) => {
    const uid = state.auth.email;
    const estimation = state.userEstimation;
    const publication = state.publication.publications;
    return {
      uid: uid,
      estimation:estimation,
      publicationState:publication
    };
};
export default connect(mapStateToProps)(LastNews);
