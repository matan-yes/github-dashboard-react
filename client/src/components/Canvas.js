import React from 'react'
import CanvasJSReact from '../canvasjs-2.3.2/canvasjs.react'
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Canvas extends React.Component{
constructor(){
    super()
    this.State = {
        GitHubData : [],
        
    }
    this.fatchChartValues = this.fatchChartValues.bind(this)

}

fatchChartValues(values,option){

    var chartValues = []
    var selectedOption = option.toLowerCase()
    for(let i = 0 ; i<values.length-10; i++){
        chartValues.push({label: values[i].name ,y:values[i][selectedOption]})
    }
    return chartValues
}

render(){    
    var GitHubValues = this.fatchChartValues(this.props.canvasItems,this.props.option)
    const options = {
        title: {
            text: `${this.props.company} # of ${this.props.option} per repo`
        },
        data: [{				
            type: "column",                  
            dataPoints: GitHubValues
                  
         }]
    }
    return(
        <div>
        <CanvasJSChart options = {options}
            /* onRef = {ref => this.chart = ref} */
        />
      </div>



    )

}



}
export default Canvas