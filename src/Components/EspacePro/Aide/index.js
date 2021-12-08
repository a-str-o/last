import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import './index.scss'
class Aide extends Component {
    constructor(props) {
      super(props);
      this.state = {
        expanded : false,
        leads : [],
        estimations : [],
        loading : true,
        noLead : false,
        openLeadDelete : false,
        playing : true
      }
      this.player = React.createRef();
      
  }
  ref = player => {
    this.player = player
  }

  seek(seconds){
    // this.setState({ seeking: false })
    // console.log(this.player.current)
    this.player.current.seekTo(parseFloat(seconds))
    this.player.current.props.onPlay();
    this.player.current.player.props.onPlay();
    this.player.current.player.player.props.onPlay();
    
  }

  render() {



    return (
        <div className="video--page">
                            <div className="right-pannel-title agence--title-container">
                    <h5 className="agence--title">Comment utiliser Agenz Pro</h5>
                </div>
                        <div className="video--container">
<ReactPlayer
    ref={this.player}
    url="https://www.youtube.com/watch?v=dDUQR0MGfZ4"
    config={{
        youtube: {
          playerVars: { 
            autoplay: 1,
            rel : 0,
            modestbranding : 1 

          }
        }}
    }
    playing={this.state.playing}

    controls
    playbackRate = {1}
    width = "100%"
    height = "390px"
/>    </div>

<div className="chapters--container">
    <p className="chapter--title" onClick={() => {this.seek(0)}}>Chapitre 1 : Introduction</p>
    <p className="chapter--title" onClick={() => {this.seek(23)}}>Chapitre 2 : Personnalisation de la vitrine</p>
    <p className="chapter--title" onClick={() => {this.seek(65)}}>Chapitre 3 : Ajout d'une vente</p>
    <p className="chapter--title" onClick={() => {this.seek(117)}}>Chapitre 4 : Prise de rendez-vous</p>
    <p className="chapter--title" onClick={() => {this.seek(140)}}>Chapitre 5 : Édition du rapport d'estimation</p>

</div>


<h1 className="video--page--title">Support technique</h1>
<div className="chapters--container">
  <p className="technical--support"> <i class="fas fa-phone"></i> +212 6 80 81 56 34</p>
<p className="technical--support"> <i class="fas fa-at"></i> b.belkeziz@agenz.ma</p>
<p className="technical--support"> <i class="fas fa-phone"></i>+212 5 20 69 00 69</p>
<p className="technical--support"> <i class="fas fa-at"></i> contact@agenz.ma</p>
</div>

</div>


)
    
  }
}



export default Aide;
