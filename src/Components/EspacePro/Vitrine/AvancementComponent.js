import React, { Component } from 'react'
import './AvancementComponent.scss'
import ProgressBar from "@ramonak/react-progress-bar";
import { connect } from 'react-redux';

export class AvancementComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress : 0
        }
        
    }
    calculateProgress(){
        let progress = 0
        if(this.props.agence.user_image && this.props.agence.user_image!==""){
            progress= progress + 25
        }

        if(this.props.agence.cover_image && this.props.agence.cover_image!==""){
            progress= progress + 25
        }

        if(this.props.agence.nameEntreprise && this.props.agence.nameEntreprise!==""){
            progress= progress + 25
        }

        if(this.props.agence.countTransactions){
        if(this.props.agence.countTransactions===10){
            progress= progress + 25
        }
    }
    this.setState({progress : progress})

    }
    componentDidMount(){
        this.calculateProgress()
    }
    render() {
        return (
            <div className="avancement--container">
                <div className="right--container">
                <i class="fas fa-info-circle avancement-info-icon"></i>

                </div>
                <div className="left--container">
                    <div className="header--container">
                        <p className="header-text">Avancement de votre vitrine</p>
                    </div>
                    <ProgressBar 
    completed={this.state.progress}
    bgColor="#2da7f9"
    labelAlignment="outside"
    isLabelVisible={true}
    labelColor="#606060"
    />
                </div>
                
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        agence : state.auth.agence
        
    }
  }; 
  
  export default connect(mapStateToProps)(AvancementComponent)
