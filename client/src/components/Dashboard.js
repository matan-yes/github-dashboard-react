import React from 'react'
import ControlPanel from './ControlPanel'
import Canvas from './Canvas'

class Dashboard extends React.Component{
    constructor(){
        super()
        this.state = {
            GitHubItems : [],
            LoadItems : [],
            isLoaded : false,
            error : null ,
            company: 'Netflix' ,
            option : "stars" 
        }
        this.controlCallBack = this.controlCallBack.bind(this)
        this.fatchCompanyData = this.fatchCompanyData.bind(this)
    }
    controlCallBack = (controlData) => {
        if(controlData.company && this.state.company !== controlData.company){
            this.setState((state,props)=>({company:controlData.company,isLoaded:false}))
            this.fatchCompanyData(controlData.company)
        }
        if(controlData.option && this.state.option !== controlData.option){
            this.setState({option:controlData.option})
            

        }
        
    }
    
    componentDidMount(){
        this.fatchCompanyData();
    }
    /*
    postRequest(){
        let params =  {name:"matan"}
        console.log('postrequest')
        fetch('http://localhost:8080/data',{
            method : "POST" ,            
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'},
            body: new URLSearchParams(params)
            
        }).then(res => {console.log(res)},err => console.log(err))
    }
    */
    fatchCompanyData(companyName = this.state.company) {
        fetch(`/data?company=${companyName}`)
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    LoadItems: result
                });
            }, (err) => {
                this.setState({
                    isLoaded: true,
                    error: err
                });
            });
    }

    render(){
        if(this.state.error){
            console.log(this.state.error)
        }
        else if(!this.state.isLoaded){
            return(
                <div>
                    <ControlPanel controlCallBack={this.controlCallBack}/>
                    <h1>Loading Data...</h1>
                </div>
            )
            
        }
        return(
            <div>
                <ControlPanel controlCallBack={this.controlCallBack}/>                
                <Canvas canvasItems = {this.state.LoadItems} option={this.state.option} company={this.state.company} />
            </div>
            
        )
    }
            

}



export default Dashboard