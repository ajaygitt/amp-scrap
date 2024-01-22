var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/getResponse", (req, res) => {
  try {
    let data = req.body;
    let resData = {
      responseParam1: 1,
      responseParam2: 2,
      responseParam3: 3,
      responseParam4: 4,
      success: false,
    };

    var acceptOrderKey = Object.keys(data).find(key => key.startsWith("accept_order"));
    var acceptOrderValue = data[acceptOrderKey];

    if (acceptOrderValue=="1") {
      //counter
      resData.success = true;
     return res.render('singlesource_after_counter')

    } else{
      //2 - accept
     return res.render('singlesource_after_accept')

    }

  } catch (error) {

    console.log("errr",error)
  }
});
module.exports = router;
