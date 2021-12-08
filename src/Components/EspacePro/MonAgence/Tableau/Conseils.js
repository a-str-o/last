import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import './Conseils.scss'
import Progress from "./Progress"
import CarouselConseil from "./CarouselConseil"
export class Conseils extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress : 0,
            logo : false,
            cover : false,
            transac : false,
            vitrine : false
        }
        
    }
    calculateProgress(){
        let progress = 0
        if(this.props.agence.user_image && this.props.agence.user_image!==""){
            progress= progress + 25
            this.setState({logo : true})
        }

        if(this.props.agence.cover_image && this.props.agence.cover_image!==""){
            progress= progress + 25
            this.setState({cover : true})
        }

        if(this.props.agence.nameEntreprise && this.props.agence.nameEntreprise!==""){
            progress= progress + 25
            this.setState({vitrine : true})
        }

        if(this.props.agence.countTransactions){
        if(this.props.agence.countTransactions>=10){
            progress= progress + 25
            this.setState({transac : true})
        }
    }
    this.setState({progress : progress})

    }
    componentDidMount(){
        this.calculateProgress()
    }
    render() {
        return (
            <div className="visibilite--container">
            <div className="header--container">
                <p className="header-text">
                <i class="far fa-thumbs-up"></i> <span className="conseil--header"> Nos Conseils pour réussir</span>
                </p>
            </div>
            <Grid container spaciing={0}>
                <Grid item md={4} xs={12}>
                   <Progress progress={this.state.progress}/>
                </Grid>
                <Grid item md={8} xs={12}>
                    
                        <CarouselConseil  logo={this.state.logo} cover={this.state.cover} transac={this.state.transac} vitrine={this.state.vitrine} progress={this.props.agence.countTransactions} />
                </Grid>
            </Grid>

            
        </div>

        )
    }
}

export default Conseils
