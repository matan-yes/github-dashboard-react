const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8000;
const gitHubController = require('./src/controllers/GithubController');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

//get data from the controller
//sort data by stars
var fatchData = (companyName)=>{ 
    return gitHubController.fatchOrganizationReposDataSync(companyName).then((data)=>{
    data.sort((a,b)=>{return a.stars - b.stars})
    return data
        
}).catch(err=>{console.log(err)})
}


//retrive company name from reques and response with fatched data to as json 
app.get('/data',function (req,res){
    let companyName = req.query.company;
    fatchData(companyName).then().then((data)=>{
      res.json(data);
    })
    
})


  
  app.listen(port,()=>{
    console.log(`App: listening to port ${port}`);
});
