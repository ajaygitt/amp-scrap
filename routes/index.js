var express = require("express");
var router = express.Router();
const winston = require('winston');
const { format } = require('date-fns');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'DD/MM/YY HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
      const logObject = { timestamp, level };
      logObject.requestBody = JSON.parse(message);
      return JSON.stringify(logObject);
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' })
  ],
});


/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/getResponse", (req, res) => {
  try {
    let data = req.body;
    
    var acceptOrderKey = Object.keys(data).find(key => key.startsWith("accept_order"));
    var acceptOrderValue = data[acceptOrderKey];

    const timestamp = format(new Date(), 'dd/MM/yy HH:mm:ss');
    const logMessage = JSON.stringify(req.body);
    logger.info(logMessage);
  

    if (acceptOrderValue=="2") {
      //counter
     return res.render('singlesource_after_counter')

    } else{
      //2 - accept
     return res.render('singlesource_after_accept')

    }

  } catch (error) {

    console.log("errr",error)
  }
});

router.get('/protek',(req,res)=>{

  return res.render("protek");
})

router.post('/protek',(req,res)=>{

  return res.render("protek-post")
})

// proteck dashboard and login
router.get('/proteck-login',(req,res)=>{

  return res.render('proteck-login')
})

router.get('/proteck-dashboard',(req,res)=>{

  return res.render('proteck-dashboard')
})

//swbc counter
router.get('/swbc-counter',(req,res)=>{

  return res.render('swbc-counter')
})

router.get('/swbc-login',(req,res)=>{
  return res.render('swbc-login')
})
router.post('/swbc-login',(req,res)=>{
  return res.render('swbc_before_counter')
})

// decline swbc 
router.get('/swbc-counter-before',(req,res)=>{

  return res.render('swbc-counter-before')
})
router.post('/swbc-counter-before/Orders/:id/Items/:name/Decline',(req,res)=>{

  return res.render('swbc-counter-out')
})

// class validation portal

router.get('/cv-counter',(req,res)=>{
  return res.render('classValuation')
})

router.post('/cv-counter-out',(req,res)=>{
  return res.render('classValuationOut')
})

router.get('/cv-before-login',(req,res)=>{
  return res.render('classvaluationBeforeLogin')
})

router.post('/classValuation/Orders/:id/Items/:name/Decline',(req,res)=>{
  return res.render('cv-out')
})

module.exports = router;
