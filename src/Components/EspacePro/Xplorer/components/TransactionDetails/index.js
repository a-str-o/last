import React from 'react';
import './style.scss';

import { connect } from 'react-redux';
import OwlCarousel from 'react-owl-carousel';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import filledNotStar from './../../../../../assets/img/filledNotStar.png';
import filledStar from './../../../../../assets/img/filledStar.png';


class TransactionDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categorie: null,
            activite: null,
            firstName: null,
            lastName: null,
            phone: null,
            fonction: null,
            email: null,
            country: null,
            city: null,
            address: null,
            postalcode: null,
            image: null,
            curentPassword: null,
            newPassword: null,
            
            descriptionActivite: null,
            emailEntreprise: null,
            countryEntreprise: null,
            cityEntreprise: null,
            addressEntreprise: null,
            postalcodeEntreprise: null,
            phoneEntreprise: null,
            nameEntreprise: null,
            informationsFounded : true
        }
    }

    closeDetails  = () => {
        this.props.dispatch({type : 'TRANSACTION_DETAILS', data: false})
        this.props.dispatch({type : 'SET_TRANSACTION_DETAILS', data: {}})
    }


    componentDidMount () {
        // this.getUsser()
        // setInterval(() => {
        //     this.getUsser()
        // }, 500);
    }

    // getUsser (){
    //     if (this.props.espacePro.TransactionDetails.contributeur) {
    //         console.log(this.props.espacePro.TransactionDetails.contributeur)
    //         const db = firebase.firestore();
    //         const userDatas = [];

    //         var userRef = db.collection("users");
    //         var query = userRef.where("email", "==", this.props.espacePro.TransactionDetails.contributeur);

    //         query.get()
    //         .then((querySnapshot) => {
               
    //             querySnapshot.forEach((doc) => {

    //                 if(doc) {
    //                     console.log(doc)
    //                     userDatas.push({ ...doc.data()})

    //                     if(userDatas[0].categorie){
    //                         this.setState({
    //                             categorie: userDatas[0].categorie
    //                         })
    //                     }
            
    //                     if(userDatas[0].activite){
    //                         this.setState({
    //                             activite: userDatas[0].activite
    //                         })
    //                     }
            
    //                     if(userDatas[0].firstName){
    //                         this.setState({
    //                             firstName: userDatas[0].firstName,
    //                         })
    //                     }
            
    //                     if(userDatas[0].lastName){
    //                         this.setState({
    //                             lastName: userDatas[0].lastName
    //                         })
    //                     }
            
    //                     if(userDatas[0].phone){
    //                         this.setState({
    //                             phone: userDatas[0].phone
    //                         })
    //                     }
            
    //                     if(userDatas[0].phone){
    //                         this.setState({
    //                             fonction: userDatas[0].fonction
    //                         })
    //                     }
            
            
    //                     if(userDatas[0].email){
    //                         this.setState({
    //                             email: userDatas[0].email
    //                         })
    //                     }
            
    //                     if(userDatas[0].country){
    //                         this.setState({
    //                             country: userDatas[0].country
    //                         })
    //                     }
            
    //                     if(userDatas[0].city){
    //                         this.setState({
    //                             city: userDatas[0].city
    //                         })
    //                     }
            
    //                     if(userDatas[0].postalcode){
    //                         this.setState({
    //                             postalcode: userDatas[0].postalcode
    //                         })
    //                     }
            
    //                     if(userDatas[0].address){
    //                         this.setState({
    //                             address: userDatas[0].address
    //                         })
    //                     }
            
    //                     if(userDatas[0].user_image){
    //                         this.setState({
    //                             image: userDatas[0].user_image
    //                         })
    //                     }
            
    //                     if(userDatas[0].addressEntreprise){
    //                         this.setState({
    //                             addressEntreprise: userDatas[0].addressEntreprise
    //                         })
    //                     }
            
    //                     if(userDatas[0].emailEntreprise){
    //                         this.setState({
    //                             emailEntreprise: userDatas[0].emailEntreprise
    //                         })
    //                     }
            
    //                     if(userDatas[0].phoneEntreprise){
    //                         this.setState({
    //                             phoneEntreprise: userDatas[0].phoneEntreprise
    //                         })
    //                     }
            
    //                     if(userDatas[0].countryEntreprise){
    //                         this.setState({
    //                             countryEntreprise: userDatas[0].countryEntreprise
    //                         })
    //                     }
            
    //                     if(userDatas[0].cityEntreprise){
    //                         this.setState({
    //                             cityEntreprise: userDatas[0].cityEntreprise
    //                         })
    //                     }
            
    //                     if(userDatas[0].descriptionActivite){
    //                         this.setState({
    //                             descriptionActivite: userDatas[0].descriptionActivite
    //                         })
    //                     }
                        
            
    //                     if(userDatas[0].nameEntreprise){
    //                         this.setState({
    //                             nameEntreprise: userDatas[0].nameEntreprise
    //                         })
    //                     }
            
    //                     if(userDatas[0].postalcodeEntreprise){
    //                         this.setState({
    //                             postalcodeEntreprise: userDatas[0].postalcodeEntreprise
    //                         })
    //                     }
    //                 } else {
    //                     this.setState({informationsFounded : false})
    //                 }
    //             } );

                
    //         }).catch(err => {
    //             console.log(err)
    //         })
            
            
    //     }else {
    //         this.setState({informationsFounded : false})
    //     }
        
        
    // }
    
    render() {
        const options = {
            items: 5,
            nav: true,
            navText:["<div className='nav-btn prev-slide'></div>","<div className='nav-btn next-slide'></div>"],
            rewind: true,
            loop: true,
            mouseDrag: true,
            touchDrag: true,
            pullDrag: true,
            autoplay: true,
            lazyLoad: true,
		    smartSpeed: 8000,
            navSpeed: 700,
            autoplayTimeout: 1000,
            slideBy: 1,
            dots: true
          };
        return (
            <div className = "TransactionDetails">
                {this.props.espacePro.TransactionDetails.images ? (
                    <div className = "transactionSlider">
                        <OwlCarousel ref="gallery" options={options}>
                            {this.props.espacePro.TransactionDetails.images.map((image, indexxxx) => {
                                return (
                                    <div class="item">
                                        
                                        <div class="transactionImages" style={{backgroundImage: "url("+image+")"}}>
                                            
                                        </div>
                                    </div>
                                )
                            })}
                        
                        </OwlCarousel>
                    </div>
                ) : ''
                }
                
                <div className = "transactionTitle">
                    <p className="details-bien details-bien-title">
                    {this.props.espacePro.TransactionDetails.consistance} de {this.props.espacePro.TransactionDetails.surface} m2
                    </p>
                    <p className="details-bien">Vendu en {this.props.espacePro.TransactionDetails.dateTransactions}</p>
                </div>

                <hr></hr>

                <div className = "transactionCaracteristics">
                    <h5>Caractéristiques</h5>
                    {this.props.espacePro.TransactionDetails.bien && this.props.espacePro.TransactionDetails.bien === 'appartement' ?  
                    (
                        <div className = "row">
                            <div className = "col-md-6">
                                {this.props.espacePro.TransactionDetails.address ? 
                                (<p className="details-bien"> <span className ="details-bien-title">Adresse :</span> {this.props.espacePro.TransactionDetails.address}</p>)
                                : '' }

                                {this.props.espacePro.TransactionDetails.agencement ? 
                                (<p className="details-bien"> <span className ="details-bien-title">Agencement : </span> 
                                {this.props.espacePro.TransactionDetails.agencement === 1 ?
                                (
                                    <div className="starsShow">
                                        <img src={filledStar} alt=''></img>
                                        <img src={filledNotStar} alt=''></img>
                                        <img src={filledNotStar} alt=''></img>
                                        <img src={filledNotStar} alt=''></img>
                                    </div>
                                ): 
                                this.props.espacePro.TransactionDetails.agencement === 2 ?
                                    (
                                        <div className="starsShow">
                                            <img src={filledStar} alt=''></img>
                                            <img src={filledStar} alt=''></img>
                                            <img src={filledNotStar} alt=''></img>
                                            <img src={filledNotStar} alt=''></img>
                                        </div>
                                    ):
                                    this.props.espacePro.TransactionDetails.agencement === 3 ?
                                    (
                                        <div className="starsShow">
                                            <img src={filledStar} alt=''></img>
                                            <img src={filledStar} alt=''></img>
                                            <img src={filledStar} alt=''></img>
                                            <img src={filledNotStar} alt=''></img>
                                        </div>
                                    ):
                                    this.props.espacePro.TransactionDetails.agencement === 4 ?
                                    (
                                        <div className="starsShow">
                                            <img src={filledStar} alt=''></img>
                                            <img src={filledStar} alt=''></img>
                                            <img src={filledStar} alt=''></img>
                                            <img src={filledStar} alt=''></img>
                                        </div>
                                    ): ''}
                                </p>)
                                : '' }
                                {this.props.espacePro.TransactionDetails.ascenseur !== undefined? 
                                (<p className="details-bien"><span className ="details-bien-title"> Ascenceur : </span> {this.props.espacePro.TransactionDetails.ascenseur === 1 ? 'Oui' : 'Non'}</p>)
                                : '' }
                                {this.props.espacePro.TransactionDetails.balcon !== undefined ? 
                                (<p className="details-bien"><span className ="details-bien-title"> Balcon : </span> {this.props.espacePro.TransactionDetails.balcon === 1 ? 'Oui' : 'Non'}</p>)
                                : '' }
                                {this.props.espacePro.TransactionDetails.calme !== undefined? 
                                (<p className="details-bien"><span className ="details-bien-title"> Calme : </span> {this.props.espacePro.TransactionDetails.calme === 1 ? 'Oui' : 'Non'}</p>)
                                : '' }
                                {this.props.espacePro.TransactionDetails.cave !== undefined? 
                                (<p className="details-bien"><span className ="details-bien-title"> Cave : </span> {this.props.espacePro.TransactionDetails.cave === 1 ? 'Oui' : 'Non'}</p>)
                                : '' }

                                {this.props.espacePro.TransactionDetails.chambreservice !== undefined? 
                                (<p className="details-bien"><span className ="details-bien-title"> Chambre de service : </span> {this.props.espacePro.TransactionDetails.chambreservice === 1 ? 'Oui' : 'Non'}</p>)
                                : '' }
                                {this.props.espacePro.TransactionDetails.cheminee !== undefined? 
                                (<p className="details-bien"><span className ="details-bien-title"> Cheminée : </span> {this.props.espacePro.TransactionDetails.cheminee === 1 ? 'Oui' : 'Non'}</p>)
                                : '' }
                                {this.props.espacePro.TransactionDetails.concierge !== undefined? 
                                (<p className="details-bien"><span className ="details-bien-title"> Concierge : </span> {this.props.espacePro.TransactionDetails.concierge === 1 ? 'Oui' : 'Non'}</p>)
                                : '' }
                                {this.props.espacePro.TransactionDetails.construction ? 
                                (<p className="details-bien"><span className ="details-bien-title"> Construction : </span> {
                                    this.props.espacePro.TransactionDetails.construction === -1 ?
                                    ('Je ne sais pas') :
                                    this.props.espacePro.TransactionDetails.construction === 0 ?
                                    ('Moins de 5 ans'):
                                    this.props.espacePro.TransactionDetails.construction === 1 ?
                                    ('Entre 10 et 20 ans'):
                                    this.props.espacePro.TransactionDetails.construction === 2 ?
                                    ('Plus de 20 ans'):
                                    this.props.espacePro.TransactionDetails.construction === 3 ?
                                    ('Moins de 10 ans'):
                                    ('Construction neuve')
                                    }</p>)
                                : '' }
                                {this.props.espacePro.TransactionDetails.dateTransactions ? 
                                (<p className="details-bien"><span className ="details-bien-title"> Date de la transaction : </span> {this.props.espacePro.TransactionDetails.dateTransactions}</p>)
                                : '' }
                                {this.props.espacePro.TransactionDetails.duplex !== undefined? 
                                (<p className="details-bien"><span className ="details-bien-title"> Duplex : </span> {this.props.espacePro.TransactionDetails.duplex === 1 ? 'Oui' : 'Non'}</p>)
                                : '' }
                                {this.props.espacePro.TransactionDetails.etage !== undefined? 
                                (<p className="details-bien"><span className ="details-bien-title"> Etage : </span>{ this.props.espacePro.TransactionDetails.etage === 1 ? 'Oui' : 'Non'}</p>)
                                : '' }
                                {this.props.espacePro.TransactionDetails.etagesimmeuble !== undefined? 
                                (<p className="details-bien"><span className ="details-bien-title"> Etage immeuble : </span> {this.props.espacePro.TransactionDetails.etagesimmeuble === 1 ? 'Oui' : 'Non'}</p>)
                                : '' }
                                {this.props.espacePro.TransactionDetails.finition ? 
                                (<p className="details-bien"><span className ="details-bien-title"> Finition : </span> 
                                {this.props.espacePro.TransactionDetails.finition === 'correct' ? ('Correct') :
                                this.props.espacePro.TransactionDetails.finition === 'travauxaprevoir' ? ('Travaux à prévoir') :
                                this.props.espacePro.TransactionDetails.finition === 'refaitaneuf' ? ('Refait à neuf') : ''
                                }</p>)
                                : '' }
                            </div>

                            <div className = "col-md-6">
                                
                                {this.props.espacePro.TransactionDetails.luminosite ? 
                                (<p className="details-bien"><span className ="details-bien-title"> Luminosité : </span> 
                                {this.props.espacePro.TransactionDetails.luminosite === 1 ?
                                (
                                    <div className="starsShow">
                                        <img src={filledStar} alt=''></img>
                                        <img src={filledNotStar} alt=''></img>
                                        <img src={filledNotStar} alt=''></img>
                                        <img src={filledNotStar} alt=''></img>
                                    </div>
                                ): 
                                this.props.espacePro.TransactionDetails.luminosite === 2 ?
                                    (
                                        <div className="starsShow">
                                            <img src={filledStar} alt=''></img>
                                            <img src={filledStar} alt=''></img>
                                            <img src={filledNotStar} alt=''></img>
                                            <img src={filledNotStar} alt=''></img>
                                        </div>
                                    ):
                                    this.props.espacePro.TransactionDetails.luminosite === 3 ?
                                    (
                                        <div className="starsShow">
                                            <img src={filledStar} alt=''></img>
                                            <img src={filledStar} alt=''></img>
                                            <img src={filledStar} alt=''></img>
                                            <img src={filledNotStar} alt=''></img>
                                        </div>
                                    ):
                                    this.props.espacePro.TransactionDetails.luminosite === 4 ?
                                    (
                                        <div className="starsShow">
                                            <img src={filledStar} alt=''></img>
                                            <img src={filledStar} alt=''></img>
                                            <img src={filledStar} alt=''></img>
                                            <img src={filledStar} alt=''></img>
                                        </div>
                                    ): ''
                                }</p>)
                                : '' }
                                {this.props.espacePro.TransactionDetails.orientation ? 
                                (<p className="details-bien"><span className ="details-bien-title"> Orientation : </span> {this.props.espacePro.TransactionDetails.orientation}</p>)
                                : '' }
                                {this.props.espacePro.TransactionDetails.parking !== undefined? 
                                (<p className="details-bien"><span className ="details-bien-title"> Parking : </span> {this.props.espacePro.TransactionDetails.parking === 1 ? 'Oui' : 'Non'}</p>)
                                : '' }
                                {this.props.espacePro.TransactionDetails.placesparking !== undefined ? 
                                (<p className="details-bien"><span className ="details-bien-title"> Place de parking : </span> {this.props.espacePro.TransactionDetails.placesparking}</p>)
                                : '' }
                                {/* {this.props.espacePro.TransactionDetails.prix ? 
                                (<p className="details-bien"><span className ="details-bien-title"> Prix : </span> 
                                { new Intl.NumberFormat(
                                    'ma',
                                    {
                                        style: 'currency',
                                        currency: 'MAD',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    })
                                    .format(this.props.espacePro.TransactionDetails.prix)
                                    .replaceAll(',', ' ') } </p>)
                                : '' } */}
                                {this.props.espacePro.TransactionDetails.redejardin !== undefined? 
                                (<p className="details-bien"><span className ="details-bien-title"> Rez de jardin : </span> {this.props.espacePro.TransactionDetails.redejardin === 'non' ? 'Non' : 'Oui collectif'}</p>)
                                : '' }
                                {this.props.espacePro.TransactionDetails.renovee !== undefined? 
                                (<p className="details-bien"><span className ="details-bien-title"> Rénovée : </span> {this.props.espacePro.TransactionDetails.renovee === 1 ? 'Oui' : 'Non'}</p>)
                                : '' }
                                {this.props.espacePro.TransactionDetails.residencefermee !== undefined? 
                                (<p className="details-bien"><span className ="details-bien-title"> Residence fermée : </span> {this.props.espacePro.TransactionDetails.residencefermee === 1 ? 'Oui' : 'Non'}</p>)
                                : '' }
                                {this.props.espacePro.TransactionDetails.sdb !== undefined? 
                                (<p className="details-bien"><span className ="details-bien-title"> Salles de bain : </span> {this.props.espacePro.TransactionDetails.sdb}</p>)
                                : '' }
                                {this.props.espacePro.TransactionDetails.surfacebalcon !== undefined? 
                                (<p className="details-bien"><span className ="details-bien-title"> Surface du balcon : </span> {this.props.espacePro.TransactionDetails.surfacebalcon}</p>)
                                : '' }
                                {this.props.espacePro.TransactionDetails.surfacecave !== undefined? 
                                (<p className="details-bien"><span className ="details-bien-title"> Surface de la cave : </span> {this.props.espacePro.TransactionDetails.surfacecave} m²</p>)
                                : '' }
                                {this.props.espacePro.TransactionDetails.surfacehabitable !== undefined? 
                                (<p className="details-bien"><span className ="details-bien-title"> Surface habitable : </span> {this.props.espacePro.TransactionDetails.surfacehabitable} m²</p>)
                                : '' }
                                {this.props.espacePro.TransactionDetails.surfaceparking ? 
                                (<p className="details-bien"><span className ="details-bien-title"> Surface du parking : </span> {this.props.espacePro.TransactionDetails.surfaceparking} m²</p>)
                                : '' }
                                {this.props.espacePro.TransactionDetails.typologie ? 
                                (<p className="details-bien"><span className ="details-bien-title"> Nombre de chambres : </span> {this.props.espacePro.TransactionDetails.typologie}</p>)
                                : '' }
                                {this.props.espacePro.TransactionDetails.vueexceptionnelle !== undefined? 
                                (<p className="details-bien"><span className ="details-bien-title"> Vue exceptionnelle : </span> {this.props.espacePro.TransactionDetails.vueexceptionnelle === 1 ? 'Oui' : 'Non'}</p>)
                                : '' }
                            </div>
                        </div>
                    ) 
                    : this.props.espacePro.TransactionDetails.bien && this.props.espacePro.TransactionDetails.bien === 'villa' ? 
                    (
                        <div className = "row">
                        <div className = "col-md-6">
                            {this.props.espacePro.TransactionDetails.address ? 
                            (<p className="details-bien"><span className ="details-bien-title"> Adresse : </span> {this.props.espacePro.TransactionDetails.address}</p>)
                            : '' }
                            {this.props.espacePro.TransactionDetails.anneeconstruction ? 
                            (<p className="details-bien"><span className ="details-bien-title"> Année de construction : </span> 
                            {this.props.espacePro.TransactionDetails.anneeconstruction === -1 ?
                            ('Je ne sais pas') :
                            this.props.espacePro.TransactionDetails.anneeconstruction === 0 ?
                            ('Neuve') :
                            this.props.espacePro.TransactionDetails.anneeconstruction === 1 ?
                            ('Entre 1 et 5 ans') :
                            this.props.espacePro.TransactionDetails.anneeconstruction === 2 ?
                            ('Entre 5 et 10 ans') :
                            this.props.espacePro.TransactionDetails.anneeconstruction === 3 ?
                            ('Plus de 10 ans') : 
                            ('Plus de 20 ans')
                            }</p>)
                            : '' }
                            {this.props.espacePro.TransactionDetails.calme !== undefined? 
                            (<p className="details-bien"><span className ="details-bien-title"> Calme : </span> {this.props.espacePro.TransactionDetails.calme === 1 ? 'Oui' : 'Non'}</p>)
                            : '' }
                            {this.props.espacePro.TransactionDetails.chaufeausolaire !== undefined? 
                            (<p className="details-bien"><span className ="details-bien-title"> Chauffe eau solaire : </span> {this.props.espacePro.TransactionDetails.chaufeausolaire === 1 ? 'Oui' : 'Non'}</p>)
                            : '' }
                            {this.props.espacePro.TransactionDetails.cheminee !== undefined? 
                            (<p className="details-bien"><span className ="details-bien-title"> Cheminée : </span> {this.props.espacePro.TransactionDetails.cheminee === 1 ? 'Oui' : 'Non'}</p>)
                            : '' }
                            {this.props.espacePro.TransactionDetails.dateTransactions ? 
                            (<p className="details-bien"><span className ="details-bien-title"> Date de la transaction : </span> {this.props.espacePro.TransactionDetails.dateTransactions}</p>)
                            : '' }
                            {this.props.espacePro.TransactionDetails.etatgeneral ? 
                            (<p className="details-bien"><span className ="details-bien-title"> Etat géneral : </span> 
                            {this.props.espacePro.TransactionDetails.etatgeneral === 'travauxaprevoir' ?
                            ('Travaux à prévoir') : 
                            this.props.espacePro.TransactionDetails.etatgeneral === 'correct' ?
                            ('Correct') :
                            ('Etat neuf') 
                            }</p>)
                            : '' }
                            {this.props.espacePro.TransactionDetails.garage !== undefined? 
                            (<p className="details-bien"><span className ="details-bien-title"> Garage : </span> {this.props.espacePro.TransactionDetails.garage === 1 ? 'Oui' : 'Non'}</p>)
                            : '' }
                             {this.props.espacePro.TransactionDetails.murmitoyen !== undefined? 
                            (<p className="details-bien"><span className ="details-bien-title"> Mur moyen : </span> {this.props.espacePro.TransactionDetails.murmitoyen === 1 ? 'Oui' : 'Non'}</p>)
                            : '' }
                        </div>

                        <div className = "col-md-6">
                            
                           
                            {this.props.espacePro.TransactionDetails.piscine !== undefined? 
                            (<p className="details-bien"><span className ="details-bien-title"> Piscine : </span> {this.props.espacePro.TransactionDetails.piscine === 1 ? 'Oui' : 'Non'}</p>)
                            : '' }
                            {this.props.espacePro.TransactionDetails.prix ? 
                            (<p className="details-bien"><span className ="details-bien-title"> Prix : </span>
                            { new Intl.NumberFormat(
                                    'ma',
                                    {
                                        style: 'currency',
                                        currency: 'MAD',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    })
                                    .format(this.props.espacePro.TransactionDetails.prix)
                                    .replaceAll(',', ' ') } 
                            </p>)
                            : '' }
                            
                            {this.props.espacePro.TransactionDetails.sdb !== undefined? 
                            (<p className="details-bien"><span className ="details-bien-title"> Salles de bain : </span> {this.props.espacePro.TransactionDetails.sdb}</p>)
                            : '' }
                            {this.props.espacePro.TransactionDetails.surfaceconstruite !== undefined? 
                            (<p className="details-bien"><span className ="details-bien-title"> Surface construite : </span> {this.props.espacePro.TransactionDetails.surfaceconstruite} m²</p>)
                            : '' }
                            {this.props.espacePro.TransactionDetails.surfaceterrain !== undefined? 
                            (<p className="details-bien"><span className ="details-bien-title"> Surface du terrain : </span> {this.props.espacePro.TransactionDetails.surfaceterrain} m²</p>)
                            : '' }
                            {this.props.espacePro.TransactionDetails.typechauffage ? 
                            (<p className="details-bien"><span className ="details-bien-title"> Type de chauffage : </span> 
                            {this.props.espacePro.TransactionDetails.typechauffage === -1 ?
                            ('Je ne sais pas') :
                            this.props.espacePro.TransactionDetails.typechauffage === 0 ?
                            ('Electrique') :
                            this.props.espacePro.TransactionDetails.typechauffage === 1 ?
                            ('Chaudière centrale au fuel') :
                            this.props.espacePro.TransactionDetails.typechauffage ===   2 ?
                            ('Chaudière centrale au gaz') : ('Pompe à chaleur')

                            }</p>)
                            : '' }
                            {this.props.espacePro.TransactionDetails.typevilla ? 
                            (<p className="details-bien"><span className ="details-bien-title"> Type de villa : </span> 
                            {this.props.espacePro.TransactionDetails.typevilla === 'villajumelee' ?
                            ('Villa jumelée') : ('Villa en bande')
                            }</p>)
                            : '' }
                            {this.props.espacePro.TransactionDetails.typologie ? 
                            (<p className="details-bien"><span className ="details-bien-title"> Nombre de chambres : </span> {this.props.espacePro.TransactionDetails.typologie}</p>)
                            : '' }
                            {this.props.espacePro.TransactionDetails.vueexceptionnelle ? 
                            (<p className="details-bien"><span className ="details-bien-title"> Vue exceptionnelle : </span> {this.props.espacePro.TransactionDetails.vueexceptionnelle === 1 ? 'Oui' : 'Non'}</p>)
                            : '' }
                        </div>
                    </div>
                    ) 
                    : (
                        <div className = "row">

                            <div className = "col-md-6">
                            {this.props.espacePro.TransactionDetails.address ? 
                            (<p className="details-bien"><span className ="details-bien-title"> Adresse : </span> {this.props.espacePro.TransactionDetails.address}</p>)
                            : '' }
                            {this.props.espacePro.TransactionDetails.construction ? 
                            (<p className="details-bien"><span className ="details-bien-title"> Année de construction : </span> {this.props.espacePro.TransactionDetails.construction}</p>)
                            : '' }
                            {this.props.espacePro.TransactionDetails.dateTransactions ? 
                                (<p className="details-bien"><span className ="details-bien-title"> Date de la transaction : </span> {this.props.espacePro.TransactionDetails.dateTransactions}</p>)
                            : '' }
                             {this.props.espacePro.TransactionDetails.etage !== undefined? 
                                (<p className="details-bien"><span className ="details-bien-title"> Etage : </span> {this.props.espacePro.TransactionDetails.etage}</p>)
                            : '' }
                            
                            </div>

                            <div className = "col-md-6">
                            {this.props.espacePro.TransactionDetails.prix !== undefined? 
                                (<p className="details-bien"><span className ="details-bien-title"> Prix : </span> 
                                { new Intl.NumberFormat(
                                    'ma',
                                    {
                                        style: 'currency',
                                        currency: 'MAD',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    })
                                    .format(this.props.espacePro.TransactionDetails.prix)
                                    .replaceAll(',', ' ') }
                                </p>
                                )
                            : '' }
                            {this.props.espacePro.TransactionDetails.surface !== undefined? 
                                (<p className="details-bien"><span className ="details-bien-title"> Suface : </span> {this.props.espacePro.TransactionDetails.surface} m²</p>)
                            : '' }

                            {this.props.espacePro.TransactionDetails.surfaceParking !== undefined? 
                                (<p className="details-bien"><span className ="details-bien-title"> Suface de parking : </span> {this.props.espacePro.TransactionDetails.surfaceParking} m²</p>)
                            : '' }

                            {this.props.espacePro.TransactionDetails.surfaceTerrasse !== undefined? 
                                (<p className="details-bien"><span className ="details-bien-title"> Suface de de la terrasse : </span> {this.props.espacePro.TransactionDetails.surfaceTerrasse} m²</p>)
                            : '' }
                            </div>
                        </div>
                    )
                    }
                    
                
                </div>


                <hr></hr>

                <div className ="transactionCompany">
                    <h5>Informations de l'entreprise</h5>
                    <div className ="transactionCompanyDetails">

                    
                    {this.state.image ? 
                    (
                        <div className ="companyImage" style={{backgroundImage: "url("+this.state.image+")"}}></div>
                    )
                    : '' }


                     <div className = "companyDetais">
                     {this.state.nameEntreprise ? 
                            (<p className="details-bien"> <span className ="details-bien-title">Nom :</span> {this.state.nameEntreprise}</p>)
                    : '' }


                    {this.state.emailEntreprise ? 
                            (<p className="details-bien"> <span className ="details-bien-title">Email :</span> {this.state.emailEntreprise}</p>)
                    : '' }

                    {this.state.phoneEntreprise ? 
                            (<p className="details-bien"> <span className ="details-bien-title">téléphone :</span> {this.state.phoneEntreprise}</p>)
                    : '' }

                    
                    {this.state.countryEntreprise ?   
                            (<p className="details-bien"> <span className ="details-bien-title">Pays :</span> {this.state.countryEntreprise}</p>)
                    : '' }

                    {this.state.cityEntreprise? 
                            (<p className="details-bien"> <span className ="details-bien-title">Ville :</span> {this.state.cityEntreprise}</p>)
                    : '' }


                    {this.state.postalcodeEntreprise && this.state.addressEntreprise ? 
                            (<p className="details-bien"> <span className ="details-bien-title">Adresse :</span> {this.state.postalcode} , {this.state.addressEntreprise}</p>)
                    : '' }
                     </div>
                    </div>

                    {
                            !this.state.emailEntreprise ? (
                                <p >
                                    Aucune information
                                </p>
                            ) : ''
                        }
                </div>
                
                <div className ="transactionUser">
                    <h5>Informations du responsable</h5>
                    <div className= "userDetails">
                    {this.state.firstName && this.state.lastName ?   
                            (<p className="details-bien"> <span className ="details-bien-title">Nom :</span> {this.state.firstName} {this.state.lastName}</p>)
                    : '' }

                    {this.state.email? 
                            (<p className="details-bien"> <span className ="details-bien-title">Email :</span> {this.state.email}</p>)
                    : '' }


                    {this.state.phone ? 
                            (<p className="details-bien"> <span className ="details-bien-title">téléphone :</span> {this.state.phone}</p>)
                    : '' }

                    
                    {this.state.country ?   
                            (<p className="details-bien"> <span className ="details-bien-title">Pays :</span> {this.state.country}</p>)
                    : '' }

                    {this.state.city? 
                            (<p className="details-bien"> <span className ="details-bien-title">Ville :</span> {this.state.city}</p>)
                    : '' }


                    {this.state.postalcode && this.state.address ? 
                            (<p className="details-bien"> <span className ="details-bien-title">Adresse :</span> {this.state.postalcode} , {this.state.address}</p>)
                    : '' }
                    </div>
                        {
                            !this.state.email ? (
                                <p >
                                    Aucune information
                                </p>
                            ) : ''
                        }
                    
                </div>
                <div className= "closeDetails" onClick = {() => {this.closeDetails()}}>
                    <span> <i className = "fas fa-times-circle"></i> </span>
                </div>
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    const uid = state.auth.uid;
    const email = state.auth.email;
    
    const transaction = state.espacePro;
    console.log(transaction)
    return {
      uid: uid,
      email: email,
      espacePro: transaction,
    };
};  
export default connect(mapStateToProps)(TransactionDetails);