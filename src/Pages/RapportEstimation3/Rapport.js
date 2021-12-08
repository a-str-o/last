
import React, { Component } from 'react';
import { connect } from "react-redux";
import PlaceRating from './PlaceRating'
import Axios from 'axios';
import Spinner from "react-bootstrap/Spinner";

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// https://gitlab.com/catamphetamine/react-phone-number-input
import 'react-phone-number-input/style.css'


import './Rapport.scss';

import { theme } from '../../assets/theme'
import { ThemeProvider } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { Radar } from "react-chartjs-2";

import LineChart from '../../Components/EstimationPro/EstimationComponents/LineChart';
import StarPicker from 'react-star-picker';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image, Font, Link} from '@react-pdf/renderer';
import font from './Montserrat-Thin.ttf'
import fontItalic from './Montserrat-Italic.ttf'
import fontBold from './Montserrat-Bold.ttf'
import fontMedium from './Montserrat-Medium.ttf'
import html2canvas from 'html2canvas'
import firebase from '../../Config/FirebaseConfig'
import mapboxgl from 'mapbox-gl';
import 'moment/locale/fr';
import TransactionListComponent from "./TransactionListComponent"
import AnnonceListComponent from "./AnnonceListComponent"
import ServiceMap from "./ServiceMap"
// import ProjectsListComponent from "../../Components/EstimationPro/EstimationComponents/ProjectsComponent/ProjectsListComponent"
import LocalisationMap from "./LocalisationMap"
import PriceBarComponent from './PriceBarComponent/PriceBarComponent'

moment.locale("fr")



class Rapport extends Component {
constructor(props) {
super(props);
this.state = {
rapport : {
"raison_prix": "",
"email": "",
"places_found": [],
"reference": "",
"prix_ancfcc": 0,
"createdAt": "",
"localisation": "",
"formattedAddress": "",
"estimationId": "",
"prix_force": "",
"annonces_selected": [],
"zone_ancfcc": "",
"estimation": 0,
"transactions_selected": [],
"date": 0,
"uid": ""
},
estimation : {},
agence : {},
loadingPage : true,
PDFReady : false,
preparingPDF : false,
loadingPdf : false
}
this.radarRef = React.createRef();
this.lineRef = React.createRef();

}


handleChangeCheckAgenz = (e) => {
this.setState({ estimation_agenz: !this.state.estimation_agenz })
};
handleChangeCheckAncfcc = (e) => {
this.setState({ prix_ancfcc: !this.state.prix_ancfcc })
};
handleChangeCheckAnnonces = (e) => {
this.setState({ annonces: !this.state.annonces })
};
handleChangeCheckPlaces = (e) => {
this.setState({ places: !this.state.places })
};
handleClickPdf = () => {
this.setState({ loadingPdf: true })
this.generateReport()
// ////console.log"Generating pdf")
};
handleChangePrice = (e) => {
this.setState({ prix_force: e.target.value })
// ////console.log"Price changed")
};
handleChangeRaison = (e) => {
this.setState({ raison_prix: e.target.value })
////console.log"Price changed")
};
handleChangeReference = (e) => {
this.setState({ reference: e.target.value })

};

getAgence(uid){
// //console.log(uid)
return new Promise((resolve,reject)=> {
Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/getAgence', {user_id : uid}).then( (res) => {
this.setState({agence : res.data})
resolve(res.data);
})
.catch(err=>{
reject(err)
})
})
}
getEstimation(uid){
return new Promise((resolve,reject)=> {
Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/getEstimation', {id : uid}).then( (res) => {
console.log(res.data)
this.setState({estimation : res.data})
resolve(res.data);
})
.catch(err=>{
alert("Estimation Introuvable")
reject(err)
})
    })

}
async getRapport(uid){
Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/getReport', {id : uid}).then( (res) => {
this.setState({rapport : res})
console.log(res.estimationId)
this.getEstimation(res.estimationId)
})
.catch(err=>{
////console.logerr)
})


}

create_mapbox_places_url(){
    let src='https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/'
    let lng=parseFloat(`${this.state.rapport.localisation.split("lng : ")[1]}`)
    let lat=parseFloat(`${this.state.rapport.localisation.split("lat : ")[1].split(" ")[0]}`)
    src = src + `pin-s+102556(${lng},${lat})`
    this.state.rapport.list_ecoles.map((item,index)=>{
        let add_src = `,pin-s-${index+1}+2196f3(${item.location.lng},${item.location.lat})`
        src = src+add_src
    })

    this.state.rapport.list_restaurants.map((item,index)=>{
        let add_src = `,pin-s-${index+1}+e91e63(${item.location.lng},${item.location.lat})`
        src = src+add_src
    })

    this.state.rapport.list_pharmacies.map((item,index)=>{
        let add_src = `,pin-s-${index+1}+28a745(${item.location.lng},${item.location.lat})`
        src = src+add_src
    })

    this.state.rapport.list_supermarches.map((item,index)=>{
        let add_src = `,pin-s-${index+1}+9c27b0(${item.location.lng},${item.location.lat})`
        src = src+add_src
    })
    src=src+`/${lng},${lat}`+",14,0/826x450@2x?before_layer=admin-1-boundary-bg&access_token=pk.eyJ1IjoiYmFkcmJlbGtleml6IiwiYSI6ImNraDduNjN2bDA2MGszMG5zZHRqNm5zMzIifQ.oITjlONmSiUQsFKrZfFd3w"
    // console.log(src)
    this.setState({mapBoxPlacesUrl : src})


}


create_mapbox_transactions_url(){
    let src='https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/'
    let lng=parseFloat(`${this.state.rapport.localisation.split("lng : ")[1]}`)
    let lat=parseFloat(`${this.state.rapport.localisation.split("lat : ")[1].split(" ")[0]}`)
    src = src + `pin-s+102556(${lng},${lat})`
    this.state.rapport.transactions_selected.map((item,index)=>{
        let add_src = `,pin-s-${index+1}+2196f3(${item.localisation.split("lng : ")[1]},${item.localisation.split("lat : ")[1].split(" ")[0]}})`
        src = src+add_src
    })

   
    src=src+`/${lng},${lat}`+`,${14},0/826x450@2x?before_layer=admin-1-boundary-bg&access_token=pk.eyJ1IjoiYmFkcmJlbGtleml6IiwiYSI6ImNraDduNjN2bDA2MGszMG5zZHRqNm5zMzIifQ.oITjlONmSiUQsFKrZfFd3w`
    this.setState({mapBoxTransactionsUrl : src})
}

create_mapbox_annonces_url(){
    let src='https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/'
    let lng=parseFloat(`${this.state.rapport.localisation.split("lng : ")[1]}`)
    let lat=parseFloat(`${this.state.rapport.localisation.split("lat : ")[1].split(" ")[0]}`)
    src = src + `pin-s+102556(${lng},${lat})`
    this.state.rapport.annonces_selected.map((item,index)=>{
        let add_src = `,pin-s-${index+1}+2196f3(${item.lng},${item.lat}})`
        src = src+add_src
    })

   
    src=src+`/${lng},${lat}`+`,${14},0/826x450@2x?before_layer=admin-1-boundary-bg&access_token=pk.eyJ1IjoiYmFkcmJlbGtleml6IiwiYSI6ImNraDduNjN2bDA2MGszMG5zZHRqNm5zMzIifQ.oITjlONmSiUQsFKrZfFd3w`
    this.setState({mapBoxAnnoncesUrl : src})
}


create_mapbox_projects_url(){
    let src='https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/'
    let lng=parseFloat(`${this.state.rapport.localisation.split("lng : ")[1]}`)
    let lat=parseFloat(`${this.state.rapport.localisation.split("lat : ")[1].split(" ")[0]}`)
    src = src + `pin-s+102556(${lng},${lat})`
    this.state.rapport.projects_found.map((item,index)=>{
        let add_src = `,pin-s-${index+1}+2196f3(${item.lng},${item.lat}})`
        src = src+add_src
    })

    src=src+`/${lng},${lat}`+`,${14},0/826x450@2x?before_layer=admin-1-boundary-bg&access_token=pk.eyJ1IjoiYmFkcmJlbGtleml6IiwiYSI6ImNraDduNjN2bDA2MGszMG5zZHRqNm5zMzIifQ.oITjlONmSiUQsFKrZfFd3w`
    // console.log(src)

    this.setState({mapBoxProjectsUrl : src})
}
screenFirstPage(){
    return new Promise((resolve,reject)=> {
        const db = firebase.storage();

        html2canvas(document.querySelector("#pdf--first-page"),{
            allowTaint : true,
            useCORS: true,
            scale: 2,
            scrollX: 0,
            scrollY: -window.scrollY,
            width : 800,
            x : 270,
            windowWidth: 1360
            }).then(canvas => {
            // //console.log(canvas)
            // new Promise(resolve => canvas.toBlob(resolve)).then((blob)=> {
            // //console.log(blob)
            var screenshot = canvas.toDataURL();
            var newName = new Date().getTime() + ".png";
            db.ref(`rapports_pdf/${newName}`).putString(screenshot,'data_url', {contentType:'image/png'})
            .then(data=>{
                screenshot = undefined;
            data.ref.getDownloadURL()
                .then(url => {
                    resolve(url)
                    this.setState({syntheseUrlFirstPage : url})
                })
            .catch(err => {
                //console.log(err)
                reject(err)
            })
        })
        .catch(err => {
            //console.log(err)
            reject(err)
        })

    })
    .catch(err => {
        //console.log(err)
        reject(err)
    })
            

    })

    }
screenSecondPage() {
    return new Promise((resolve,reject)=> {
        const db = firebase.storage();
        let offScroll = 0;
        if(window.innerWidth <  770){
            offScroll = 90
        }
    html2canvas(document.querySelector("#pdf--second-page"),{
        
        allowTaint : true,
        useCORS: true,
        scale: 2,
        scrollX: 0,
        scrollY: -window.scrollY+offScroll,
        width : 820,
        x : 250,
        windowWidth: 1360,
        windowHeight: 689
                        }).then(canvas => {
        var screenshot = canvas.toDataURL();
        var newName = new Date().getTime() + ".png";
        db.ref(`rapports_pdf/${newName}`).putString(screenshot,'data_url', {contentType:'image/png'})
        .then(data=>{
            screenshot = undefined;
            data.ref.getDownloadURL()
            .then(url => {
                    this.setState({syntheseUrlSecondPage : url})
                    resolve(url)
                })
            .catch(err => {
                //console.log(err)
                reject(err)
        })
        })
        .catch(err => {
            //console.log(err)
            reject(err)
    })
})
.catch(err => {
    //console.log(err)
    reject(err)
})
    })
}
// screenThirdPage() {
// return new Promise((resolve,reject)=> {
// const db = firebase.storage();
// // let canvas = document.querySelector(".chartjs-render-monitor")
// // //console.log(canvas)
// // canvas.width = 826
// // canvas.height = 345 
// // document.body.appendChild(canvas);
// const radar = this.radarRef.current;
// let canvas = radar.chartInstance.chart.canvas
// //console.log(canvas)
// var screenshot = canvas.toDataURL();
// var newName = new Date().getTime() + ".png";
// db.ref(`rapports_pdf/${newName}`).putString(screenshot,'data_url', {contentType:'image/png'})
//     .then(data=>{
//         screenshot = undefined;
//         data.ref.getDownloadURL()
//             .then(url => {
//                 this.setState({syntheseUrlThirdPage : url})
//                 resolve(url)
//             })
//             .catch(err=>{
//                 //console.log(err)
//                 reject(err)
//             })
//         })
//         .catch(err=>{
//             //console.log(err)
//             reject(err)
//         })
//     })


// }
screenThirdPage() {
    // var svg = document.querySelector('.svg--restaurants');
    // var s = new XMLSerializer().serializeToString(svg)
    // var encodedData = "data:image/svg+xml;base64,"+window.btoa(s);
    // console.log(encodedData)
    var canvas = document.createElement("CANVAS");
    let w = 100*window.devicePixelRatio 
    let h = 100*window.devicePixelRatio 
    canvas.width = 420
    canvas.height = 420
    var ctx = canvas.getContext('2d');
    // var data = (new XMLSerializer()).serializeToString(svg);
    // var DOMURL = window.URL || window.webkitURL || window;
    // var svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
    // var url = DOMURL.createObjectURL(svgBlob);
    // console.log(svgBlob)
    // console.log(url)
  
    var img = document.querySelector('#image--restaurants');
   

    //console.log(img)
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 420, 420);
    ctx.drawImage(img, 5, 5,400,400);

    ctx.fillStyle = "white";
    ctx.strokeStyle = "white"
    ctx.fillRect(100, 100, 180, 150);
    ctx.strokeRect(100, 100, 180, 150);


    ctx.font="100px Montserrat";
    ctx.fillStyle = "#3e98c7";
    ctx.textAlign = "center";
    ctx.fillText(parseFloat(this.state.rapport.note_restaurants), canvas.width/2, canvas.height/2);
    // document.body.appendChild(canvas);


    // console.log(url)
    let imgURI = ''
    img.onload = new Promise((resolve,reject) => {

    //console.log("loaded")
    // ctx.drawImage(img, 0, 0);
    // DOMURL.revokeObjectURL(url);
        
    imgURI = canvas
        .toDataURL('image/png')
        // console.log(imgURI)
        resolve(imgURI)
    }
    ).then(imgURI => {
      //  console.log(imgURI)
        this.setState({svgRestaurants : imgURI})    
    })
    

//     return new Promise((resolve,reject)=> {
//         const db = firebase.storage();
//         let offScroll = 0;
//         if(window.innerWidth <  770){
//             offScroll = 90
//         }
//     html2canvas(document.querySelector("#rating--places-container"),{
        
//         allowTaint : true,
//         useCORS: true,
//         scale: 2,
//         scrollX: 0,
//         scrollY: -window.scrollY+offScroll,
//         width : 820,
//         x : 250,
//         windowWidth: 1360,
//         windowHeight: 689
//                         }).then(canvas => {
//                             document.body.appendChild(canvas);
//         var screenshot = canvas.toDataURL();
//         var newName = new Date().getTime() + ".png";
//         db.ref(`rapports_pdf/${newName}`).putString(screenshot,'data_url', {contentType:'image/png'})
//         .then(data=>{
//             screenshot = undefined;
//             data.ref.getDownloadURL()
//             .then(url => {
//                     this.setState({syntheseUrlSecondPage : url})
//                     resolve(url)
//                 })
//             .catch(err => {
//                 reject(err)
//         })
//         })
//         .catch(err => {
//             reject(err)
//     })
// })
// .catch(err => {
//     reject(err)
// })
//     })
// ctx.fillRect(0, 0, 420, 420);
    }
screenEcoles() {
        var canvas = document.createElement("CANVAS");
        let w = 100*window.devicePixelRatio 
        let h = 100*window.devicePixelRatio 
        canvas.width = 420
        canvas.height = 420
        var ctx = canvas.getContext('2d');
        var img = document.querySelector('#image--ecoles');
        //console.log(img)

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 420, 420);
        ctx.drawImage(img, 5, 5,400,400);  
        ctx.fillStyle = "white";
        ctx.strokeStyle = "white"
        ctx.fillRect(100, 100, 180, 150);
        ctx.strokeRect(100, 100, 180, 150);
    
        ctx.font="100px Montserrat";
        ctx.fillStyle = "#3e98c7";
        ctx.textAlign = "center";
        ctx.fillText(parseFloat(this.state.rapport.note_ecoles), canvas.width/2, canvas.height/2);
        let imgURI = ''
        img.onload = new Promise((resolve,reject) => {
        imgURI = canvas
            .toDataURL('image/png')
            resolve(imgURI)
        }
        ).then(imgURI => {
          //  console.log(imgURI)
            this.setState({svgEcoles : imgURI})    
        })
    
        
        }
screenPharmacies() {
            var canvas = document.createElement("CANVAS");
            let w = 100*window.devicePixelRatio 
            let h = 100*window.devicePixelRatio 
            canvas.width = 420
            canvas.height = 420
            var ctx = canvas.getContext('2d');
            var img = document.querySelector('#image--pharmacies');
            //console.log(img)

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 420, 420);
            ctx.drawImage(img, 5, 5,400,400);  
            ctx.fillStyle = "white";
            ctx.strokeStyle = "white"
            ctx.fillRect(100, 100, 180, 150);
            ctx.strokeRect(100, 100, 180, 150);
        
            ctx.font="100px Montserrat";
            ctx.fillStyle = "#3e98c7";
            ctx.textAlign = "center";
            ctx.fillText(parseFloat(this.state.rapport.note_pharmacies), canvas.width/2, canvas.height/2);
            let imgURI = ''
            img.onload = new Promise((resolve,reject) => {
            imgURI = canvas
                .toDataURL('image/png')
                resolve(imgURI)
            }
            ).then(imgURI => {
              //  console.log(imgURI)
                this.setState({svgPharmacies : imgURI})    
            })
        
            
            }
screenSupermarches() {
                var canvas = document.createElement("CANVAS");
                let w = 100*window.devicePixelRatio 
                let h = 100*window.devicePixelRatio 
                canvas.width = 420
                canvas.height = 420
                var ctx = canvas.getContext('2d');
                var img = document.querySelector('#image--supermarches');
                //console.log(img)

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 420, 420);
                ctx.drawImage(img, 5, 5,400,400);  
                ctx.fillStyle = "white";
                ctx.strokeStyle = "white"
                ctx.fillRect(100, 100, 180, 150);
                ctx.strokeRect(100, 100, 180, 150);
            
                ctx.font="100px Montserrat";
                ctx.fillStyle = "#3e98c7";
                ctx.textAlign = "center";
                ctx.fillText(parseFloat(this.state.rapport.note_supermarches), canvas.width/2, canvas.height/2);
                let imgURI = ''
                img.onload = new Promise((resolve,reject) => {
                imgURI = canvas
                    .toDataURL('image/png')
                    resolve(imgURI)
                }
                ).then(imgURI => {
                  //  console.log(imgURI)
                    this.setState({svgSupermarches : imgURI})    
                })
            
                
                }
screenTextRestaurants(){
        let screenshot =""
    html2canvas(document.querySelector("#rating-restaurants"),{
        allowTaint : true,
        useCORS: true,
        scale: 2,
        scrollX: 0,
        scrollY: -window.scrollY,
        width : 800,
        x : 270,
        windowWidth: 1360
        }).then(canvas => {
        // //console.log(canvas)
        // new Promise(resolve => canvas.toBlob(resolve)).then((blob)=> {
        // //console.log(blob)
        screenshot = canvas.toDataURL();
        this.setState({ screenRestaurants : screenshot})
        })
        
}

screenLegendPrice(){
    let screenshot =""
html2canvas(document.querySelector("#price-legend"),{
    allowTaint : true,
    useCORS: true,
    scale: 2,
    scrollX: 0,
    scrollY: -window.scrollY,
    width : 800,
    x : 270,
    windowWidth: 1360
    }).then(canvas => {
    screenshot = canvas.toDataURL();
    this.setState({ screenLegend : screenshot})
    })
    
}
screenTextEcoles(){
    let screenshot =""
html2canvas(document.querySelector("#rating-ecoles"),{
    allowTaint : true,
    useCORS: true,
    scale: 2,
    scrollX: 0,
    scrollY: -window.scrollY,
    width : 800,
    x : 270,
    windowWidth: 1360
    }).then(canvas => {
    // document.body.appendChild(canvas);
    // //console.log(canvas)
    // new Promise(resolve => canvas.toBlob(resolve)).then((blob)=> {
    // //console.log(blob)
    screenshot = canvas.toDataURL();
    this.setState({ screenEcoles : screenshot})
    })
    
}
screenTextPharmacies(){
    let screenshot =""
html2canvas(document.querySelector("#rating-pharmacies"),{
    allowTaint : true,
    useCORS: true,
    scale: 2,
    scrollX: 0,
    scrollY: -window.scrollY,
    width : 800,
    x : 270,
    windowWidth: 1360
    }).then(canvas => {
    // //console.log(canvas)
    // new Promise(resolve => canvas.toBlob(resolve)).then((blob)=> {
    // //console.log(blob)
    screenshot = canvas.toDataURL();
    this.setState({ screenPharmacies : screenshot})
    })
    
}
screenTextSupermarches(){
    let screenshot =""
html2canvas(document.querySelector("#rating-supermarches"),{
    allowTaint : true,
    useCORS: true,
    scale: 2,
    scrollX: 0,
    scrollY: -window.scrollY,
    width : 800,
    x : 270,
    windowWidth: 1360
    }).then(canvas => {
    // //console.log(canvas)
    // new Promise(resolve => canvas.toBlob(resolve)).then((blob)=> {
    // //console.log(blob)
    screenshot = canvas.toDataURL();
    this.setState({ screenSupermarches : screenshot})
    })
    
}
screenFourthPage() {
    return new Promise((resolve,reject)=> {
        const db = firebase.storage();
        const line = this.lineRef.current;


    let canvas = line._reactInternalFiber.child.child.stateNode.chartInstance.chart.canvas
    //console.log(canvas)
            //console.log(canvas)
            var screenshot = canvas.toDataURL();
            var newName = new Date().getTime() + ".png";
            db.ref(`rapports_pdf/${newName}`).putString(screenshot,'data_url', {contentType:'image/png'})
            .then(data=>{
            screenshot = undefined;
            data.ref.getDownloadURL()
            .then(url => {
            this.setState({syntheseUrlFourthPage : url})
            resolve(url)
            })
            .catch(err => {
            //console.log(err)
            reject(err)
            })
    })
    .catch(err => {
        //console.log(err)
        reject(err)
        })
            })

            
}
preparePDF = () => {
this.setState({preparingPDF : true})
this.create_mapbox_places_url()
// this.create_mapbox_projects_url()

const db = firebase.storage();
this.screenFirstPage().then((res) => {
    //console.log(res)
this.screenSecondPage().then((res) => {
    //console.log(res)
this.screenThirdPage()
this.screenEcoles()
this.screenPharmacies()
this.screenSupermarches()
this.screenTextRestaurants()
this.screenTextPharmacies()
this.screenTextEcoles()
this.screenTextSupermarches()
this.screenLegendPrice()
    //console.log(res)
    this.screenFourthPage().then((res) => {
        //console.log(res)
        this.setState({PDFReady : true});
            setTimeout( () => {
            this.setState({loadingPDF : false});
            },10)


            
    })

})
})
.catch(err => {
    //console.log(err)
})



// html2canvas(document.querySelector("#pdf--third-page"),{
// allowTaint : true,
// useCORS: true,
// scale: 2,
// scrollX: 0,
// scrollY: -window.scrollY
// }).then(canvas => {

}
mapInit() {

mapboxgl.accessToken = this.props.config.mapboxglKey;
window.map = new mapboxgl.Map({
    container: document.getElementById('mapbox--container'),
    style: 'mapbox://styles/badrbelkeziz/ckqgutxx9de3o18nqnfggnnnf',
    // style:'mapbox://styles/mapbox/navigation-preview-day-v4',
    center: [parseFloat(`${this.state.rapport.localisation.split("lng : ")[1]}`),parseFloat(`${this.state.rapport.localisation.split("lat : ")[1].split(" ")[0]}`)],
    pitch: 0,
    zoom: 15,
    interactive: false,
    preserveDrawingBuffer: true})
    var marker = new mapboxgl.Marker()
.setLngLat([parseFloat(`${this.state.rapport.localisation.split("lng : ")[1]}`),parseFloat(`${this.state.rapport.localisation.split("lat : ")[1].split(" ")[0]}`)])
.addTo(window.map);
}
mapPlacesInit() {

    mapboxgl.accessToken = this.props.config.mapboxglKey;
    window.mapPlaces = new mapboxgl.Map({
        container: document.getElementById('mapbox--places-container'),
        style: 'mapbox://styles/badrbelkeziz/ckk6r9vo20yzr17qbv2mf76b4',
        // style:'mapbox://styles/mapbox/navigation-preview-day-v4',
        center: [parseFloat(`${this.state.rapport.localisation.split("lng : ")[1]}`),parseFloat(`${this.state.rapport.localisation.split("lat : ")[1].split(" ")[0]}`)],
        pitch: 0,
        zoom: 14,
        interactive: false,
        preserveDrawingBuffer: true})
        var marker = new mapboxgl.Marker()
    .setLngLat([parseFloat(`${this.state.rapport.localisation.split("lng : ")[1]}`),parseFloat(`${this.state.rapport.localisation.split("lat : ")[1].split(" ")[0]}`)])
    .addTo(window.mapPlaces);
    }
    
componentDidMount() {
const uid = window.location.href.replace(window.location.origin + '/rapport-estimation/', '');
let eId;
let uId;
Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/getReport', {id : uid}).then( (res) => {
console.log(res.data)
this.setState({rapport : res.data})
// this.create_mapbox_transactions_url()
// this.create_mapbox_places_url()
// this.create_mapbox_projects_url()
// this.create_mapbox_annonces_url()

console.log("here")
this.getEstimation(res.data.estimationId)
.then((est)=>{
    this.getAgence(res.data.uid)
    .then((ag)=> {
        this.setState({loadingPage : false})
        this.mapInit()
        this.mapPlacesInit()
                 
    })
    .catch(err=>{
        //console.log(err)
    })
})
.catch(err=>{
    //console.log(err)
})

})
.catch(err=>{
    //console.log(err)
})
}



formatAdresse(adresse) {
return adresse;
}
getSurface() {
if(this.state.estimation.bien==="appartement"){
let surfaceHabitable = this.state.estimation.surfacehabitable
let parking = this.state.estimation.parking
let placesparking = this.state.estimation.placesparking
let cave = this.state.estimation.surfacecave
let balcon = this.state.estimation.surfacebalcon
let surfaceUtile
if (parking === 1) {
surfaceUtile = surfaceHabitable + (cave + balcon) / 2 + placesparking * 6
}
else {
surfaceUtile = surfaceHabitable + (cave + balcon) / 2
}
return surfaceUtile;
}
else return this.state.estimation.surfaceterrain
}
getTypeChauffage(){
if(this.state.estimation.typechauffage===0){
return "Chaffage électrique"
}
if(this.state.estimation.typechauffage===1){
return "Chaudière centrale au fuel"
}
if(this.state.estimation.typechauffage===2){
return "Chaudière centrale au gaz"
}
if(this.state.estimation.typechauffage===3){
return "Pompe à chaleur"
}


}
getConstruction(){
if(this.state.estimation.construction ===-1){
return "Date de construction inconnue"
}
if(this.state.estimation.construction ===4){
return "Construction neuve"
}
if(this.state.estimation.construction ===0){
return "Bien construit il y a moins de cinq ans"
}
if(this.state.estimation.construction ===3){
return "Bien construit il y a moins de dix ans"
}
if(this.state.estimation.construction ===1){
return "Construction datant d'entre 10 et 20 ans "
}
if(this.state.estimation.construction ===2){
return "Construit il y a plus de 20 ans"
}


}
formatEtat(){
if(this.state.estimation.finition ==="correct"){
return "État correct"
}
if(this.state.estimation.finition ==="travauxaprevoir"){
return "Travaux à prévoir"
}
if(this.state.estimation.finition ==="refaitaneuf"){
return "Refait à neuf"
}
return("État correct")
}

formatTypologie(typologie) {
if (typologie === 1) {
return "'une chambre"
}
else {
return `e ${typologie} chambres`
}
}
formatEtage(etage) {
if (etage === 0) {
return "rez-de-chaussée"
}
if (etage === 1) {
return "premier étage"
}
else {
return `${etage}ème étage`
}
}
formatEtageAnnonce(etage) {
if (etage === 0) {
return "Rez-de-chaussée"
}
if (etage === 1) {
return "Premier étage"
}
else {
return `${etage}ème étage`
}
}
selectAnnonce = (num) => {
this.setState({annonces_selected : [...this.state.annonces_selected, num]})
}
unSelectAnnonce = (num) => {
this.setState({annonces_selected : this.state.annonces_selected.filter(number => number !== num)})
}
selectTransaction = (num) => {
this.setState({transactions_selected : [...this.state.transactions_selected, num]})
}
unSelectTransaction = (num) => {
this.setState({transactions_selected : this.state.transactions_selected.filter(number => number !==num)})
}

getTypeVilla(type){
if (type==="villajumelee"){
return "Villa jumelée"
}
else {
return "Villa en bande"
}
}

formatTypologieItem(typologie) {
if (typologie === 1) {
return "1 Chambre"
}
else {
return `${typologie} Chambres`
}
}
formatConstruction(construction,bien){
    if(bien==="appartement"){
        if (parseInt(construction) <= 5){
            if (parseInt(construction)===-1){
                return ""
            }
            else if (parseInt(construction)===0){
                return "Entre 1 et 5 ans"
            }

            else if (parseInt(construction)===1){
                return "Entre 11 et 20 ans"
            }

            else if (parseInt(construction)===2){
                return "Il y a plus de 20 ans"
            }

            else if (parseInt(construction)===3){
                return "Entre 5 et 10 ans"
            }

            else if (parseInt(construction)===4){
                return "Neuve"
            }
        }
        else{
            return construction;
        }
    }
    else{
                if (parseInt(construction) <= 5){
            if (parseInt(construction)===-1){
                return ""
            }
            else if (parseInt(construction)===0){
                return "Neuve"
            }
            else if (parseInt(construction)===1){
                return "Entre 1 et 5 ans"
            }
            else if (parseInt(construction)===2){
                return "Entre 5 et 10 ans"
            }

            else if (parseInt(construction)===3){
                return "Entre 11 et 20 ans"
            }

            else if (parseInt(construction)===4){
                return "Il y a plus de 20 ans"
            }
        }
        else{
            return construction;
        }

    }
}




render() {
moment.locale('fr');
const style = {
position : 'relative',
width: '100%',
height: '100%',
minHeight : '250px'
}
const containerStyle = {
position: 'relative',  
width: '100%',
height: '100%',
minHeight : '250px'

}
let surfaceeffective = 1;
if (this.state.estimation.parking) {
surfaceeffective = this.state.estimation.surfacehabitable + (this.state.estimation.surfacecave + this.state.estimation.surfacebalcon + this.state.estimation.placesparking * 12) / 2
}
else {
surfaceeffective = this.state.estimation.surfacehabitable + (this.state.estimation.surfacecave + this.state.estimation.surfacebalcon) / 2
}


let restauCount = 0;
let pharmaCount = 0;

let superMCount = 0;
let autreCount = 0;
if (this.state.rapport.places_found){
const restau = this.state.rapport.places_found.filter(item => item.type === 'Restaurant');
 restauCount = restau.length;
const pharma = this.state.rapport.places_found.filter(item => item.type === 'Pharmacie');
 pharmaCount = pharma.length;
const hot = this.state.rapport.places_found.filter(item => item.type === 'Hôtel');
 let hotCount = hot.length;
const banq = this.state.rapport.places_found.filter(item => item.type === 'Banque');
 let banqCount = banq.length;
const superM = this.state.rapport.places_found.filter(item => item.type === 'Supermarché');
 superMCount = superM.length;
const autre = this.state.rapport.places_found.filter(item => item.type === '');
 autreCount = autre.length;
}

const dataPolar = {
labels: ['Restaurants', 'Pharamacies', 'Supermarchés'],
datasets: [
{
label: 'Commerces à moins de 500 mètres du bien',
data: [restauCount, pharmaCount, superMCount],
backgroundColor: [
'rgba(243, 243, 243, 0.52)',
'rgba(243, 243, 243, 0.52)',
'rgba(243, 243, 243, 0.52)',
'rgba(243, 243, 243, 0.52)'
],
borderWidth: 1,
},
],
}
const options = {
legend: {
display: false,
labels: {
fontColor: 'rgb(255, 99, 132)'
}
}
}
return (
<>

<div className="root-container">
<div>
<ThemeProvider theme={theme}>

{
this.state.loadingPage ? (
<div className="loader">
<Spinner animation="border" variant="primary" size="lg" />
<div className="estimation-top-side">
<h1 className="loader-h1">Chargement...</h1>
</div>
</div>
) : (
<div> 

<>
<div>
<div className="show-results show-results-pro">
<div>



<div className="results-top-side">
<>
<div id="root-container" className="root--container-report">
    
<ThemeProvider theme={theme}>
 <div id="pdf--first-page">
<div className="head">
<div className="head--img">
<img src={this.state.agence.user_image} alt="Rapport d'estimation généré automatiquement par agenz - Expert de l'immobilier et éditeur de rapport d'évaluation de biens immobiliers au maroc" />
</div>
<div className="head--agence">
<h3 className="head--agence-name">{this.state.agence.nameEntreprise}</h3>
<p className="head--agence-detail">{this.state.agence.phoneEntreprise}</p>
<p className="head--agence-detail">{this.state.agence.addressEntreprise}</p>
<p className="head--agence-detail">{this.state.agence.emailEntreprise}</p>

</div>
</div>
<div className="report--header">
<h1 className="report--title">Rapport d'évaluation</h1>
{this.state.rapport.reference==="" ? ('') : (
<>
<p className="folder--ref"> <span className="ref--title">Référence du dossier : </span> <span className="ref--data">{this.state.rapport.reference}</span></p>                                                                           <h3 className="report--subtitle"> Synthèse du Rapport </h3>
</>
)}
{this.state.estimation.bien==="appartement" ? (
<p className="report-synthesis">Appartement situé au {this.formatEtage(this.state.estimation.etage)}, {this.state.rapport.addresseForcee && this.state.rapport.addresseForcee!=="" ?  (this.state.rapport.addresseForcee) :  (this.state.estimation.adresse)} composé d{this.formatTypologie(this.state.estimation.typologie)} d'une surface vendable de {this.getSurface()} m<sup>2</sup> </p>

) : (
<p className="report-synthesis">Villa située {this.state.rapport.addresseForcee && this.state.rapport.addresseForcee!=="" ?  (this.state.rapport.addresseForcee) :  (this.state.estimation.adresse)} d'une surface construite de {parseInt(this.state.estimation.surfaceconstruite)} m<sup>2</sup> sur un terrain de {parseInt(this.state.estimation.surfaceterrain)} m<sup>2</sup> </p>
)}


{this.state.estimation.bien==="appartement" ? 
(
<>
<div className="synthese--format" id="synthese--format">

<div className="synthese--item-container"> 
<i class="fas fa-building"></i><p className="synthese--item">Appartement</p>
</div>
<div className="synthese--item-container"> 
<i class="fas fa-ruler-combined"></i><p className="synthese--item">{surfaceeffective} m<sup>2</sup> de surface vendable</p>
</div>
<div className="synthese--item-container"> 
<i class="fas fa-bed"></i><p className="synthese--item">{this.formatTypologieItem(this.state.estimation.typologie)}</p>
</div>

<div className="synthese--item-container"> 
<i class="fas fa-map-marked-alt"></i><p className="synthese--item synthese--item-adresse">{this.state.rapport.addresseForcee && this.state.rapport.addresseForcee!=="" ? (this.state.rapport.addresseForcee) : (this.state.estimation.adresse)}</p>
</div>   
</div>
</>                                                                         
) 
: (
<>
<div className="synthese--format" id="synthese--format">

<div className="synthese--item-container"> 
<i class="fas fa-house-user"></i><p className="synthese--item">Villa</p>
</div>
<div className="synthese--item-container"> 
<i class="fas fa-ruler-combined"></i> <p className="synthese--item">{this.state.estimation.surfaceterrain} m<sup>2</sup> de terrain</p>
</div>
<div className="synthese--item-container"> 
<i class="fas fa-bed"></i><p className="synthese--item">{this.formatTypologieItem(this.state.estimation.typologie)}</p>
</div>

<div className="synthese--item-container"> 
<i class="fas fa-map-marked-alt"></i><p className="synthese--item synthese--item-adresse">{this.state.rapport.addresseForcee && this.state.rapport.addresseForcee!=="" ? (this.state.rapport.addresseForcee) : (this.state.estimation.adresse)}</p>
</div> 
</div>
</>
)}


</div>
<div className="report--first-container">
<Grid container spacing={1}>
<Grid item md={12} xs={12}>
<h4>Estimation du prix net vendeur réalisée le {moment(this.state.estimation.date).locale("fr").format('LL')} </h4>
<p className="price--report">{this.state.rapport.prix_force ? <NumberFormat displayType={'text'} value={Math.round(this.state.rapport.prix_force)} thousandSeparator={" "}/> : <NumberFormat displayType={'text'} value={Math.round(this.state.estimation.estimation)} thousandSeparator={" "}/>  } MAD</p>
<span className="intermediate--price">soit</span>
<p className="square--price--report">{this.state.rapport.prix_force ? <NumberFormat displayType={'text'} value={Math.round(this.state.rapport.prix_force/this.getSurface())} thousandSeparator={" "}/> :<NumberFormat displayType={'text'} value={Math.round(this.state.estimation.estimation/this.getSurface())} thousandSeparator={" "}/> } MAD/m<sup>2</sup></p>
{this.state.rapport.raison_prix==="" ? ('') : (
<p className="note--agence-prix">Note de l'agence : <span className="note--agence-display">{this.state.rapport.raison_prix}</span></p>
)}
</Grid>
</Grid>


</div>

{this.state.rapport.add_rent ? (
<div className="report--first-container">
<Grid container spacing={1}>
<Grid item md={12} xs={12}>
<h4>Estimation du prix de location réalisée le {moment(this.state.estimation.date).locale("fr").format('LL')} </h4>
<p className="price--report">{this.state.rapport.rent_force ? <NumberFormat displayType={'text'} value={Math.round(this.state.rapport.rent_force)} thousandSeparator={" "}/> : <NumberFormat displayType={'text'} value={Math.round(this.state.rapport.rent)} thousandSeparator={" "}/>  } MAD / Mois</p>
{this.state.raison_rent ? (
this.state.rapport.raison_rent==="" ? ('') : (
<p className="note--agence-prix">Note de l'agence : <span className="note--agence-display">{this.state.rapport.raison_rent}</span></p>
)) : ('')}
</Grid>
</Grid>


</div>



) : ('')}
</div>

<Grid container spacing={1}>
<div id="pdf--second-page">
<div className="detailed--cards">
<div id="detailed--cards">
<Grid container spacing={1}>
<Grid item md={6} xs={12}>
<h4 className="detailed--card-title">Informations détaillées</h4>

<div className="detailed--card-info">

<List component="nav" aria-label="main mailbox folders">
{this.state.estimation.bien==="appartement" ?(
<>
<ListItem >
<ListItemIcon>
<i class="fas fa-ruler-combined"></i>

</ListItemIcon>
<ListItemText>Surface habitable : {this.state.estimation.surfacehabitable} m<sup>2</sup></ListItemText>
</ListItem>
</>

)
: (
<>
<ListItem >
<ListItemIcon>
<i class="fas fa-ruler-combined"></i></ListItemIcon>
<ListItemText>Surface du terrain : {this.state.estimation.surfaceterrain} m<sup>2</sup></ListItemText>
</ListItem>
<ListItem >
<ListItemIcon>
<i class="fas fa-ruler-combined"></i></ListItemIcon>
<ListItemText>Surface construite : {this.state.estimation.surfaceconstruite} m<sup>2</sup></ListItemText>
</ListItem>
</>
)
}


{this.state.estimation.parking===1 ?(
<ListItem >
<ListItemIcon>
<i class="fas fa-parking"></i>
</ListItemIcon>
<ListItemText>{this.state.estimation.placesparking===1 ? "Une place de parking titrée" : (`${this.state.estimation.placesparking} places de parking titrées`)}</ListItemText>
</ListItem>

) :('')}

{this.state.estimation.cave===1 ?(

<ListItem >
<ListItemIcon>
<i class="fas fa-box-open"></i></ListItemIcon>
<ListItemText>Box ou cave en sous-sol de {this.state.estimation.surfacecave} m<sup>2</sup></ListItemText>
</ListItem>
) : ('')
}
{this.state.estimation.balcon===1 ?(

<ListItem >
<ListItemIcon>
<i class="far fa-plus-square"></i></ListItemIcon>
<ListItemText>Balcons et terrasses {this.state.estimation.surfacebalcon} m<sup>2</sup></ListItemText>
</ListItem>
) : ('')
}
<ListItem >
<ListItemIcon>
<i class="fas fa-tools"></i></ListItemIcon>
<ListItemText>{this.getConstruction()}</ListItemText>
</ListItem>
{this.state.estimation.construction === 4 ? ('') :(
<ListItem >
<ListItemIcon>
<i class="fas fa-star-half-alt"></i></ListItemIcon>
<ListItemText>{this.formatEtat()}</ListItemText>
</ListItem>
)}
</List>
</div>
</Grid>
<Grid item md={6} xs={12}>
<h4 className="detailed--card-title">Caractéristiques du bien</h4>

<div className="detailed--card-carac">
<List component="nav" aria-label="main mailbox folders">

{this.state.estimation.duplex===1 ?(

<ListItem >
<ListItemIcon>
<i class="fas fa-check"></i>
</ListItemIcon>
<ListItemText>Duplex</ListItemText>
</ListItem>
) : ('')
}
{this.state.estimation.calme===1 ?(
<ListItem >
<ListItemIcon>
<i class="fas fa-check"></i>
</ListItemIcon>
<ListItemText>Calme</ListItemText>
</ListItem>

) :('')}

{this.state.estimation.vueexceptionnelle===1 ?(

<ListItem >
<ListItemIcon>
<i class="fas fa-check"></i></ListItemIcon>
<ListItemText>Sans vis-à-vis</ListItemText>
</ListItem>
) : ('')
}
{this.state.estimation.cheminee===1 ?(

<ListItem >
<ListItemIcon>
<i class="fas fa-check"></i></ListItemIcon>
<ListItemText>Cheminée</ListItemText>
</ListItem>
) : ('')
}
{this.state.estimation.garage===1 ?(

<ListItem >
<ListItemIcon>
<i class="fas fa-check"></i></ListItemIcon>
<ListItemText>Garage</ListItemText>
</ListItem>
) : ('')
}

{this.state.estimation.piscine===1 ?(

<ListItem >
<ListItemIcon>
<i class="fas fa-check"></i>
</ListItemIcon>
<ListItemText>Piscine</ListItemText>
</ListItem>
) : ('')
}
{this.state.estimation.ascenseur===1 ?(

<ListItem >
<ListItemIcon>
<i class="fas fa-check"></i>
</ListItemIcon>
<ListItemText>Ascenseur</ListItemText>
</ListItem>
) : ('')
}
{this.state.estimation.climatisation===1 ?(

<ListItem >
<ListItemIcon>
<i class="fas fa-check"></i></ListItemIcon>
<ListItemText>Climatisation</ListItemText>
</ListItem>
) : ('')
}
{this.state.estimation.chambreservice===1 ?(

<ListItem >
<ListItemIcon>
<i class="fas fa-check"></i></ListItemIcon>
<ListItemText>Chambre de service</ListItemText>
</ListItem>
) : ('')
}
{this.state.estimation.concierge===1 ?(

<ListItem >
<ListItemIcon>
<i class="fas fa-check"></i></ListItemIcon>
<ListItemText>Résidence fermée et sécurisée</ListItemText>
</ListItem>
) : ('')
}
{this.state.estimation.murmitoyen===1 ?(

<ListItem >
<ListItemIcon>
<i class="fas fa-check"></i></ListItemIcon>
<ListItemText>Murs mitoyens : {this.getTypeVilla(this.state.estimation.typeVilla)}</ListItemText>
</ListItem>
) : ('')
}
{this.state.estimation.chaufeausolaire===1 ?(

<ListItem >
<ListItemIcon>
<i class="fas fa-check"></i></ListItemIcon>
<ListItemText>Chauffe eau solaire</ListItemText>
</ListItem>
) : ('')
}
{this.state.estimation.typechauffage!=-1 ?(

<ListItem >
<ListItemIcon>
<i class="fas fa-check"></i></ListItemIcon>
<ListItemText> {this.getTypeChauffage()}</ListItemText>
</ListItem>
) : ('')
}
{this.state.estimation.bien ==="appartement" ?(
<>

<ListItem >
<ListItemIcon>
</ListItemIcon>
<div className="item--luminosite">
<StarPicker disabled={true} value={this.state.estimation.luminosite} numberStars={4} size={25}/>
{
this.state.luminosite === 1 ? (
<div className="star-rating">Faiblement ensoleillé</div>
) : this.state.luminosite === 2 ? (
<div className="star-rating">Ensoleillé</div>
) : this.state.luminosite === 3 ? (
<div className="star-rating">Très ensoleillé</div>
) : (
<div className="star-rating">Très ensoleillé toute la journée</div>
)
}
</div>
</ListItem>
<ListItem >
<ListItemIcon>
</ListItemIcon>

<div className="item--agencement">
<StarPicker disabled={true} value={this.state.estimation.agencement} numberStars={4} size={25}/>
{
this.state.agencement === 1 ? (
<div className="star-rating">Simple, entrée de gamme</div>
) : this.state.agencement === 2 ? (
<div className="star-rating">Normal, milieu de gamme</div>
) : this.state.agencement === 3 ? (
<div className="star-rating">Qualitatif, matériaux haut de gamme</div>
) : (
<div className="star-rating">Luxe, matériaux d’exception</div>
)
}
</div>
</ListItem>
</>

) : ('')}


</List>

</div>
</Grid>

</Grid>
</div>
{this.state.rapport.add_prix_ancfcc ? (
<div className="second--container">
<Grid container spacing={1}>
<div className="third--container-title">
<h3 className="report--subtitle"> Référentiel fiscal </h3>
</div>
<Grid item xs={12}>
<Card variant="outlined">
<CardContent>
<p className="zone--listing">Le bien se situe dans la zone <span className="zone">{this.state.estimation.zone}</span> du référentiel de l'ANCFCC</p>
<p className="prix__zone">Le prix moyen indiqué par l'ANCFCC pour {this.state.estimation.bien==="appartement" ? ('un appartement') : ('une villa')} dans cette zone est de <span className="span--prix"><NumberFormat displayType={'text'} value={Math.round(this.state.rapport.prix_ancfcc)} thousandSeparator={" "}/></span> MAD </p>
<p className="attention__ancfcc">Attention : cette donnée n'a pas été actualisé pour le grand public depuis <span className="date--actualisation">2019</span></p>
</CardContent>
</Card>
</Grid>
</Grid>
</div> ) : '' }
</div>
</div>
{/*
<div>
<div className="third--container">
<Grid container spacing={1}>
<div className="third--container-title">
<h3 className="report--subtitle"> Localisation du bien </h3>
</div>
<div className="rapport-map-container localisation-map--container">
                <img alt="Localisation du bien vue satellite"
                src={`https://api.mapbox.com/styles/v1/badrbelkeziz/ckqgtcbqn05nv17nzmxhff2wd/static/pin-s+102556(${this.state.rapport.localisation.split("lng : ")[1]},${this.state.rapport.localisation.split("lat : ")[1].split(" ")[0]})/${this.state.rapport.localisation.split("lng : ")[1]},${this.state.rapport.localisation.split("lat : ")[1].split(" ")[0]},14,0/826x450?access_token=pk.eyJ1IjoiYmFkcmJlbGtleml6IiwiYSI6ImNraDduNjN2bDA2MGszMG5zZHRqNm5zMzIifQ.oITjlONmSiUQsFKrZfFd3w`} />

                
            </div>
*/}

<div className="price-legend--container" id="price-legend">
    <PriceBarComponent zomm={14} />
</div>
{/*
<div className="map-2">
<Grid item xs={12}>
<div className="rapport-map-container localisation-map--container">
                <img alt="Localisation du bien vue satellite"
                src={`https://api.mapbox.com/styles/v1/badrbelkeziz/ckqgutxx9de3o18nqnfggnnnf/static/pin-s+102556(${this.state.rapport.localisation.split("lng : ")[1]},${this.state.rapport.localisation.split("lat : ")[1].split(" ")[0]})/${this.state.rapport.localisation.split("lng : ")[1]},${this.state.rapport.localisation.split("lat : ")[1].split(" ")[0]},14,0/826x450?access_token=pk.eyJ1IjoiYmFkcmJlbGtleml6IiwiYSI6ImNraDduNjN2bDA2MGszMG5zZHRqNm5zMzIifQ.oITjlONmSiUQsFKrZfFd3w`} />

                
            </div>
      </Grid>

</div>



</Grid>
</div>
</div>

<div id="pdf--fourth-page">
<div className="price-evolution--container">
<Grid container spacing={1}> */}

<Grid item xs={12}>
<h3 className="price--evolution-title report--subtitle">Évolution du prix du bien</h3>
<LineChart ref={this.lineRef} estimation={this.state.rapport.prix_force ?
(this.state.rapport.prix_force ==="" ? this.state.estimation.estimation : parseInt(this.state.rapport.prix_force)) : 
this.state.rapport.estimation} />
</Grid>
{/*
</Grid>
</div>
</div>
<div id="pdf--fifth-page">
{this.state.rapport.annonces_selected.length >0 || this.state.rapport.transactions_selected.length >0 ? ( 
<div className="fourth--container">
<Grid container spacing={1}>
<div className="third--container-title">
<h3 className="report--subtitle"> Biens comparables </h3>
<p className="radius-subtitle">Les biens comparables dans un rayon de 500 mètres autour du bien </p>
</div>
<div className="rapport-map-container localisation-map--container">
                <img alt="Transactions à proximité du bien"
                src={this.state.mapBoxTransactionsUrl} />

                
            </div>
<TransactionListComponent transactions={this.state.rapport.transactions_selected} />

<div className="rapport-map-container localisation-map--container">
                <img alt="Transactions à proximité du bien"
                src={this.state.mapBoxAnnoncesUrl} />

                
            </div>


<AnnonceListComponent annonces={this.state.rapport.annonces_selected} bien={this.state.estimation.bien} />
</Grid>
</div>
) : ('')
}
</div>

{this.state.rapport.projects_found.length > 0  ? (
<div id="pdf--fifth-page-bis">

<div className="fifth--container">
            <Grid container spacing={1}>
        <div className="third--container-title">
        <h3 className="report--subtitle"> Projets de construction à proximité </h3>
        <p className="radius-subtitle">Les permis de construire délivrés dans un rayon de 500 mètres autour du bien</p>
        <div className="rapport-map-container localisation-map--container">
                <img alt="Transactions à proximité du bien"
                src={this.state.mapBoxProjectsUrl} />

                
            </div>
        <p class="radius-subtitle"></p>
                        </div>

{this.state.rapport.projects_selected.map((row,index)=>{
    return(
<Grid item xs={12}>
<div className="transac-content">

<Card variant="outlined">
<CardContent>
<div className="annonce-content">
<p className="desc--annonce">Projet : {row.projet} à {row.distance} mètres</p>
<p className="prix--annonce">Description : {row.description==="0" ? ("Inconnue") : row.description } </p>
<p className="prix--annonce prix-m2"> <NumberFormat displayType={'text'} value={Math.round(row.surface)} thousandSeparator={" "}/> m² </p>
<p className="date--annonce">{row.prefecture}{" "}{row.arrondissement}</p>       
<p className="date--annonce"> Date d'autoristion : {moment(row.date).format("LL")} </p>
{row.code!=="0" ? (<p className="prix--annonce">Numéro d'autorisation : {row.code} </p>) : ("")}      


</div>
</CardContent>

</Card>
</div>

</Grid>
    )
})}


        </Grid>

        </div>
        </div>
        ):("")
}




</Grid>
{this.state.rapport.places_selected ? (
 <div id="pdf--third-page">

<Grid item xs={12}>
<h3 className="report--subtitle">Commerces et services</h3>

<div className="rapport-map-container localisation-map--container">
                <img alt="Commerces à proximité du bien"
                src={this.state.mapBoxPlacesUrl} />

                
            </div>
<Card variant="outlined">
<CardContent>
{/* <div className="places--content">
<p className="place--display"><span className="count">{restauCount}</span> Restaurants à proximité de {this.state.estimation.bien==="appartement" ? 'votre appartement' : 'votre villa'}  </p>
<p className="place--display"><span className="count">{pharmaCount}</span> Pharmacies à proximité de {this.state.estimation.bien==="appartement" ? 'votre appartement' : 'votre villa'}  </p>
<p className="place--display"><span className="count">{superMCount}</span> Supermarchés à proximité de {this.state.estimation.bien==="appartement" ? 'votre appartement' : 'votre villa'}  </p>
<p className="place--display"><span className="count">{autreCount}</span> Autres commerces de proximités proches de {this.state.estimation.bien==="appartement" ? 'votre appartement' : 'votre villa'}  </p> 
</div>
<div className="places__chart">*/}
{/* <Radar data={dataPolar} options={options} ref={this.radarRef}/> */}

{/* </div>  */}
 <PlaceRating nombre_restaurants={this.state.rapport.nombre_restaurants} note_restaurants={this.state.rapport.note_restaurants}
nombre_pharmacies={this.state.rapport.nombre_pharmacies} note_pharmacies={this.state.rapport.note_pharmacies}
nombre_supermarches={this.state.rapport.nombre_supermarches} note_supermarches={this.state.rapport.note_supermarches} 
nombre_ecoles={this.state.rapport.nombre_ecoles} note_ecoles={this.state.rapport.note_ecoles}
list_ecoles={this.state.rapport.list_ecoles}
list_pharmacies={this.state.rapport.list_pharmacies}
list_restaurants={this.state.rapport.list_restaurants}
list_supermarches={this.state.rapport.list_supermarches}
/>
{/*
</CardContent>
</Card>
</Grid>
</div> ) : ('') }

<div id="pdf--sixth-page">

{
this.state.rapport.images ? (
this.state.rapport.images.length>0 ? (
<div className="pictures--container">
<h3 className="report--subtitle pictures-title"> Photos du bien</h3>
<Grid container spacing={1}>
{this.state.rapport.images.map((image,index) => { 
return (
<Grid item xs={12} md={6}> 
<img className="report--picture" alt="Estimation d'un bien immobilier en ligne au Maroc" src={image} />
</Grid>
)

})
}

</Grid>
</div>) : ('')
) : ('')
}
</div> */} 

{this.state.rapport.places_selected ? (
    this.state.PDFReady ? (
            !this.state.loadingPDF && <div className="pdf--download-button">
<PDFDownloadLink document={<MyDocument
list_ecoles = {this.state.rapport.list_ecoles}
list_restaurants = {this.state.rapport.list_restaurants}
list_pharmacies = {this.state.rapport.list_pharmacies}
list_supermarches = {this.state.rapport.list_supermarches}
projects = {this.state.rapport.projects_selected}
projectsURL = {this.state.mapBoxProjectsUrl}
mapPlaceUrl={this.state.mapBoxPlacesUrl}
mapBoxTransactionsUrl = {this.state.mapBoxTransactionsUrl}
mapBoxAnnoncesUrl = {this.state.mapBoxAnnoncesUrl}
svgRestaurants = {this.state.svgRestaurants}
svgEcoles = {this.state.svgEcoles}
svgPharmacies = {this.state.svgPharmacies}
svgSupermarches = {this.state.svgSupermarches}
screenRestaurants={this.state.screenRestaurants}
screenEcoles={this.state.screenEcoles}
screenPharmacies={this.state.screenPharmacies}
screenSupermarches={this.state.screenSupermarches}
screenLegend={this.state.screenLegend}
pharmaCount={this.state.rapport.places_found.filter(item => item.type === 'Pharmacie').length}
restauCount={this.state.rapport.places_found.filter(item => item.type === 'Restaurant').length}
superMCount={this.state.rapport.places_found.filter(item => item.type === 'Supermarché').length}
autreCount={this.state.rapport.places_found.filter(item => item.type === '').length}
lng={parseFloat(`${this.state.rapport.localisation.split("lng : ")[1]}`)}
lat={parseFloat(`${this.state.rapport.localisation.split("lat : ")[1].split(" ")[0]}`)}
rapport={this.state.rapport} estimation={this.state.estimation} agence={this.state.agence} 
syntheseUrlFirstPage={this.state.syntheseUrlFirstPage} syntheseUrlThirdPage={this.state.syntheseUrlThirdPage}
syntheseUrlSecondPage={this.state.syntheseUrlSecondPage} syntheseUrlFourthPage={this.state.syntheseUrlFourthPage}
syntheseUrlFifthPage={this.state.syntheseUrlFifthPage} date={moment(this.state.estimation.date).format('LL')}/>}
fileName={`Rapport d'estimation ${this.state.agence.nameEntreprise} ${this.state.rapport.reference}.pdf`}>
{({ blob, url, loading, error }) => (loading ? <><Spinner animation="border" variant="primary" size="lg" /> <p className="text--download-link">Création du lien de téléchargement (Cela peut prendre quelques minutes)</p></> : 'Télécharger en PDF')}
</PDFDownloadLink>
</div> ) : ( 
    <div className="pdf--download-button">
        {this.state.loadingPDF ? (
        <button className="button button-primary"><Spinner animation="border" variant="primary" size="lg" /> </button>) : (
    <button className="button button-primary" onClick={() => {
        this.setState({loadingPDF : true});
        this.preparePDF()}}>
Générer en pdf</button>
) }
    </div>
)
)
:("") }
</Grid>
</ThemeProvider>



</div>
</>

</div>
</div>
</div>
</div>

</>


</div>
)
}
</ThemeProvider>

</div>

</div>

</>
);
}
}

const mapStateToProps = (state) => {
return {
    config: state.config,
};
};

export default connect(mapStateToProps)(Rapport);



Font.register({
family: 'Montserrat',
src: font
})
Font.register({
    family: 'MontserratBold',
    src: fontBold
    })
    Font.register({
        family: 'MontserratMedium',
        src: fontMedium
        })
        Font.register({
            family: 'MontserratItalic',
            src: fontItalic
            })
    
const styles = StyleSheet.create({
body: {
paddingTop: 15,
paddingBottom: 80,
paddingHorizontal: 45,
fontFamily : 'Montserrat'

},
title: {
fontSize: 24,
textAlign: 'center',
justifyContent : 'center',
fontFamily : 'Montserrat'
},
page: {
flexDirection: 'row',
backgroundColor: '#ffffff'
},
section: {
margin: 10,
padding: 10,
flexGrow: 1
},
image : {
height : "auto",
width : "50vw"
},
imageCanvas : {
paddingTop : '2vh',
paddingHorizontal: 45,
height : "auto",
width : "100%",
maxWidth  : '95%',
maxHeight : '100%'
},

imageCanvasNote : {
    paddingTop : '2vh',
    paddingHorizontal: 45,
    height : "auto",
    width : "100pt",
    maxWidth  : '50%',
    maxHeight : '80%'
    },
agenceName : {
fontSize : "26pt",
fontFamily : 'Montserrat',
paddingTop : "13pt"

},
rapportTitle : {
    fontSize : "26pt",
    fontFamily : 'Montserrat',
    paddingTop : "13pt",
    fontWeight : '600'
    },
agenceDetail : {
fontSize : "14pt",
fontFamily : 'Montserrat',
paddingBottom : "13pt"

},
syntheseDetail : {
    fontSize : "14pt",
    fontFamily : 'Montserrat',
        textAlign: 'center',
    },
referenceDetail : {
fontSize : "14pt",
fontFamily : 'Montserrat',
marginBottom : '10',
textAlign: 'center',
},
SyntheseTitle : {
fontSize : "26pt",
fontFamily : 'Montserrat',
marginTop : '40',
textAlign: 'center',


},
pageFooterDate: {
    fontSize: '6pt',
    fontFamily : 'MontserratMedium',

  },
  pageFooterLeft: {
    fontSize: '6pt',
    justifyContent :'right',
    width : '60%',
    textAlign: 'left',
    color: 'black',
    paddingTop : '10pt'
  },
  pageFooter : {
    flexDirection: 'row',
    position: 'absolute',
  bottom: 30,
	left: 0,
  marginHorizontal: '5vw',
    width : '90vw',
  borderTop : "1pt solid grey",
  },
  pageFooterRight: {
    fontSize: '6pt',
    fontWeight : '600',
    width : '19%',
    justifyContent : 'right',
    textAlign: 'right',
    color: 'black',
    paddingTop : '10pt',

  },
  PhotoTitle : {
    fontFamily : 'MontserratBold',
    fontSize : 12,
    color : '#39454f',
    textAlign : 'center',
    fontWeight : '800',
    paddingTop : '20pt'
  },
  CommercesTitle : {
    fontFamily : 'MontserratBold',
    fontSize : 11,
    color : '#39454f',
    textAlign : 'center',
    fontWeight : '600',
    paddingTop : '5pt'
  },
  PhotoSubTitle : {
    fontFamily : 'MontserratMedium',
    fontSize : 12,
    color : '#39454f',
    textAlign : 'center',
    paddingTop : '10pt'
  },
  listingTitle : {
    fontFamily : 'MontserratMedium',
    fontSize : 11,
    color : '#39454f',
    textAlign : 'left',
    paddingTop : '3pt'
  },
  listingPrice : {
    fontFamily : 'MontserratBold',
    fontSize : 10,
    color : '#39454f',
    textAlign : 'left',
    paddingTop : '3pt'
  },
  listingPriceM2 : {
    fontFamily : 'MontserratBold',
    fontSize : 9,
    color : '#39454f',
    textAlign : 'left',
    paddingTop : '3pt'
  },
  listingDate : {
    fontFamily : 'MontserratMedium',
    fontSize : 9,
    color : '#39454f',
    textAlign : 'left',
    paddingTop : '3pt'
  },
  listingQuartier : {
    fontFamily : 'MontserratMedium',
    fontSize : 9,
    color : '#39454f',
    textAlign : 'left',
    paddingTop : '3pt'
  },
  listingSource : {
    fontFamily : 'MontserratMedium',
    fontSize : 6,
    color : '#39454f',
    textAlign : 'left',
    paddingTop : '3pt'
  },
  imageHeader : {
      height : '12pt',
      width : '50.46pt',
  },
  referenceHeader : {
    fontSize: '6pt',
    fontFamily : 'MontserratMedium',
},
  pageHeader : {
    flexDirection: 'row',
	left: '-2.5vw',
    width : '90vw',
  borderBottom : "1pt solid grey",
  paddingBottom : '5p'
  },
  pageHeaderRight: {
    fontSize: '6pt',
    fontWeight : '600',
    width : '19%',
    justifyContent : 'right',
    textAlign: 'right',
    color: 'black',
    paddingTop : '5pt',

  },
  pageHeaderLeft: {
    fontSize: '6pt',
    justifyContent :'right',
    width : '80%',
    textAlign: 'left',
    color: 'black',
    paddingTop : '5pt'
  },
  listingTransactionView : {
    marginTop : '5pt',
    borderColor : 'indianred',
    borderWidth : '2pt',
    padding : '8pt',
    borderTopLeftRadius: '8pt',
	borderTopRightRadius: '8pt',
	borderBottomRightRadius: '8pt',
	borderBottomLeftRadius: '8pt'
  },
  listingAnnonceView : {
    marginTop : '5pt',
    borderColor : 'grey',
    borderWidth : '1pt',
    padding : '8pt',
    borderTopLeftRadius: '8pt',
	borderTopRightRadius: '8pt',
	borderBottomRightRadius: '8pt',
	borderBottomLeftRadius: '8pt'
  },
  
  imageNote: {
    marginVertical: 'auto',
    width : '10vw'
   },
   imagePlaceText: {
    // marginVertical: 'auto',
    width : '80vw'
   },

  PlacesContainer :{
  width : '80vw'
},
  PlaceRowOne : {
    width : "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "stretch",
    flexWrap: "nowrap",
    alignItems: "stretch",
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 35
  },
  PlaceName : {
    fontSize: '6pt',
    fontFamily : 'MontserratMedium',
        flexGrow: 1,
    flexShrink: 1,
    flexBasis: "auto",
    alignSelf: "stretch",
  },
  PlaceAdresse : {
    fontSize: '6pt',
    fontFamily : 'MontserratMedium',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "auto",
    alignSelf: "stretch"  },

  ViewPlaces : {
    flexDirection : "row",
    display : "flex"
    // width : '100vw'
  
},
PlaceTitle : {
    paddingTop : '20pt',
    fontFamily : 'MontserratMedium',
    fontSize : 11,
    color : '#39454f',
    textAlign : 'left',
    paddingTop : '30pt'
  }


});
const formatConstruction = (construction,bien) =>{
    if(bien==="appartement"){
        if (parseInt(construction) <= 5){
            if (parseInt(construction)===-1){
                return ""
            }
            else if (parseInt(construction)===0){
                return "Entre 1 et 5 ans"
            }

            else if (parseInt(construction)===1){
                return "Entre 11 et 20 ans"
            }

            else if (parseInt(construction)===2){
                return "Il y a plus de 20 ans"
            }

            else if (parseInt(construction)===3){
                return "Entre 5 et 10 ans"
            }

            else if (parseInt(construction)===4){
                return "Neuve"
            }
        }
        else{
            return construction;
        }
    }
    else{
                if (parseInt(construction) <= 5){
            if (parseInt(construction)===-1){
                return ""
            }
            else if (parseInt(construction)===0){
                return "Neuve"
            }
            else if (parseInt(construction)===1){
                return "Entre 1 et 5 ans"
            }
            else if (parseInt(construction)===2){
                return "Entre 5 et 10 ans"
            }

            else if (parseInt(construction)===3){
                return "Entre 11 et 20 ans"
            }

            else if (parseInt(construction)===4){
                return "Il y a plus de 20 ans"
            }
        }
        else{
            return construction;
        }

    }

}
const MyDocument = (props) => (
<Document>

<Page size="A4" style={styles.body} debug={false} wrap={true}>
<Image src={props.syntheseUrlFirstPage} style={styles.imageCanvas} debug={false}/>
<View style={styles.pageFooter} fixed debug={false}> 
<View style={styles.pageFooterLeft} fixed> 
<Text style={styles.pageFooterDate} render={() => (
        `Ce rapport a été généré le ${props.date}`
      )} />
      <Text> 
Les estimations réalisées par agenz n’ont pas valeur d’expertise.
Agenz ne garantit pas la parfaite exhaustivité des données mises à disposition au sein de ses solutions d’analyse.
 Agenz ne saurait être tenue responsable de toutes pertes découlant d’une décision fondée sur une analyse, prévision ou autre information apparaissant dans le cadre de ses solutions. </Text>
</View>
<View style={styles.pageFooterRight} fixed>
    <Text>Powered by agenz </Text>
</View>
</View>

</Page>
<Page size="A4"   style={styles.body} debug={false} wrap={true}>
<View   style={styles.pageHeader}   fixed> 
<View   style={styles.pageHeaderLeft} fixed> 
<Image src='https://firebasestorage.googleapis.com/v0/b/agenz-website-prod.appspot.com/o/images%2F164.png?alt=media&token=7c8d3b10-16a3-45f2-a918-ff219ac819e1' style={styles.imageHeader} />
</View>
<View  style={styles.pageHeaderRight} fixed>
<Text style={styles.referenceHeader}>{props.rapport.reference} </Text>
    <Text>{props.rapport.formattedAddress} </Text>
</View>
</View>
<View wrap={false}>
<Image  src={props.syntheseUrlSecondPage} style={styles.imageCanvas} />
</View>
<View wrap={false}>
<Text debug={false} style={styles.PhotoTitle} > Localisation du bien </Text>
<Image src={`https://api.mapbox.com/styles/v1/badrbelkeziz/ckqgtcbqn05nv17nzmxhff2wd/static/pin-s+102556(${props.lng},${props.lat})/${props.lng},${props.lat},14,0/826x450?access_token=pk.eyJ1IjoiYmFkcmJlbGtleml6IiwiYSI6ImNraDduNjN2bDA2MGszMG5zZHRqNm5zMzIifQ.oITjlONmSiUQsFKrZfFd3w`}
style={styles.imageCanvas} /> 
</View>

<View wrap={false}>
<Image src={props.screenLegend} style={styles.imageCanvasLegend} debug={false}/>
</View>

<View wrap={false} break > 
<Text debug={false} style={styles.PhotoTitle} > Évolution du prix du bien </Text>

<Image src={props.syntheseUrlFourthPage} style={styles.imageCanvas}/>
</View>


{ props.rapport.annonces_selected.length >0 || props.rapport.transactions_selected.length >0 ? (
     <View break>    
         <View wrap={false}>
    <Text debug={false} style={styles.PhotoTitle} > Biens comparables </Text>
    <Text debug={false} style={styles.PhotoSubTitle} > Les biens comparables dans un rayon de 500 mètres autour du bien </Text>
    {props.rapport.transactions_selected.length >0 ? (
    <Image src={props.mapBoxTransactionsUrl} /> 
    ) : (<Text></Text>)}
    </View>
   

{/* <Image src={props.syntheseUrlFifthPage} style={styles.imageCanvas}/> */}
{props.rapport.transactions_selected.map((row, index) => ( <>
        <View style={styles.listingTransactionView} wrap={true}>
<Text debug={false} style={styles.listingTitle} >
    {index+1} - Vente d'un(e) {row.consistance} d'une surface de 811 m² </Text>
    <Text debug={false} style={styles.listingPrice} >Prix : {new Intl.NumberFormat('us-US', { style: 'decimal', maximumFractionDigits : 0 }).format(row.prix).replace(/,/g," ")} MAD </Text>
    <Text debug={false} style={styles.listingPriceM2} >{new Intl.NumberFormat('us-US', { style: 'decimal', maximumFractionDigits : 0 }).format(row.prix/811).replace(/,/g," ")} MAD/m² </Text>
    {/* {formatConstruction(`${row.bien==="appartement" ? row.construction : row.anneeconstruction}`,row.bien) !=="" ? (
        <Text debug={false} style={styles.listingDate} >Construction : {formatConstruction(`${row.bien==="appartement" ? row.construction : row.anneeconstruction}`, row.bien)}  </Text> )
 : (<Text></Text>)}     */}
<Text debug={false} style={styles.listingDate} >Date de la transaction : {row.dateTransactions}      </Text>

{ row.images && row.images.length > 0 ? (
    row.images.map((item, index) => (  
      <Image src={item} style={styles.imageCanvas}/>
      
    ))
)
    :(<Text></Text>)
 
    }
        <Text debug={false} style={styles.listingSource} >Source : <Link src={`https://www.agenz.ma/prix-immobilier/vente-recente/${row.address==="" ? ("Casablanca") :( `${row.address.replace(/ /g, '-').replace(/\'/g, '-').replace(/é/g, 'e').replace(/ô/g, 'o').replace(/,/g, '')}`)}/${row.id}`}>{`https://www.agenz.ma/prix-immobilier/vente-recente/${row.address==="" ? ("Casablanca") :( `${row.address.replace(/ /g, '-').replace(/\'/g, '-').replace(/é/g, 'e').replace(/ô/g, 'o').replace(/,/g, '')}`)}/${row.transactionId}`}</Link>    </Text> 
        </View> 
    </>
       
    ))}
    { props.rapport.annonces_selected.length >0  ? (
    <Image src={props.mapBoxAnnoncesUrl} /> 
    ) : (<Text></Text>)}

    {props.rapport.annonces_selected.map((row, index) => (
        <View style={styles.listingAnnonceView} wrap={false}>
        <Text debug={false} style={styles.listingTitle} > {index +1} - Annonce pour {props.estimation.bien==="appartement" ? 'un appartement' : 'une villa'} de {row.chambres} chambre pour une surface de {row.surface} m²</Text>
<Text debug={false} style={styles.listingPrice} >Prix :  {new Intl.NumberFormat('us-US', { style: 'decimal', maximumFractionDigits : 0 }).format(row.prix).replace(/,/g," ")} MAD</Text>
<Text debug={false} style={styles.listingPriceM2} >{new Intl.NumberFormat('us-US', { style: 'decimal', maximumFractionDigits : 0 }).format(row.prix/row.surface).replace(/,/g," ")} MAD/m² </Text>
<Text debug={false} style={styles.listingQuartier} >Quartier {row.quartier}   </Text> 
<Text debug={false} style={styles.listingDate} >Mise en ligne {moment(row.date_annonce,"YYYY-MM-DD").fromNow()}    </Text>
<Text debug={false} style={styles.listingSource} >Source : <Link src={row.source}>{row.source}</Link>   </Text>     
</View>     
    ))
    }
</View>


) : (<Text></Text>)

}

{/* { props.projects.length >0 ? (
     <View break>    
         <View wrap={false}>
    <Text debug={false} style={styles.PhotoTitle} > Projets à proximité </Text>
    <Text debug={false} style={styles.PhotoSubTitle} > Les permis de construire délivrés dans un rayon de 500 mètres autour du bien </Text>
    <Image src={props.projectsURL}
style={styles.imageCanvas} /> 
    </View>

{props.projects.map((row, index) => ( <>
        <View style={styles.listingAnnonceView} wrap={true}>
<Text debug={false} style={styles.listingTitle} >
Projet : {row.projet} à {row.distance} mètres</Text>
    <Text debug={false} style={styles.listingPrice} >Description : {row.project_details==="0" ? ("Inconnue") : row.project_details }  </Text>
    <Text debug={false} style={styles.listingPriceM2} >{new Intl.NumberFormat('us-US', { style: 'decimal', maximumFractionDigits : 0 }).format(row.surface).replace(/,/g," ")} m² </Text>
        <Text debug={false} style={styles.listingDate} >{row.prefecture}{" "}{row.arrondissement}  </Text> 
<Text debug={false} style={styles.listingDate} > Date d'autoristion : {moment(row.date).format("LL")}   </Text>
{row.code!=="0" ? (
    <Text debug={false} style={styles.listingDate} > Numéro d'autorisation : {row.code} </Text>) : (<Text></Text>)}      

        </View> 
    </>
       
    ))}

</View>


) : (<Text></Text>)

} */}

<View wrap={false}>
<Text debug={false} style={styles.PhotoTitle} > Commerces et services </Text>
<Image src={props.mapPlaceUrl}
style={styles.imageCanvas} debug={false}/> 
</View>
<View wrap={false}>
<Text style={styles.PlaceTitle}>Restauration</Text>
<View style={styles.ViewPlaces} wrap={false} debug={false} > 

<Image
  style={styles.imageNote}
  src={props.svgRestaurants} 
  debug={false}
/>
<Image
  style={styles.imagePlaceText}
  src={props.screenRestaurants} 
  debug={false}
/>

</View>
</View>
<View wrap={false}>
<Text style={styles.PlaceTitle}>Éducation</Text>
<View wrap={false} style={styles.ViewPlaces} > 
<Image src={props.svgEcoles} style={styles.imageNote} debug={false}/>
<Image
  style={styles.imagePlaceText}
  src={props.screenEcoles} 
  debug={false}
/>

</View>
</View>
<View wrap={false}>
<Text style={styles.PlaceTitle}>Pharmacies</Text>
<View wrap={false} style={styles.ViewPlaces}  > 
<Image src={props.svgPharmacies} style={styles.imageNote} debug={false}/>
<Image
  style={styles.imagePlaceText}
  src={props.screenPharmacies} 
  debug={false}
/>

</View>
</View>
<View wrap={false}>
<Text style={styles.PlaceTitle}>Supermarchés</Text>

<View wrap={false} style={styles.ViewPlaces} > 
<Image src={props.svgSupermarches} style={styles.imageNote} debug={false}/>
<Image
  style={styles.imagePlaceText}
  src={props.screenSupermarches} 
  debug={false}
/>

</View>
</View>


{
props.rapport.images ? (
props.rapport.images.length>0 ? (
<View>
<Text debug={false} style={styles.PhotoTitle} > Photos du bien</Text>
{props.rapport.images.map((image,index) => { 
return (
    <View wrap={false}>
      <Image src={image} style={styles.imageCanvas}/>
      </View>
)

})
}
</View>
) : (<Text></Text>)
) : (<Text></Text>)
}
<View   style={styles.pageFooter} fixed> 
<View  style={styles.pageFooterLeft} fixed> 

<Text style={styles.pageFooterDate} render={() => (
        `Ce rapport a été généré le ${props.date}`
      )} />
      <Text> 
Les estimations réalisées par agenz n’ont pas valeur d’expertise.
Agenz ne garantit pas la parfaite exhaustivité des données mises à disposition au sein de ses solutions d’analyse.
 Agenz ne saurait être tenue responsable de toutes pertes découlant d’une décision fondée sur une analyse, prévision ou autre information apparaissant dans le cadre de ses solutions. </Text>
</View>
<View  style={styles.pageFooterRight} fixed>
    <Text>Powered by agenz </Text>
</View>
</View>

</Page>



</Document>
);