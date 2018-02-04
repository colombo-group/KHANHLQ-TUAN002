// let data='{"type":"visit","url":"https://facebook.com"}=>{"type":"type","css":"#email","content":"kpmquockhanh"}=>{"type":"type","css":"#pass","content":"khaumat"}=>{"type":"click","css":"#loginbutton"}=>{"type":"screenshot","path":"ok.png"}';
exports.convert =(string) =>{
	let script= [];
	let i=0;
	let arr=string.split('=>');
	for(let i in arr)
	{
		try {
			script[i]= JSON.parse(arr[i]);
  			i++;
		} catch(e) {
			// statements
			console.log("Incorrect format!");
			script='';
			return script;
		}
  			
	
  	}
	return script;
}
console.log('Load module strtoarr success!')
