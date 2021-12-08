import React, { Component } from 'react'

export class LocalisationMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
    }
}
create_mapbox_transactions_url(){
    let src='https://api.mapbox.com/styles/v1/badrbelkeziz/ckqgtcbqn05nv17nzmxhff2wd/static/'
    let lng=this.props.lng
    let lat=this.props.lat
    src = src + `pin-s+102556(${lng},${lat})`
    this.props.selectedTransactions.map((item,index)=>{
        let add_src = `,pin-s-${index+1}+2196f3(${item.localisation.split("lng : ")[1]},${item.localisation.split("lat : ")[1].split(" ")[0]}})`
        src = src+add_src
    })

   
    src=src+`/${lng},${lat}`+`,${this.props.zoom},0/826x450@2x?before_layer=admin-1-boundary-bg&access_token=pk.eyJ1IjoiYmFkcmJlbGtleml6IiwiYSI6ImNraDduNjN2bDA2MGszMG5zZHRqNm5zMzIifQ.oITjlONmSiUQsFKrZfFd3w`
    this.setState({mapBoxTransactionsUrl : src})
}
    componentDidMount(){
        this.create_mapbox_transactions_url()
    }
    render() {
       
        return (
            <div className="localisation-map--container">
                <img alt="Localisation du bien sur la carte des prix"
                src={this.state.mapBoxTransactionsUrl} />

                
            </div>
        )
    }
}

export default LocalisationMap
