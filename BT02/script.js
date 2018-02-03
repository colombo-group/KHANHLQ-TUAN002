const puppeteer = require('puppeteer');

var emailID='#email';
var passID='#pass';
var btnID='#loginbutton';

puppeteer.launch({headless:false}).then(async browser => {
  const page = await browser.newPage();
  await page.goto('https://facebook.com');
  // await console.log('Facebook is opened.');
  // await page.screenshot({path: 'screenshot.png'});
  await page.setViewport({width:1000,height:1000});

  // await browser.close();
  // await console.log('Window is closed.');
//   await Promise.all([page.$('#email').type('ahihi'), page.$('#pass').type('okokokokoko'), page.$('#u_0_a').click()]).then(function(values) {
//   console.log(values);

// });
	await page.type(emailID, 'abcdefd')
		.then(function () {
			console.log('Email success!');
		}, function () {
			console.log('Email failed!');
		});
	await page.type(passID, '111')
		.then(function () {
			console.log('Pass success!');
		}, function () {
			console.log('Pass failed!');
		});
	await page.click(btnID)
			.then(function () {
			console.log('clicked');
		}, function () {
			console.log('click failed');
			console.log('Exiting...');
			process.exit(-1);
		
		});
			// Wait page load
	await page.waitForNavigation({ waitUntil: 'networkidle0' });
		//ScreenShot
	await page.screenshot({path:'login.png'});
	await console.log('Done!');
	await browser.close();
});