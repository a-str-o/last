import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';
import logo from '../../assets/img/agenz-logo-white.png';
function Footer() {
    const menus = [
        {
            title: 'Accueil',
            path: '/'
        },
        {
            title: 'Carte des prix',
            path: '/prix-immobilier'
        },
        {
            title: 'Estimer un bien',
            path: '/estimation'
        },
        {
            title: 'Publication',
            path: '/publication'
        },
        {
            title: 'Contact',
            path: '/contact'
        },
        {
            title: "Conditions d'utilisation",
            path: '/conditions-d-utilisation'
        }
    ]; //Menu items
    return (
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <img src={logo} alt="" />
                        <p>
                            <span className="footer-title">A propos</span>
                            <br></br>
                            Agenz a pour mission de rendre le marché immobilier plus transparent.
                            Nous développons des solutions d’analyse immobilière et de conseil, pour permettre à nos clients de prendre des décisions immobilières éclairées et d’accélérer leur activité. Agenz réunit une équipe unique au Maroc d'experts immobiliers et de data-scientists pour concevoir les outils les plus aboutis et les plus précis du marché.
                        </p>
                        <p>
                            <span className="footer-title">Nos données</span>
                            <br></br>
                            De façon continue  nous collectons, analysons, et structurons toutes données reliées au marché de l’immobilier, telles que les offres, les transactions, les données cadastrales, socio-démographiques, et bien plus encore.
                        </p>
                        <p>
                            <span className="footer-title">Notre technologie</span>
                            <br></br>
                            Nos data-scientists développent des algorithmes de Machine Learning pour alimenter les solutions d’estimations les plus précises qui soit.
                        </p>
                    </div>

                    <div className="col-md-6 navHolder">
                        <div className="navigation">
                            <ul>
                            {menus.map((menu, index) => {
                                return(
                                    <li key={index}>
                                        <Link to={menu.path}>{menu.title}</Link>
                                    </li> 
                                );
                            })}
                                <li>
                                    <a aria-label="Linkedin" href="https://www.linkedin.com/company/agenztechnologies/" target="_blank" rel="noreferrer">
                                        <i class="fab fa-linkedin"></i>
                                    </a>
                                    <a aria-label="Facebook" href="https://www.facebook.com/Agenztechnologies" target="_blank" rel="noreferrer">
                                        <i class="fab fa-facebook-square"></i>
                                    </a>
                                    <a aria-label="Instagram" href="https://instagram.com/agenztechnologies?igshid=phojs1c327cd" target="_blank" rel="noreferrer">
                                        <i class="fab fa-instagram-square"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        
                    </div>
                </div>

            </div>
            
            <div className="copy-right">Copyright © {new Date().getFullYear()} agenz - Tous droits réservés</div>
        </div>
    );
}

export default Footer;
