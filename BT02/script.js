const puppeteer = require('puppeteer');
exports.hello = (abc) =>{
	console.log(abc)
}
exports.exec =async (script) =>{
	return await puppeteer.launch({headless:true}).then(async browser => {
		var result=[];
  		const page = await browser.newPage();
  		result[0]=page;
		for(let i in script){
			switch (script[i].type) {
				case 'visit':
					await page.goto(script[i].url)
						.then(response => {
							console.log('Visit success!')
							result[1] = response
						}, function () {
							console.log('Visit failed!')
						})
					break;
				case 'type':
					await page.type(script[i].css,script[i].content)
						.then(function () {
							console.log('Type success!')
						}, function () {
							console.log('Type failed!')
						})
					break;
				case 'click':
					await page.click(script[i].css)
						.then(function () {
							console.log('Click success!')
						}, function () {
							console.log('Click failed!')
						})
					await page.waitForNavigation({ waitUntil: 'networkidle2' });
					break;
				case 'screenshot':
					
					await page.screenshot({path:script[i].path})
						.then(function () {
							console.log('Screenshot success! Save to: '+ script[i].path)
						}, function () {
							console.log('Screenshot failed!')
						})
					break;
				default:
					// statements_def
					break;
			}
		}
		return result;
	});
	
}
console.log('Load module script success!')


