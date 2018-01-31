const puppeteer = require('puppeteer');
// const http = require('http');
puppeteer.launch().then(async browser => {
    const page = await browser.newPage();

  //Config request
    var request={
        url : 'https://google.com.vn',
        request : 'cookie,header,html',
        script : {}
    };
  var response = await page.goto(request.url);
// await browser.close();
  //init result
  var result = [];
  //Process request
    //get html
  var arrRQ = request.request.split(',');
  await arrRQ.forEach(function (values) {
      switch (values) {
            case 'html':
                page.content().then(function (rs) {
                    result['html']=rs;
                },function (rs) {
                    console.log({
                        success : false,
                        message : 'Không thể khởi động selenium/phantomjs/puppetee'
                    });
                    process.exit(-1);
                });
              break;
            case 'header':
              result['header']=response.headers();
              break;
            case 'cookie':
            page.cookies()
            .then(function (rs) {
                result['cookie']=JSON.stringify(rs);
            }).catch(function (rs) {
                console.log({
                    success : false,
                    message : 'Không thể khởi động selenium/phantomjs/puppetee'
                });
                process.exit(-1);
            });
            break;
            default:
                console.log('\nWARNING: NOT FOUND: '+'"'+values+'"\n');
        }
    })
    //get html
    await page.content();
    //get cookies
    await page.cookies();
    //In ket qua
    await console.log({
        success : true,
        message : 'OK',
        data : result
    });
   await browser.close();
});