import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import {ThemeProvider } from '@material-ui/core/styles';
import {theme} from '../../assets/theme'
import error_404 from '../../assets/img/404.png';
import './notFound.scss';
import ReactGA from 'react-ga'

export class NotFound extends Component {
    componentDidMount(){
        ReactGA.pageview(this.props.location.pathname+ this.props.location.search);
        }

    render() {

        return (
            <ThemeProvider theme={theme}>
                <div className="not-found--container">
                 <Link to = "/" className="not-found-link"> <img src={error_404} alt="Erreur 404" className="error--404-img"/></Link>
                 <div className="error--not-found">
                 <Typography>
                    agenz.ma a récemment été mis à jour et cette page n'est plus disponible, la <Link to="/prix-immobilier">carte des prix</Link> et l'<Link to="/estimation"> estimation </Link> sont toujours disponibles.  <Link to="/contact">Contactez-nous </Link>pour signaler une erreur ou <Link to="/">retournez à l'accueil</Link>

                 </Typography>
                 </div>
                 </div>
               
                 
                 </ThemeProvider>
        )
    }
}

export default NotFound
