module.exports=function NotDelete(req,res,next){
    if(req.method==="DELETE")
      res.status(401).send("delete not alowed")//האם לרשום רק req.mymeesege
      else 
      next()
  
  }