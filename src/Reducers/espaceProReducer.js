import { toast } from "react-toastify";
import Axios from 'axios';
import { MAPBOX_API_KEY } from "../Config/MapboxConfig";

const generateID = () => {
  let length = 3,
  charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal + new Date().getTime();
}


const transaction = {
    localisation: "", // Sans consequence pour l'API lat : 33.58745398732572 lng : -7.627325140465932
    bien: "appartement",
    address: "", // Sans consequence pour l'API
    zone: "",
    typologie: 1, // Nombre entier (le nombre de chambre)
    surfacehabitable: null, // Nombre entier (int)
    surfacebalcon: 0, // Nombre entier (int)
    surfacecave: 0, // Nombre entier (int)
    etagesimmeuble: 0, // doit etre une int ou float 
    etage: 1, // 0 pour l'instant (on demandait le nombre d'etage dans l'immeuble avant mais c'est plus le cas)
    sdb: 1, // Nombre entier (Nombre de salles de bains)
    orientation: "Je ne sais pas", // "Je ne sais pas", "est", "nord", "ouest", "sud", "sudouest", "double"
    finition: "correct", // "travauxaprevoir", "correct", "refaitaneuf"
    agencement: 1, // 1 , 2 , 3 , ou 4
    luminosite: 1, // 1 , 2 , 3 , ou 4
    cave: 0, // 0 si pas de cave, 1 si il y a une cave
    parking: 0, // 0 si pas de parking, 1 si il y a un parking
    placesparking: 1, // Nombre entier (nombre de places de parking)
    concierge: 0, // 0 ou 1 (pour "oui" ou "non")
    duplex: 0, // 0 ou 1 (pour "oui" ou "non")
    cheminee: 0, // 0 ou 1 (pour "oui" ou "non")
    residencefermee: 0, // 0 ou 1 (pour "oui" ou "non")
    calme: 0, // 0 ou 1 (pour "oui" ou "non")
    chambreservice: 0, // 0 ou 1 (pour "oui" ou "non")
    cuisinefermee: 0, // 0 ou 1 (pour "oui" ou "non")
    climatisation: 0, // 0 ou 1 (pour "oui" ou "non")
    vueexceptionnelle: 0, // 0 ou 1 (pour "oui" ou "non")
    renovee: 0, // (Pas d'importance, c'est un ancien critere)
    redejardin: "non", // "non", "ouicollectif"
    construction: -1, // -1 : Pour "Je ne sais pas", 0 : Pour "Moins de 5 ans", 1 : Pour "Entre 10 et 20 ans", 2 : Pour "Plus de 20 ans", 3 : Pour "Moins de 10 ans", 4 : Pour Construction neuve
    ascenseur: 0, // 0 ou 1 (pour "oui" ou "non")
    coordinates: "", // Sans consequence pour l'API
    prix: null,
    dateTransactions : null,
    consistance: "",
    contributeur: "",
    balcon: 0, // 0 ou 1 (pour "oui" ou "non")
    surfaceparking: 0, // Nombre entier
    surface: 0, // Nombre entier

    //Villa
    surfaceterrain: null, // Nombre entier
    surfaceconstruite: null, // Nombre entier
    murmitoyen: 0, // Nombre entier
    typevilla: "villajumelee", // "villajumelee", "villaenbande"
    garage: 0, // Nombre entier
    piscine: 0, // Nombre entier
    chaufeausolaire: 0, // Nombre entier
    typechauffage: -1, // -1 : Pour "Je ne sais pas", 0 : Pour "Electrique", 1 : Pour "Chaudière centrale au fuel", 2 : Pour "Chaudière centrale au gaz", 3 : Pour "Pompe à chaleur"
    etatgeneral: "correct", // "travauxaprevoir", "correct", "etatneuf"
    anneeconstruction: -1, // -1 : Pour "Je ne sais pas", 0 : Pour "Neuve", 1 : Pour "Entre 1 et 5 ans", 2 : Pour "Entre 5 et 10 ans", 3 : Pour "Plus de 10 ans", 4 : Pour "Pls de 20 ans"
}
const espaceProReducer = ( 
state = {
    loadingTransaction : false,
    activeMenu: 'tableau',
    notifications : 0,
    mapLoaded : false,
    hide_folders : [],
    xplorerFilters: {
        priceZones: true,
        interestPoints: true,
        transactions: true,
        transactionType: 'all', // all, mine, others
        transactionProperties: {
            m2: {
                operator: null, // ==. >=, <=, <>
                value: [0],
                display: 'Toutes les surfaces'
            },
            price: {
                operator: null, // ==. >=, <=, <>
                value: [0],
                display: 'Tous les prix'
            },
            type: 'all' // all, villas, appartments, fields
        },
    },
    activeFilter: {
        type: null,
        id: null,
        data: null
    },
    transactions: null,
    retrieveTransactions: null,
    transactionsUser : null,
    estimations: null,
    retrieveEstimations: null,
    filterTransactions: null,
    myTransactions: null,
    transaction: transaction,
    marker: {
        latitude: null,
        longitude: null,
    },
    polygones: [],
    steps : ['Adresse', 'Type', 'Informations', 'Charactéristiques', 'Le bien et vous'],
    activeStep: 0,
    openLoginModal :false,
    openTransactionModal: false,
    openEstimateModal: false,
    openLocationErrorModal: false,
    openPhoneModal: false,
    openAvisModal: false,
    openConfirmationModal: false,
    isLoaded: false,
    pointExist: false,
    positionSelected: false,
    surfaceHaitableError:false,
    orientationError:false,
    finitionError:false,
    constructionError:false,
    rejardinError:false,
    surfaceCaveError:false,
    surfaceBalconError:false,
    surfaceParkingError:false,
    paceParkingError: false,
    surfaceTerrainError: false,
    surfaceConstruiteError: false,
    is_cave: false,
    is_balcon: false,
    is_parking: false,
    active_house : 2,
    active_categorie : 1,
    button_type : 'button',
    user: null,
    viewport: {
        latitude:33.5661958,
        longitude:-7.6502371,
        zoom: 11
    },
    initialViewport: {
        latitude:33.5661958,
        longitude:-7.6502371,
        zoom: 11
    },
    urlViewport: {
        latitude: null,
        longitude: null,
        zoom: 13
    },
    interactionState: {},
    settings: {
        dragPan: true,
        dragRotate: true,
        scrollZoom: true,
        touchZoom: true,
        touchRotate: true,
        keyboard: true,
        doubleClickZoom: true,
        minZoom: 0,
        maxZoom: 20,
        minPitch: 0,
        maxPitch: 85
    },
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    transactionId: '',
    transactionError: '',
    lastTransaction: null,
    accountActiveMenu: 0,
    currentAdress: '',
    showTransactionDetails : false,
    TransactionDetails: {},
    showEstimationDetails : false,
    EstimationDetails: {},
    estimationFilter: false,
    filterEstimation: {
        option : [],
        optionSelected: null,
        operatorSelected : 0,
        filterValue: null,
        filterSmallValue: null,
        filterGreateValue: null,
        filterVilleValue: null,
        temporaryPriceValues : null,
        temporaryRoomValues : null,
        temporarySurfaceValues : null,
        temporaryCityValues : null,
    },

    transactionCliked : false,
    visibilite : {
        contactPhone : [],
        contactMail : [],
        contactMessage : [],
        vitrineViews : 0,
        checked : false,
        hiddenMessage : 0

    }
}, action) => {
    switch (action.type) {
        case 'SET_CORRECT_ADDRESS':
            state = { ...state, transaction : {...state.transaction, address : action.data}, currentAdress: action.data };
            return state;
        case 'SET_ESTIMATION_FILTER':
            state = { ...state, estimationFilter: action.data };
            return state;
        case 'SET_TRANSACTION_CLICKED':
            state = { ...state, transactionCliked: action.data };
            return state;    
        case 'RESET_ESTIMATION_FILTER':
        state = { ...state, 
            estimations: state.retrieveEstimations,
            myTransactions: state.retrieveTransactions,
            estimationFilter: false,  
            filterEstimation: {
            option : [],
            optionSelected: null,
            operatorSelected : 0,
            filterValue: null,
            filterSmallValue: null,
            filterGreateValue: null,
            filterVilleValue: null,
            temporaryValues : null,
            temporaryPriceValues : null,
            temporaryRoomValues : null,
            temporarySurfaceValues : null,
            temporaryCityValues : null,
        }};
        return state;
        case 'SET_PRO_ACCOUNT_ACTIVE_MENU':
            state = { ...state, activeMenu: action.data };
            return state;
            case 'OPEN_LOADING_TRANSACTION':
                state = { ...state, loadingTransaction: true };
                return state;
        case 'PRO_SET_NOTIFICATIONS':
                state = { ...state, notifications: action.data };
                return state;
        case 'SET_TRANSACTION_DETAILS':
            state = { ...state, TransactionDetails: action.data };
            return state;
        case 'TRANSACTION_DETAILS':
            state = { ...state, showTransactionDetails: action.data };
            return state;
        case 'SET_ESTIMATION_DETAILS':
            state = { ...state, EstimationDetails: action.data };
            return state;
        case 'ESTIMATION_DETAILS':
                state = { ...state, showEstimationDetails: action.data };
                return state;
        case 'SET_TRANSACTIONS':
            state = { ...state, 
                transactions: action.data,
                filterTransactions: action.data
            };
            return state;
            case 'SET_TRANSACTIONS_PRO':
                state = { ...state, 
                    transactions: action.data,
                    filterTransactions: action.data
                };
                return state;

        case 'SET_FILTER_TRANSACTIONS':
            const transactions = action.data.filter(trans => 
                trans.isDeleted === false || 
                trans.isDeleted === undefined || 
                trans.isDeleted === null);
            state = { ...state, 
                transactions: transactions
            };
            return state;
            case 'SET_TRANSACTIONS_USER':
                state={
                    ...state,
                    transactionsUser : action.data
                }
                return state;
        case 'SET_MY_TRANSACTIONS':
            state = { ...state, 
                myTransactions: action.data,
                retrieveTransactions: action.data
            };
            return state;
        case 'SET_ESTIMATIONS':
            state = { ...state, 
                estimations: action.data,
                retrieveEstimations: action.data
            }
        return state;
        case 'SET_FILTERED_ESTIMATIONS':
                state = { ...state,
                    estimations: action.data
                }
                return state;
        case 'SET_FILTERED_TRANSACTIONS':
                    state = { ...state,
                        myTransactions: action.data
                    }
            return state;
        case 'SET_ESTIMATIONS_FILTER_OPTIONS':
                state = { ...state, filterEstimation: {...state.filterEstimation, option: [...state.filterEstimation.option,action.data] } }
                return state;
        case 'SET_ESTIMATIONS_FILTER_TEMPORARY_VALUES_PRICE':
                state = { ...state, filterEstimation: {...state.filterEstimation, 
                temporaryPriceValues: {...state.filterEstimation.temporaryPriceValues,
                Priceoption: action.data.option,
                Priceoperator: action.data.operator,
                Pricevalue : action.data.value,
                PricesmallValue: action.data.smallValue,
                PricegreatValue: action.data.greatValue,
                } } }
            return state;

        case 'SET_ESTIMATIONS_FILTER_TEMPORARY_VALUES_ROOM':
                    state = { ...state, filterEstimation: {...state.filterEstimation, 
                    temporaryRoomValues: {...state.filterEstimation.temporaryRoomValues,
                    Roomoption: action.data.option,
                    Roomoperator: action.data.operator,
                    Roomvalue : action.data.value,
                    RoomsmallValue: action.data.smallValue,
                    RoomgreatValue: action.data.greatValue,
                    } } }
                return state;
        case 'SET_ESTIMATIONS_FILTER_TEMPORARY_VALUES_SURFACE':
                        state = { ...state, filterEstimation: {...state.filterEstimation, 
                        temporarySurfaceValues: {...state.filterEstimation.temporarySurfaceValues,
                        Surfaceoption: action.data.option,
                        Surfaceoperator: action.data.operator,
                        Surfacevalue : action.data.value,
                        SurfacesmallValue: action.data.smallValue,
                        SurfacegreatValue: action.data.greatValue,
                        } } }
                    return state;

        case 'SET_ESTIMATIONS_FILTER_TEMPORARY_VALUES_CITY':
                        state = { ...state, filterEstimation: {...state.filterEstimation, 
                        temporaryCityValues: {...state.filterEstimation.temporaryCityValues,
                        Cityoption: action.data.option,
                        Cityvalue : action.data.value
                        } } }
                    return state;

        case 'SET_ESTIMATIONS_FILTER_OPTIONS_SELECTED':
                state = { ...state, filterEstimation: {...state.filterEstimation, optionSelected: action.data } }
                return state;
        case 'SET_ESTIMATIONS_FILTER_OPTIONS_OPERATOR':
                    state = { ...state, filterEstimation: {...state.filterEstimation, 
                        operatorSelected: action.data,
                    } }
                    return state;
        case 'SET_ESTIMATIONS_FILTER_OPTIONS_VALUE':
                        state = { ...state, filterEstimation: {...state.filterEstimation,
                            filterValue: action.data
                        } }
                        return state;
        case 'SET_ESTIMATIONS_FILTER_OPTIONS_INTERVAL_VALUE':
                        state = { ...state, filterEstimation: {...state.filterEstimation,
                            filterSmallValue: action.data.smalVallue,
                            filterGreateValue: action.data.greatValue
                        } }
                        return state;
        case 'SET_ESTIMATIONS_FILTER_OPTIONS_Ville_VALUE':
                        state = { ...state, filterEstimation: {...state.filterEstimation,
                            filterVilleValue: action.data
                        } }
                        return state;               
        case 'SET_FILTERS':
            state = {...state, xplorerFilters: action.data };
            return state;  
        case 'REINIT_TRANS_FLOW': {
            state = {
                ...state,
                transaction: transaction,
                activeStep: 0,
                transactionId: '',
                transactionError: '',
                viewport: {
                    latitude:33.5661958,
                    longitude:-7.6502371,
                    zoom: 11
                },
                initialViewport: {
                    latitude:33.5661958,
                    longitude:-7.6502371,
                    zoom: 11
                },
                marker: {
                    latitude: null,
                    longitude: null,
                },
            }
            return state;
        }
        case 'SET_TRANS_POLYGONES': {
            state = { ...state, polygones: action.data };
            return state;
        }
        case 'SET_TRANS_CURRENT_ADDRESS': {
            state = { 
                ...state,
                currentAdress: action.data.address,
                transaction: {
                    ...state.transaction,
                    address: action.data.address,
                    ville: action.data.ville
                },
                pointExist : true,
            };
            return state;
        }
        case 'UPDATE_TRANS_LOCATION_ERROR_MODAL': {
            state = { ...state, openLocationErrorModal: action.data };
            return state;
        }
        case 'UPDATE_TRANSACTION_MODAL': {
            state = {...state, openTransactionModal: action.data};
            return state;
        }
        case "ADD_TRANS_ERR": {
            toast.error("L'enregistrement a rencontré une erreur");
            return state;
        }
        case "ADD_TRANS": {
            toast.success("Estimation ajoutée");
            return state;
        }
        case "FILL_TRANS_FORM_ERROR": {
            toast.error("Veuillez remplir toutes les informations necessaires");
            return state;
        }
        case 'SET_TRANS_MARKER_LOCATION': {
            state = {...state, pointExist : true, marker: { latitude: action.data.latitude, longitude: action.data.longitude, zoom:13}};
            return state;
        }
        case 'SET_TRANS_URL_VIEWPORT': {
            state = {...state, urlViewport: { latitude: action.data.latitude, longitude: action.data.longitude, calledForZoom: true}};
            return state;
        }
        case 'RESET_TRANS_SEARCH_BAR_MAP': {
            state = { ...state,
                urlViewport: {
                latitude: null,
                longitude: null,
                calledForZoom: false
                },
            }
            return state;
        }
        case 'UPDATE_TRANS_TRANS_ERROR': {
            toast.error("La mise à jour a rencontré une erreur !");
            return state;
        }
        case 'UPDATE_TRANS_SUCCESS': {
            toast.success("La mise à jour a bien été effectuée !");
            return state;
        }
        case 'UPDATE_TRANS_ZONE': {        
            state = {...state, transaction: {
                ...state.transaction,
                zone: action.data
            }};
            return state;
        }
        case 'UPDATE_TRANS_CONFIRMATION_MODAL': {
            state = {...state, openConfirmationModal: action.data};
            return state;
        }
        case 'UPDATE_TRANS_VIEW_PORT': {
            state = {...state, viewport: action.data};
            return state;
        }
        case 'UPDATE_TRANS_POINTEXIST': {
            state = {...state, pointExist: action.data};
            return state;
        }
        case 'UPDATE_TRANS_POSITIONSELECTED': {
            state = {...state, positionSelected: action.data};
            return state;
        }
        case 'CONFIRM_TRANS_ADDRESS_SELECTION': {
            state = {
                ...state,
                openConfirmationModal: false,
                activeStep: 1
            };
            return state;
        }
        case 'SET_TRANS_ACTIVE_STEP': {
            state = {...state, activeStep: action.data};
            return state;
        }
        case 'WRITE_TRANS_CHARACTERISTICS': {
            state = {...state, transaction: {
                ...state.transaction,
                cave: action.data.cave,
                cheminee: action.data.cheminee,
                balcon: action.data.balcon,
                surfacecave: parseInt(action.data.surfacecave),
                surfacebalcon: parseInt(action.data.surfacebalcon),
                calme: action.data.calme,
                parking: action.data.parking,
                placesparking: parseInt(action.data.placesparking),
                chambreservice: action.data.chambreservice,
                climatisation: action.data.climatisation,
                ascenseur: action.data.ascenseur,
                vueexceptionnelle: action.data.vueexceptionnelle,
                duplex: action.data.duplex,
                residencefermee: action.data.residencefermee,

                //Villa

                murmitoyen: action.data.murmitoyen,
                typevilla: action.data.typevilla,
                garage: action.data.garage,
                piscine: action.data.piscine,
                chaufeausolaire: action.data.chaufeausolaire,
                typechauffage: action.data.typechauffage,
                etatgeneral: action.data.etatgeneral,
                anneeconstruction: action.data.anneeconstruction
            }};
            return state;
        }
        case 'UPDATE_TRANS_ACTIVE_HOUSE': {
            state = {...state, active_house: action.data};
            return state;
        }
        case 'UPDATE_TRANS_LOCALIZATION': {
        state = {...state, };
            state = {
                ...state, 
                pointExist: action.data.pointExist,
                transaction: {
                    ...state.transaction,
                    localisation: action.data.localisation,
                    coordinates: action.data.localisation
                }
            };
            return state;
        }
        case 'TRANSACTION_TYPE': {
            state = {...state, 
                transaction: {
                    ...state.transaction,
                    bien: action.data
                }
            };
            return state;
        }
        case 'REGISTER_TRANS_FORM_VALUE': {
            state = {
                ...state,
                transaction: {
                    ...state.transaction,
                    sdb: action.data.sdb,
                    surfacehabitable: parseInt(action.data.surfacehabitable),
                    surface: parseInt(action.data.surface),
                    typologie: action.data.typologie,
                    orientation: action.data.orientation,
                    agencement: parseInt(action.data.agencement),
                    luminosite: parseInt(action.data.luminosite),
                    redejardin: action.data.redejardin,
                    construction: action.data.construction,
                    finition: action.data.finition,
                    etage: parseInt(action.data.etage),

                    //Villa
                    surfaceterrain: parseInt(action.data.surfaceterrain),
                    surfaceconstruite: parseInt(action.data.surfaceconstruite)
                }
            };
            return state;
        }
        case 'SAVE_TRANS_USER_DETAILS': {
            state = {
                ...state,
                transaction: {
                    ...state.transaction,
                    prix: action.data.prix,
                    consistance: action.data.prix,
                    dateTransactions: action.data.dateTransactions,
                    contributeur: action.data.contributeur,
                    dateTransactionAdded: action.data.dateTransactionAdded,
                }
            };
            return state;
        }
        case "ADD_TRANS_FIREBASE": {
            let success = true;
            let transactionId = generateID();
            const transaction = {...action.data, transactionId: transactionId};
            // db.collection('transactions').add(transaction).then(res => {
            Axios.post('https://us-central1-agenz-website-prod.cloudfunctions.net/api/addTransaction',{transaction: transaction}).then(res => {
            //   db.collection('transactions').doc(res.id).update({ id: transactionId });
              delete Axios.defaults.headers.common["Authorization"]
              delete Axios.defaults.headers.common["authorization"]
              let latitude = parseFloat(`${transaction.localisation.split("lat : ")[1].split(" ")[0]}`)
              let longitude = parseFloat(`${transaction.localisation.split("lng : ")[1]}`)
              delete transaction["prix"]
              let dataForTransac = {
                "type": "Feature",
                    "geometry": {
                      "coordinates": [
                        longitude,
                        latitude
                      ],
                      "type": "Point"
                    },
                    "properties" : transaction
              }
              Axios.put(`https://api.mapbox.com/datasets/v1/badrbelkeziz/cknpzxhzn06l127qsdz6l1vjg/features/${transactionId}/?access_token=${MAPBOX_API_KEY}`, dataForTransac)
              .then(res => {
                  Axios.post(`https://api.mapbox.com/uploads/v1/badrbelkeziz?access_token=${MAPBOX_API_KEY}`, 
                  {tileset : "badrbelkeziz.cknpzxhzn06l127qsdz6l1vjg-2hrv1",
                  url  : "mapbox://datasets/badrbelkeziz/cknpzxhzn06l127qsdz6l1vjg",
                  name : "transactions-cdp"
                  }).then (res => {
                    Axios.defaults.headers.common["Authorization"]=localStorage.getItem("FBIdToken")
                  })
                  .catch(err=>{
                    console.log(err)
                    success = false
                    Axios.defaults.headers.common["Authorization"]=localStorage.getItem("FBIdToken")

                }) 
              
              })
              .catch(err=>{
                  console.log(err)
                  success = false
                  Axios.defaults.headers.common["Authorization"]=localStorage.getItem("FBIdToken")

              })          




            }).catch(err => {
                console.log(err)
                success = false
              toast.error('L\'enregistrement de votre transaction a rencontré une erreur veuillez réessayer');
              state = {
                  ...state,
                  loadingTransaction : false
              }
              return state;
            });
            state = {
                ...state,
                loadingTransaction : false,
                addTransactionSuccess : success,
            }
            return state;
        }
        case 'SET_ACTIVE_FILTER':
            state = {
                ...state,
                activeFilter: action.data
            }
            return state;
        case 'UPDATE_OPERATOR':
            if (state.activeFilter.id === 'm2') {
                state = {
                    ...state,
                    xplorerFilters: {
                        ...state.xplorerFilters,
                        transactionProperties: {
                            ...state.xplorerFilters.transactionProperties,
                            m2: {
                                ...state.xplorerFilters.transactionProperties.m2,
                                operator: action.data
                            }
                        }
                    }
                }
            } else if (state.activeFilter.id === 'price') {
                state = {
                    ...state,
                    xplorerFilters: {
                        ...state.xplorerFilters,
                        transactionProperties: {
                            ...state.xplorerFilters.transactionProperties,
                            price: {
                                ...state.xplorerFilters.transactionProperties.price,
                                operator: action.data
                            }
                        }
                    }
                }
            } else if (state.activeFilter.id === 'date') {
                state = {
                    ...state,
                    xplorerFilters: {
                        ...state.xplorerFilters,
                        transactionProperties: {
                            ...state.xplorerFilters.transactionProperties,
                            date: {
                                ...state.xplorerFilters.transactionProperties.date,
                                operator: action.data
                            }
                        }
                    }
                }
            }
            return state;
        case 'SET_CHOSEN_FILTER':
            if (action.data.filter.id === 'bien') {
                state = {
                    ...state,
                    activeFilter: {
                        type: null,
                        id: null,
                        data: null
                    },
                    xplorerFilters: {
                        ...state.xplorerFilters,
                        transactionProperties: {
                            ...state.xplorerFilters.transactionProperties,
                            type: action.data.choice.id
                        },
                    }
                }
            } else if (action.data.filter.id === 'transactions') {
                state = {
                    ...state,
                    activeFilter: {
                        type: null,
                        id: null,
                        data: null
                    },
                    xplorerFilters: {
                        ...state.xplorerFilters,
                        transactionType: action.data.choice.id
                    }
                }
            } else if (action.data.filter.id === 'm2') {
                const display =
                    action.data.choice.id === '==' ? `Surface est égale à ${action.data.choice.value[0]} m2` :
                    action.data.choice.id === '>=' ? `Surface est supérieur à ${action.data.choice.value[0]} m2` :
                    action.data.choice.id === '<=' ? `Surface est inférieur à ${action.data.choice.value[0]} m2` :
                    action.data.choice.id === '<>' ? `Surface est entre ${action.data.choice.value[0]} et ${action.data.choice.value[1]} m2` :
                    '';
                state = {
                    ...state,
                    activeFilter: {
                        type: null,
                        id: null,
                        data: null
                    },
                    xplorerFilters: {
                        ...state.xplorerFilters,
                        transactionProperties: {
                            ...state.xplorerFilters.transactionProperties,
                            m2: {
                                operator: action.data.choice.id,
                                value: action.data.choice.value,
                                display: display
                            }
                        },
                    },
                }
            } else if (action.data.filter.id === 'price') {
                const display =
                    action.data.choice.id === '==' ? `Prix est égale à ${action.data.choice.value[0]} MAD` :
                    action.data.choice.id === '>=' ? `Prix est supérieur à ${action.data.choice.value[0]} MAD` :
                    action.data.choice.id === '<=' ? `Prix est inférieur à ${action.data.choice.value[0]} MAD` :
                    action.data.choice.id === '<>' ? `Prix est entre ${action.data.choice.value[0]} et ${action.data.choice.value[1]} MAD` :
                    '';
                state = {
                    ...state,
                    activeFilter: {
                        type: null,
                        id: null,
                        data: null
                    },
                    xplorerFilters: {
                        ...state.xplorerFilters,
                        transactionProperties: {
                            ...state.xplorerFilters.transactionProperties,
                            price: {
                                operator: action.data.choice.id,
                                value: action.data.choice.value,
                                display: display
                            }
                        },
                    },
                }
            }
            return state;
        case 'RESET_FILTERS':
            state = {
                ...state,
                activeFilter: {
                    type: null,
                    id: null,
                    data: null
                },
                xplorerFilters: {
                    ...state.xplorerFilters,
                    transactionType: 'all',
                    transactionProperties: {
                        ...state.xplorerFilters.transactionProperties,
                        m2: {
                            operator: '>=',
                            value: [0],
                            display: 'Toutes les surfaces'
                        },
                        price: {
                            operator: '>=',
                            value: [0],
                            display: 'Tous les prix'
                        },
                        type: 'all'
                    },
                },
            }
            return state;
            case "SET_MAP_LOADED" : {
                state = {
                    ...state,
                    mapLoaded : true
                }
                return state
            }
            case "SET_MAP_UNLOADED" : {
                state = {
                    ...state,
                    mapLoaded : false
                }
                return state
            }
            case "HIDE_FOLDER" : {
                const hide_folders = state.hide_folders
                hide_folders.push(action.data)
                    state = {
                        ...state,
                        hide_folders
                    }
            return state
            }
            case "SET_CONTACT_PHONE" : {
                    state = {
                        ...state,
                        visibilite : {
                            ...state.visibilite, contactPhone : action.data
                        }
                    }
            return state
            }

            case "SET_CONTACT_MAIL" : {
                state = {
                    ...state,
                    visibilite : {
                        ...state.visibilite, contactMail : action.data
                    }
                }
        return state
        }
        case "SET_CONTACT_MESSAGE" : {
            state = {
                ...state,
                visibilite : {
                    ...state.visibilite, contactMessage : action.data
                }
            }
    return state
    }
    case "SET_VITRINE_VIEWS" : {
        state = {
            ...state,
            visibilite : {
                ...state.visibilite, vitrineViews : action.data
            }
        }
return state
}

        case "SET_VISIBILITE_CHECKED" : {
            state = {
                ...state,
                visibilite : {
                    ...state.visibilite, checked : true
                }
            }
    return state
    }
    case "HIDE_ONE_MESSAGE" : {
        state = {
            ...state,
            visibilite : {
                ...state.visibilite, hiddenMessage : state.visibilite.hiddenMessage+1
            }
        }
return state
}


        default :
            return state;

    }


}

export default espaceProReducer;