const puppeteer = require('puppeteer');
const express = require('express');
const bodyParser = require('body-parser');



// Create a new instance of express
const app = express()

// Tell express to use the body-parser middleware and to not parse extended bodies
app.use(bodyParser.urlencoded({ extended: false }))

// Route that receives a POST request to /sms
app.post('/', function (req, res) {
    
    res.set('Content-Type', 'text/plain');
//   res.send(req.body);
//use puppeteer

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();

//Config request
var request=req.body;
console.log({'Request':request} );
await page.goto(request.url)
.then(async response =>{
  var result = {};
  var arrRQ = request.request.split(',');
  await arrRQ.forEach(function (values) {
    switch (values) {
      case 'html':
      page.content()
      .then(function (rs) {
        result['html']=rs;
      }).catch(function (rs) {
        res.send({
          success : false,
          message : 'Không thể get HTML'
        });
                // process.exit(-1);
              });;
      break;
      case 'header':
      result['header']=response.headers();
      break;
      case 'cookie':
      page.cookies()
      .then(function (rs) {
        result['cookie']=JSON.stringify(rs);
      }).catch(function (rs) {
        res.send({
          success : false,
          message : 'Không thể get Cookie'
        });
                // process.exit(-1);
              });
      break;
      default:
      console.log('\nWARNING: NOT FOUND: '+'"'+values+'"\n');
    }
  })
  await page.content();
  //get cookies
  await page.cookies();
  await browser.close();
  res.send({
    success : true,
    message : 'OK',
    data : result
  });
})
.catch(function () {
  res.send({
    success : false,
    message : 'Không thể get URL'
  });
                  // process.exit(-1);
                });
//init result
// await page.screenshot({path:'ok.png'});
// await console.log('OK');


});



});
app.get('/',function (req,res) {
  res.send('Please use POST request');
})
// Tell our app to listen on port 3000
app.listen(3000, function (err) {
    if (err) {
        throw err
    };

    console.log('Server started on port 3000')
});
