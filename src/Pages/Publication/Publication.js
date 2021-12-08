import React, {Suspense, lazy, Component } from 'react';
import Loading from "../../Loading"
import ReactGA from 'react-ga'
const PublicationComponent =lazy(()=> import ('../../Components/PublicationComponent/PublicationComponent'));
const LastNews =lazy(()=> import ('../../Components/LastNews/LastNews'));



class Publication extends Component {

    

    componentDidMount(){
        ReactGA.pageview(this.props.location.pathname+ this.props.location.search);
        }

    
    render() {
        
        return (
            <div>
                  <Suspense fallback={<Loading />}>
                <PublicationComponent id={this.props.match.params.uid} />
                </Suspense>

                <div className="container main-container">
                    <div className="row justify-content">
                        <div className="col-md-12">
                        <Suspense fallback={<Loading />}>
                            <LastNews />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Publication;