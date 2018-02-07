const express= require('express');
const hbs = require('hbs');

let app=express();

//register the template partials
hbs.registerPartials(`${__dirname}/views/partials`);

//register hbs helpers
hbs.registerHelper("getCurrentYear",()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});
//set the view engine to handelbars
app.set('view engine', 'hbs');



//middleware function
app.use((req,res,next)=>{
    let currentTime = new Date().toLocaleTimeString();
    console.log(`${currentTime} : ${req.method} : ${req.url}`);
    next(); //called to move the execution futher from middleware to the routes
});

app.use((req,res,next)=>{
    res.render('maintainence.hbs');
})

//to serve static content from a directory
app.use(express.static(__dirname+"/public"))

app.get("/",(req,res)=>{
    res.render("home.hbs",{
        pagetitle:'Home page templated',
        welcomeMessage:"Welcome with templated message",
      
    });
});

app.get("/about",(req,res)=>{
    res.render("about.hbs",{
        pagetitle:'About page templated',
        
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        error:'unable to fulfill request'
    })
})

app.listen(4000,(err)=>{
    if(err)console.log(err);
    console.log("Server up and running on port 4000")
});