const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const request=require("request");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signUp.html");
})
app.post("/",function(req,res){
    const firstName=req.body.fname;
    const lastName=req.body.lname;
    const email=req.body.email;
    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    }
    const JsonData=JSON.stringify(data);
    const url="https://us9.api.mailchimp.com/3.0/lists/971bbde3a6";
    const options={
        method:"post",
        auth:"bansal22:a9587cc8526cf01dc6639fd1981d766c3-us9"
    }
    const request=https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(JsonData);
    request.end();
})
app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT||3000,function(){
    console.log("Server is running on port 3000");
})
// API key 
// 9587cc8526cf01dc6639fd1981d766c3-us9
// List Id 
// 971bbde3a6