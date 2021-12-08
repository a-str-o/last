import React, { Component } from 'react'
import CheckIcon from '@material-ui/icons/Check';
import './StepperEstimationDisplayRightText.scss'
class StepperEstimationDisplayRightText extends Component {
    render() {
        return (
            <div>
                <ul class="check-list">
                    <li class="check-list__item check-list__item--spaced">
                       <CheckIcon  /><span>Gratuit et sans engagement</span>
                        </li>
                        <li class="check-list__item check-list__item--spaced">
                                 <CheckIcon  /> <span>Vos données d'inscription sont uniquement déstinées à agenz dans le cadre de l'utilisation de ses services</span>
                                     </li>
                        <li class="check-list__item check-list__item--spaced">
                        <CheckIcon  /><span>En cliquant sur «&nbsp;Voir mon estimation&nbsp;», 
                                vous acceptez nos <a target="_blank" href="/conditions-d-utilisation"> conditions générales d'utilisation</a>
                                 et notre 
                                 <a target="_blank" href="/conditions-d-utilisation"> politique de confidentialité</a>.
                                 </span></li>
                                 </ul>
            </div>
        )
    }
}

export default StepperEstimationDisplayRightText
