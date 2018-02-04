const puppeteer = require('puppeteer');
const express = require('express');
const bodyParser = require('body-parser');
const sc = require('./script');
const strtoarr = require('./strtoarr')


// console.log(JSON.parse(script.split('|')[0]))
// Create a new instance of express
const app = express()

// Tell express to use the body-parser middleware and to not parse extended bodies
app.use(bodyParser.urlencoded({ extended: false }))

// Route that receives a POST request to /sms
app.post('/', function (req, res) {
    
    res.set('Content-Type', 'text/json');
//   res.send(req.body);
//use puppeteer

puppeteer.launch().then(async browser => {
  
  // sc.exec(script);
//Config request
  let request=await req.body;
  const page = await sc.exec(strtoarr.convert(request.script));
  let result = {};
  let arrRQ = request.request.split(',');
  for(let i in arrRQ){
    switch (arrRQ[i]) {
      case 'html':
        await page.content()
      .then(function (rs) {
        console.log('Get HTML success!')
        result['html']=rs;
      }).catch(function (rs) {
        res.send({
          success : false,
          message : 'Get HTML failed!'
        });
                // process.exit(-1);
              });
      break;
      case 'header':
      console.log('Get Header success!')
      result['header']=await response.headers();
      break;
      case 'cookie':
        await page.cookies()
      .then(function (rs) {
        console.log('Get Cookie success!')
        result['cookie']=JSON.stringify(rs);
      }).catch(function (rs) {
        res.send({
          success : false,
          message : 'Get Cookie failed!'
        });
                // process.exit(-1);
              });
      break;
      default:
      console.log('\nWARNING: NOT FOUND: '+'"'+values+'"\n');
    }
  }

  await browser.close();
  res.send({
    success : true,
    message : 'OK',
    data : result
  });
  await console.log('Done!')
  await browser.close();
  // await process.exit(-1);
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