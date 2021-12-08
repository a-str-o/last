import React, { Component } from 'react'
import './PriceTable.scss'
import communes from "./communes_list";
import { connect } from "react-redux";
import Pagination from "../../Pages/RapportEstimation/Pagination"
import {withRouter} from 'react-router-dom';




export class PriceTable extends Component {
    constructor(props) {
        super(props);
        this.state = { allAreas: communes, 
            currentAreas: [], 
            currentPage: null, 
            totalPages: null }
        }
        onPageChanged = data => {
            const { allAreas } = this.state;
            const { currentPage, totalPages, pageLimit } = data;
        
            const offset = (currentPage - 1) * pageLimit;
            const currentAreas = allAreas.slice(offset, offset + pageLimit);
        
            this.setState({ currentPage, currentAreas, totalPages });
          }
    setActiveZone(areaLabel,id, prix, lat, lng){
        this.props.history.push(`/prix-immobilier/Casablanca/${areaLabel}`)
document.querySelector(".pricing-right-side").scrollTo({top : 0, left : 0,behavior: 'smooth'})
        this.props.dispatch({type : "SET_ACTIVE_ZONE", data : {id : id, prix : prix}})
        this.props.dispatch({type : "SET_ACTIVE_COMMUNE", data : {commune : areaLabel, prix : prix,prixVilla : 0}})
        this.props.dispatch({type : "SET_VIEWPORT_ON_ACTIVE_ZONE", data : {lat : lat, lng : lng, zoom : 13}})

    }
    render() {
        const { allAreas} = this.state;
        const totalAreas = allAreas.length;
        return (
            <div className="price-table--container">
                <table>
                <thead>
            <tr>
                <th>Arrondissement</th>
                <th>Prix m² moyen appartement</th>
            </tr>
        </thead>
        <tbody>
            {this.state.currentAreas.map((item,index) => {
                if(item.prix > 0){
                return (
                    <tr className="area--container" key={index} onClick={()=>this.setActiveZone(item.areaLabel,item.id,item.prix, item.lat, item.lng)}>
                    <td className="area--label">{item.areaLabel}</td>
                    <td>{new Intl.NumberFormat('fr-FR', {maximumFractionDigits : 0}).format(item.prix)} MAD</td>
                    </tr>

                )
                }
                return ("")
            }
            )}

        </tbody>
                </table>
                <div className="d-flex flex-row py-4 align-items-center pagination--container">
              <Pagination totalRecords={totalAreas} pageNeighbours={1} onPageChanged={this.onPageChanged} pageLimit={8} />
</div>
                
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        config: state.config,
        priceDetails: state.priceDetails,
        searchedAddress: state.estimationState.urlViewport,
        transactions: state.transactions.transactions,
        agences: state.agences.agences
    };
};
export default connect(mapStateToProps)(withRouter(PriceTable));
