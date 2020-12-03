//PACKAGES REQUIRE.
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

//REQUIRED CODE FOR EVERY TIME.
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(express.static("public"));

//FOR CONNECT MONGODB.
mongoose.connect("mongodb://localhost:27017/wikiDB", {userNewUrlParser: true});

//USERSCHEMA.
const userSchema = {
    title:String,
    content:String,
};

//MAKE MODELS.
const Article = mongoose.model("Article", userSchema);

//GET REQUESTS(FOR READING DATA).
app.get("/articles",function(req,res){
    Article.find(function(err,result){
      if(!err)
       res.send(result);
       else
        res.send(err);
    });
});

//GET REQUESTS(FOR READING DATA).=>(FOR SPECIFIC PERSON).
app.get("/articles/:tags",function(req,res){
  Article.findOne({title:req.params.tags}, function(err,result){
    if(!err)
     res.send(result);
     else
      res.send(err);
  });
});

//PUT REQUESTS(UPDATE ALL,REMOVE PREVIOUS) =>(FOR SPECIFIC PERSON).
app.put("/articles/:tags",function(req,res){
  Article.update({title:req.params.tags}, {title:req.body.title, content:req.body.content}, function(err,result){
     if (err) return handleError(err);
  });
});

//PATCH REQUESTS(UPDATE AS YOU WANT TO UPDATE) =>(FOR SPECIFIC PERSON).
app.patch("/articles/:tags",function(req,res){
  Article.update({title:req.params.tags}, {$set:req.body}, function(err,result){
     if (err) return handleError(err);
  });
});

app.delete("/articles/:tags",function(req,res){
  Article.deleteOne({title:req.params.tags}, function (err) {
 if (err) return handleError(err);
 // deleted at most one tank document
});
});

//POST REQUESTS(FROM POSTMAN)
app.post("/articles",function(req,res){
   Article.create({ title:req.body.title, content:req.body.content}, function (err, small) {
  if (err) return handleError(err);
  // saved!
});
});


/*
//DELETE REQUESTS
app.delete("/articles",function(req,res){
  Article.deleteMany(function (err) {
if (err) return handleError(err);
// deleted all one Articles document.
});
});
*/


app.listen(3000, ()=> {
  console.log("Your server is on");
});
