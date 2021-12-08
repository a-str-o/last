
import React, { Component } from 'react';
import { connect } from "react-redux";



// https://gitlab.com/catamphetamine/react-phone-number-input
import 'react-phone-number-input/style.css'


import './Rapport.scss';

import moment from 'moment';
import 'moment/locale/fr';
import AnnonceComponent from "./AnnonceComponent"
import Pagination from "./Pagination"

moment.locale("fr")



class AnnonceListComponent extends Component {
constructor(props) {
super(props);
this.state = { allAnnonces: this.props.annonces, 
    currentAnnonces: [], 
    currentPage: null, 
    totalPages: null }
}
onPageChanged = data => {
    const { allAnnonces } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentAnnonces = allAnnonces.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentAnnonces, totalPages });
  }

render(){
    const { allAnnonces} = this.state;
    const totalAnnonces = allAnnonces.length;
    return (
<>
{this.state.currentAnnonces.map((row, index) => (
<AnnonceComponent bien={this.props.bien} chambres={row.chambres} prix={row.prix}  date_annonce={row.date_annonce} surface={row.surface} source={row.source} quartier={row.quartier} />
))
}

<div className="d-flex flex-row py-4 align-items-center pagination--container">
              <Pagination totalRecords={totalAnnonces} pageNeighbours={1} onPageChanged={this.onPageChanged} pageLimit={5} />
</div>
</>
    )
}
}
const mapStateToProps = (state) => {
    return {
        config: state.config,
    };
    };
    
    export default connect(mapStateToProps)(AnnonceListComponent);
    
