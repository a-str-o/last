import React, { Component } from 'react'
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider } from '@material-ui/core/styles';
import {theme} from '../../../assets/theme'
import "./EstimationTitre.scss"
import { toast } from "react-toastify";
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


export class EstimationTitre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titre_1 : "",
            titre_2 : "",
            looking : false
        }
    }
    look_for_titre(){
        let titre_1 = this.state.titre_1;
        let titre_2 = this.state.titre_2;
        this.setState({looking : true})
        if(titre_1 ==="" || titre_2 ===""){
            toast.error("Veuillez remplir tous les champs pour la recherche par titre")
            this.setState({looking : false})
        }
        else {
        axios.post("https://cli482fnl7.execute-api.eu-west-3.amazonaws.com/default/lambdassh", {"find_titre" : true, titre_1 : titre_1, titre_2 : titre_2}).then((res) => {
            console.log(res)
            this.setState({looking : false})
        })
        .catch(err => {
            console.log(err)
            this.setState({looking : false})
        })
    }
    }

    render() {
        return (
            
            <ThemeProvider theme={theme}>
            <h3 className="titres--title">Ou Recherchez par titre foncier</h3>
                <div className="titres--container">
                    <div className="ref--container">
                        <span className="titre-ref">T</span>
                    </div>
                    <div className="titres-input--container">

                         

                         <div className="message--field">
                     <TextField variant="outlined" size="small" id="titre_1" label="" type="search" 
                                                             value={this.state.titre_1}
                                                             onChange={(e) => {this.setState({...this.state, titre_1: e.target.value})}}
                                                             />
                    <span className="titre-backslash">\</span>

                    <TextField variant="outlined" size="small" id="titre_2" label="" type="search" 
                                                             value={this.state.titre_2}
                                                             onChange={(e) => {this.setState({...this.state, titre_2: e.target.value})}}
                                                             />

                    </div>
                </div>
                </div>
                <button type="button" className="btn btn--primary" onClick={() => {this.look_for_titre()}}>{this.state.looking ?(<BeatLoader color='#fff' loading={true} css={override} size={10} />
) :("Rechercher")}</button>

            </ThemeProvider>
        
        )
    }
}

export default EstimationTitre
