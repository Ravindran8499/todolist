const bodyParser = require("body-parser");
const express = require("express");
const https = require("https")
const app  = express();
const PORT = 3000;

 

let items = ["Buy Food","Cook Food","Eat Food"];
let workItems = [];


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))


app.get("/",function(req,res){                              //Server giving response to the browser
    let today  = new Date();
     
    
    let options = {
        weekday:'long',
        month:'long',
        day:'numeric'

    }

    let day = today.toLocaleDateString('en-US',options);
    res.render('list',{listTitle:day,newListItems :items})
   
});

app.post("/",function(req,res){
    let item = req.body.newItem;
    if(req.body.list === "Work List"){
        workItems.push(item);
        res.redirect("/work")
    }else{
        items.push(item);
        res.redirect("/")

    }
    
})


app.get("/work",function(req,res){
    res.render("list",{listTitle:"Work List",newListItems:workItems})
    
})

app.post("/work",function(req,res){
    let item = req.body.newItem;
    workItems.push(item)
    res.redirect("/work"); 
})



app.get("/about",function(req,res){
    res.render("about");
})

app.listen(PORT,function(){
    console.log("Server is starting at PORT NO: "+PORT);
})

