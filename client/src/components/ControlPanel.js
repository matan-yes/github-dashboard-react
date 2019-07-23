import React from 'react'

class ControlPanel extends React.Component{
    constructor(){
        super()
        this.state = {
            count : 0,
            searchValue : '',
            optionValue: 'stars'
        }
        this.onClickSearch = this.onClickSearch.bind(this)
        this.updateChart = this.updateChart.bind(this)
        this.handleSearchChange = this.handleSearchChange.bind(this)
    }
    handleSearchChange = (event) => {
        const {name,value} = event.target
        this.setState({[name] : value})
        
    }
    updateChart = (id)=>{
        this.setState({optionValue : id})
        this.props.controlCallBack({option:id})
    }
    onClickSearch = ()=>{
        this.props.controlCallBack({company:this.state.searchValue})
    }
    updateChartChange = (event)=>{
        const {innerText} = event.target
        this.setState({optionValue:innerText})
        this.props.controlCallBack({option:innerText})


    }
    
    
    render(){
        let hrefLink = '#'
        return(
            <div className='container'>
                <div className='row justify-content-center mt-4'>                    
                    <div className='col-md-3'>
                        <input className="form-control .form-control-lg" onKeyPress={(e)=>e.key==='Enter' ? this.onClickSearch() : null }  placeholder="Company Name (e.g. Netflix)" value={this.state.searchValue} onChange={this.handleSearchChange} name="searchValue" type="text"/>
                    </div>
                    <div className='col-md-1'>
                        <button onClick={this.onClickSearch} className='btn btn-primary'>Search</button>

                    </div>

                    
                </div>                    
                <div className='row'>
                    <div className="dropdown show">
                        <a className="btn btn-secondary dropdown-toggle" name="optionValue" value={this.state.optionValue} href={hrefLink} role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.state.optionValue}
                        </a>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <a className="dropdown-item" onClick={this.updateChartChange} href={hrefLink}>Stars</a>
                            <a className="dropdown-item" onClick={this.updateChartChange} href={hrefLink}>Forks</a>
                            <a className="dropdown-item" onClick={this.updateChartChange} href={hrefLink}>Contributors</a>
                            
                        </div>
                    </div>
                </div>
            </div>
            
            
        )
    }


}



export default ControlPanel