import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import ObtenirLePrix from "./ObtenirLePrix"
import { withStyles, createStyles } from '@material-ui/styles';
import {withRouter} from 'react-router-dom';


const styles = theme => createStyles({ // change to this
    paperWidthSm:     {
        maxWidth : '90vw',
        width: '90vw',
    height: '90vh',
    backgroundColor: '#f2f3f4'
},
root : {
    marginTop : '0px !important',
    marginBottom : '0px !important'
}
});

export class TransactionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
             moreInfo : this.props.moreInfo
        }
        }
        closeModal = () => {
            this.props.history.push('/prix-immobilier')
            this.setState({
                ...this.state,
                moreInfo: false,
                selectedId: null,
                selectedTransaction: null,
                agenceTransaction: null
            })
        }
    

    
    render() {
        const { classes } = this.props;

        return (
            <Dialog
            open={this.state.moreInfo}
            disableBackdropClick={false}
            onClose={this.closeModal}
            classes={{paperWidthSm: classes.paperWidthSm }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
                <DialogContent>
                    <ObtenirLePrix 
                    callForData={true}
                    images={this.props.images} consistance={this.props.consistance}
                    selectedAddress={this.props.selectedAddress}
                    dateTransactions={this.props.dateTransactions}      
                    construction={this.props.construction}
                    agenceTransaction={this.props.agenceTransaction}
                    transactionId={this.props.transactionId}/>

                </DialogContent>
            </Dialog>
 
        )
    }
}

export default (withStyles(styles)(withRouter(TransactionPage)));
