import React, { Component } from 'react';
import AgenceInfo from './AgenceInfo'
import './ListingAgencies.scss'
import axios from "axios";

import Pagination from '../../Pages/RapportEstimation/Pagination'
import Loading from "../../Loading"
export class ListingAgencies extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingAgences : true,
            allAgences: [], 
    currentAgences: [], 
    currentPage: null,  
    totalPages: null 
        }
    }
    onPageChanged = data => {
        const { allAgences } = this.state;
        const { currentPage, totalPages, pageLimit } = data;
    
        const offset = (currentPage - 1) * pageLimit;
        const currentAgences = allAgences.slice(offset, offset + pageLimit);
    
        this.setState({ currentPage, currentAgences, totalPages });
      }
    getAllAgences(){
        axios.get('https://us-central1-agenz-website-prod.cloudfunctions.net/api/getAllAgences').then(result => {
            // console.log(result)
            this.setState({allAgences : result.data, loadingAgences : false})
    })
    .catch(err=>{
        console.log(err)
    })
    }
    componentDidMount(){
        this.getAllAgences()
    }


    render() {
        const { allAgences} = this.state;
        const totalAgences = allAgences.length;
        return (
            <div className="listing-agencies-container">
                <div className="listing-titles--container">
            <h1 className="average--area-title listing--title">Retrouvez les meilleurs professionnels de l'immobilier à Casablanca</h1>
            </div>
            {this.state.loadingAgences ? (
                            <div className="vitrine--loader">
                            <Loading />
                            </div>            ) : (
                                <>
                                {
                this.state.currentAgences.map((item,index) => {
                    
                     
                    return <AgenceInfo key={index} name={item.name} description={item.description} image={item.image} nombreTransac={item.nombreTransac} url={item.url} />
                    
                })}
                

<div className="d-flex flex-row py-4 align-items-center pagination--container">
              <Pagination totalRecords={totalAgences} pageNeighbours={1} onPageChanged={this.onPageChanged} pageLimit={5} />
</div>
</>
                )
                    }
            



                
            </div>
        )
    }
}

export default ListingAgencies
