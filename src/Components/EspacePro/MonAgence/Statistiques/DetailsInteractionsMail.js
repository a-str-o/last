import React, { Component } from 'react'
import "./DetailsInteractions.scss"
import { connect } from 'react-redux';

export class DetailsInteractionsMail extends Component {
    constructor() {
        super();
          this.state = {
          isFlipped: false,
          dropDown : false,
          
        };
    }
    render() {
        return (
            <div>
                <table className="interactions--table">
                    <thead>
                        <tr>
                            <th className="th-left">Origine</th>
                            <th className="th-right">Clics</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="row--container">
                            <td className="row--label row-vitrine">Vitrine</td>
                            <td className="row--data">{this.props.visibilite.contactMail.filter( el => {return (el.location==="Vitrine")}).length}</td>
                        </tr>
                            {this.props.transactionsUser.map(transac => {
                                return (
                                    <tr className="row--container">
                                    <td className="row--label"><span className="transac--title">Vente récente : </span>{transac.address}</td>
                                    <td className="row--data">{this.props.visibilite.contactMail.filter( el => {return (el.transaction===transac.transactionId)}).length}</td>
                                    </tr>

                                )
                            })}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        agence : state.auth.agence,
        visibilite : state.espacePro.visibilite,
        transactionsUser : state.espacePro.transactionsUser,
    }
};  
export default connect(mapStateToProps)(DetailsInteractionsMail);
