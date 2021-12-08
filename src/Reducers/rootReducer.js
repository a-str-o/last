import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import authReducer from './authReducer';
import estimationReducer from './estimationReducer';
import loadReducer from './loadingReducer';
import cardReducer from './cardReducer';
import userEstimationReducer from './userEstimationsReducer';
import publicationReducer from './publicationReducer';
import configReducer from './configReducer';
import priceDetailsReducer from './priceDetailsReducer';
import espaceProReducer from './espaceProReducer';
import estimationProReducer from './estimationProReducer';

import transactionReducer from './transactionsReducer';
import agencesReducer from './agencesReducer';


const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    auth: authReducer,
    estimationState: estimationReducer,
    loading: loadReducer,
    card: cardReducer,
    userEstimation: userEstimationReducer,
    publication: publicationReducer,
    config: configReducer,
    priceDetails: priceDetailsReducer,
    espacePro: espaceProReducer,
    transactions: transactionReducer,
    agences: agencesReducer,
    estimationStatePro: estimationProReducer

});

export default rootReducer;