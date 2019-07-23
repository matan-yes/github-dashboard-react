const Octokit = require('@octokit/rest')


//import token value from token file. token file excluded from remote repository [github] due to privacy concerns
//file exports const contaning github api token value.
const Token = require('../config/token-config').default
const octokit = new Octokit({ auth: Token})


module.exports.fatchOrganizationReposData = (orgName,sorted=false)=>{
    return new Promise((resolve,reject)=>{
    var fatchedData = [];
    var promises = [];
    var options =  octokit.repos.listForOrg.endpoint.merge({org: orgName, type: 'public'});
    octokit.paginate(options).then(issues => {
        sorted ? sortByStarsCount(issues) : sorted=false ;
        issues.forEach(element=>{
            //con
            
            promises.push(new Promise(function(resulve,reject){
                getContributors(element).then(function(value){
                    resulve({name: element.name ,stars: element.stargazers_count , forks: element.forks_count,contributors:value});
    
                }).catch((err)=>{
                    console.error(err)
                    reject(err)
                })  
            }))
            
            
        })

        
        Promise.all(promises).then(value =>{

            resolve(value)
        }).catch(err=>{reject(err)})
    }).catch((err)=>{reject(err)})


    })
}


function sortByStarsCount(issues) {
    issues.sort(function (a, b) {
        return a.stargazers_count - b.stargazers_count;
    });
}
function getContributors(element){
    return new Promise((resolve,reject)=>{
        let options = octokit.repos.listContributors.endpoint.merge({owner: element.owner.login,repo: element.name})
        octokit.paginate(options).then(issues => {
        resolve(issues.length);
        }).catch(function(err){
        reject(err)
    })
    })
    
}

module.exports.fatchOrganizationReposDataSync = (orgName)=>{
    var promises = []
    return new Promise((resolve,reject)=>{
        
    
    octokit.repos.listForOrg({
        org: orgName,
        type: 'public'
    }).then(({ data }) => {
        //handledata
        
        
        data.forEach(element=>{
            promises.push(new Promise(function(resolve,reject){
                getContributors(element).then(function(value){
                    resolve({name: element.name ,stars: element.stargazers_count , forks: element.forks_count,contributors:value})
                }).catch((err)=>{reject(err)})
            }))
        })
        Promise.all(promises).then((value)=>{resolve(value)}).catch((err)=>{reject(err)})
    }).catch(function(err){
        resolve(err)
    })

    })

}

