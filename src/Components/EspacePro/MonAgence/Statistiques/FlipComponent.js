import React, { Component } from 'react'
import "./DetailsVisibilite.scss"
import ReactCardFlip from 'react-card-flip';
import { CSSTransition } from 'react-transition-group';

export class FlipComponent extends Component {
    constructor() {
        super();
          this.state = {
          isFlipped: false,
          dropDown : false,
          
        };
        
        this.handleClick = this.handleClick.bind(this);

    }
    handleClick(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
      }

      dropDown(){
          this.setState({dropDown : !this.state.dropDown})
      }
    render() {
        return (
            <div className="details--item details--mail">
            <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
    <div className="details--item--container">
      <div className="details--title">{this.props.title}</div>
      <div className="details--count"><span className="view-count">{this.props.count}</span></div>
      <i class="far fa-question-circle question--flip" onClick={this.handleClick}></i>
      {this.props.count > 0 ? (
      this.state.dropDown ?(<i class="fas fa-chevron-up chevron-dropdown" onClick={()=>this.dropDown()}></i>) : (<i class="fas fa-chevron-down chevron-dropdown" onClick={()=>this.dropDown()}></i>)):("")}
      <CSSTransition
                    unmountOnExit
                    in={this.state.dropDown}
                    timeout={300}
                    classNames="dropDown">
                    {this.props.dropDownComponent}
                </CSSTransition>
   </div>

    <div className="details--item--container">
      <div className="details--text">
     {this.props.backText}
      </div>
      <i class="fas fa-times flip--times" onClick={this.handleClick}></i>
    </div>
  </ReactCardFlip>
            </div>
           
        )
    }
}

export default FlipComponent
