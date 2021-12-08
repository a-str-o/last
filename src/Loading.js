import React, { Component } from 'react'
import LottieAnimation from './Lottie';
import logo from '../src/assets/logo_loading.json';
import './Loader.scss'



export class Loading extends Component {
    render() {
        return (
            <div className="loader--container">
               {/* <Loader type="ball-grid-pulse" />  */}
               <LottieAnimation lotti={logo} height={300} width={300} />

            </div>
        )
    }
}

export default Loading
