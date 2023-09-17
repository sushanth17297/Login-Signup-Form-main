const express = require("express")
const path = require("path")
const app = express()
// const hbs = require("hbs")
const LogInCollection = require("./mongo");
const sendmail = require("./mailAuth");
const port = process.env.PORT || 3000;
app.use(express.json());
var otpStore = null;
app.use(express.urlencoded({ extended: false }));
var dataList = [];
const tempelatePath = path.join(__dirname, '../tempelates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

app.set('view engine', 'hbs')
app.set('views', tempelatePath)
app.use(express.static(publicPath))


// hbs.registerPartials(partialPath)


app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/', (req, res) => {
    res.render('login')
})



// app.get('/home', (req, res) => {
//     res.render('home')
// })

app.post('/signup', async (req, res) => {
    
    // const data = new LogInCollection({
    //     name: req.body.name,
    //     password: req.body.password
    // })
    // await data.save()

    dataList.push({
        name: req.body.name,
        password: req.body.password,
        email: req.body.mailId
    });

    const checking = await LogInCollection.findOne({ email: req.body.mailId })

   try{
    if (checking != null){
        if (checking.name === req.body.name && checking.password===req.body.password) {
            res.send("Mail ID is already registered. Please use a different mail ID")
        }
    }
    else{ 
        otpStore = sendmail(req.body.mailId);
        res.render("otp", {mailId: req.body.mailId});
    }
   }
   catch{
    res.status(201).render("signup", {
        message: req.body.name
    })
   }

    
})
app.post('/otp', async (req, res) => {
    var data = null;
    for (const item of dataList) {
        if (item.email == req.body.mailId){
            data = item;
        }
    }
    if (data != null){
        if (otpStore[req.body.mailId] == req.body.otp){
            await LogInCollection.insertMany([data]);
            res.render("login");
        }else{
            res.render("signup", {
                message: "OTP entered is mismatch! -> please re-enter the details"
            })
        }
    }else{
        res.status(500).render("signup", {
            message: "internal error in OTP handling"
        })
    }

});

app.post('/login', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ name: req.body.name })

        if (check.password === req.body.password) {
            res.status(201).render("home", { naming: `${req.body.name}` })
        }

        else {
            res.send("incorrect password")
        }


    } 
    
    catch (e) {

        res.send("wrong details")
        

    }


})



app.listen(port, () => {
    console.log('port connected');
})