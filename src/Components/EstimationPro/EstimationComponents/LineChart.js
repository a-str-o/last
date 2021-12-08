import React, { Component } from 'react'
import { Line } from "react-chartjs-2";
import Indices from "../../../assets/dates_indices_casablanca.json"

class LineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
          estimation : "",
            labels :[],
            data : [],
            loading : true
        }
    }
    async setData(){
        let labels = []
        let data = []
        let estimation = this.props.estimation
        Indices.forEach(donnee => {
            let indice = 0
            labels.push(donnee.Date)
            data.unshift(estimation)
            indice = parseFloat(donnee.Indice.replace("%","").replace(",","."))/100
            //console.log(indice)
            estimation = estimation/(1+indice)


        })
        this.setState({data : data, labels : labels})
        return {data : data, labels :  labels}
        
    }
    componentDidMount(){
        this.setData().then( (res) => {
        this.setState({loading : false})
        this.setState({labels : res.labels, data : res.data})
        })
        .catch(err=>{
            console.log(err)
        })
        // console.log(<Line/>)
    }
    componentDidUpdate(prevProps) {
  
      if(prevProps.estimation !== this.props.estimation) {
        this.setData().then( (res) => {
          this.setState({loading : false})
          this.setState({labels : res.labels, data : res.data})
          })
          .catch(err=>{
              console.log(err)
          })
              }
 }


    render() {
        let data = {
            labels: this.state.labels,
            datasets: [
              {
                label: 'Évolution du prix de votre bien',
                data: this.state.data,
                fill: false,
                backgroundColor: '#2ea7f9',
                borderColor: '#2ea7f9',
                borderWidth : 1
              },
            ],
          }
          
          const options = {
            legend: {
              display: false,
              labels: {
                  fontColor: 'rgb(255, 99, 132)'
              }
            },
            scales: {
              yAxes: [
                {
                    ticks: {
                      callback: function(label, index, labels) {
                        if(index === (labels.length-1)){
                          return undefined}
                          else if (index === 0){ 
                          return undefined}
                          else {
                            return label.toLocaleString('fr-FR', { minimumFractionDigits: 0 })

                          } 

                        
                      
                      },
                    beginAtZero: false,
                    min : this.props.estimation/1.035,
                    max : this.props.estimation*1.135
                  },
                },
              ],
            },
          }
          
        

        
        return (
            <>
            {this.state.loading ? ('')
                : (
            <div>
                    <Line data={data} options={options} />
            </div>
                )}
                </>
        )
    }
}

export default LineChart
