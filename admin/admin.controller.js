



async function addAdmin(req,res) {
    try{
       if(req.body.password == "porto11$uz" && req.body.login =="Porto11$uz"){
        return res.status(200).send(true)
       } else{
        return res.status(200).send(false)
       }    
    }catch(err){
        res.status(400).send(err)
    }
}



module.exports={

    addAdmin
 
}