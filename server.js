var http = require('http');
//var testpayment = require('./testpayment.js');
//var  testpayment = require('./test.js');
var StringBuilder = require('stringBuilder');
var qs = require('queryString');
//var wallet = require('./wallet.js');
//const faucet = require('./faucet.js')
var port = 9000;


//var walletinstance = wallet.generate('sun2moon');

//console.log(walletinstance);

/* faucet.receive('0xf811330c560af81acbba449d137d6ed1da61641f'.toString())
.then((txHash) => {

    // Log TX hash to console
console.log("Faucet Tx Hash: " + txHash)})
.catch((err) => {
    alert(err)
    spinner.stop()
  });
 */
 
 
/*  var returnfetch = fetch("https://faucet.metamask.io/", {
    method: "POST",
    body: '0xf811330c560af81acbba449d137d6ed1da61641f'
  })
  .then(function(result) {
	  console.log( 'inside then ' + JSON.stringify(result));
  })
  .catch((error) => {
		console.log('inside error '+ JSON.stringify(error));
  });
  
  console.log(returnfetch); */
  
function getHome(req, resp) {
	
				resp.writeHead(200, {"content-type" : "text/html" });
				resp.write("<html><head><title>home page </title></head><body><i> want to do some calc ? <a href='/calc' >click here</i></body></html>");
				resp.end();
	
}

function get404(req, resp) {
	
				resp.writeHead(404, "resource not found ", {"content-type" : "text/html" });
				resp.write("<html><head><title>404</title></head><body><i> 404 resource not found go to home <a href='/' >click here </i></body></html>");
				resp.end();
	
}
function get405(req, resp) {
	
				resp.writeHead(405, "method not supported" , {"content-type" : "text/html" });
				resp.write("<html><head><title>404</title></head><body><i> 404 resource not found go to home <a href='/' >click here </i></body></html>");
				resp.end();
	
}

function getCalcHtml(req, resp , data){
	var sb = new StringBuilder({newline : "\r\n"});
	
	sb.appendLine("<html>");
	sb.appendLine("<body>");
	sb.appendLine("<form method = 'post'>");
	sb.appendLine("		<table>");
	sb.appendLine("				<tr>");
	sb.appendLine("					<td>enter first no: </td>");
	
	if (data && data.txtFirstNo){
		
		sb.appendLine("					<td><input type = 'text' id='txtFirstNo' name = 'txtFirstNo' value = '{0}'/> </td>" , data.txtFirstNo);
	}
	else {
		sb.appendLine("					<td><input type = 'text' id='txtFirstNo' name = 'txtFirstNo' value = ''/> </td>");
		
	}
	
	
	sb.appendLine("				</tr>");
	sb.appendLine("				<tr>");
	sb.appendLine("					<td>enter second no: </td>");
	
	
	if (data && data.txtSecondNo){
		
		sb.appendLine("					<td><input type = 'text' id='txtSecondNo' name = 'txtSecondNo' value = '{0}'/> </td>" , data.txtSecondNo);
	}
	else {
		sb.appendLine("					<td><input type = 'text' id='txtSecondNo' name = 'txtSecondNo' value = ''/> </td>");
		
	}
	
	sb.appendLine("				</tr>");
	sb.appendLine("				<tr>");
	sb.appendLine("					<td><input type = 'submit' name = 'Calculate' value = 'Calculate'/></td>");
	sb.appendLine("					<td><input type = 'submit' name = 'dummy' value = 'dummy'/></td>");
	sb.appendLine("				</tr>");
	
		if (data && data.txtSecondNo && data.txtSecondNo && data.Calculate){
			
			var sum = parseInt(data.txtFirstNo) + parseInt(data.txtSecondNo);
			sb.appendLine("				<tr>");
			sb.appendLine("					<td><span>Sum = '{0}'</span></td>" , sum);
			sb.appendLine("				</tr>");
	}
	
	if (data && data.dummy){
			
			
			
			sb.appendLine("					<div> inside dummy function <div>" );
			
	}

	sb.appendLine("		</table>");
	sb.appendLine("</form>");
	sb.appendLine("</body>");
	sb.appendLine("</html>");
	
	
	sb.build(function(err, result){
		resp.writeHead(200, {"content-type" : "text/html" });
		resp.write(result) ;
		resp.end();
		
	})
}


function getCalcForm(req, resp , formData){
	
	resp.writeHead(200, {"content-type" : "text/html" });
	getCalcHtml(req, resp , formData);
}

http.createServer(function (req , resp) {
	
	switch(req.method) {
		
			case "GET" :
			
			console.log(req.method);
			
			if (req.url === "/") {
				console.log('inside get nethod / navigation');
				getHome(req, resp);
			} else if ((req.url === "/calc" ) || (req.url === "/calc?" )  || (req.url === "/favicon.ico")){
				console.log('inside get nethod /calc navigation');
				getCalcForm(req, resp);
			} else {
				console.log('inside get nethod before 404' + req.url);
				get404(req, resp);
			}
			
				break;
				
			case "POST": 
			console.log(req.method);
			if (req.url === "/calc"){
				console.log('inside post nethod /calc navigation');
				var reqBody = '';
				req.on('data',function(data) {
					reqBody += data;
					if (reqBody.length > 1e7 )	// 10 MB
					{
						resp.writeHead(413,"too much of data" , {"content-type" : "text/html" });
						resp.write("<html><head><title>413</title></head><body><i> 413  too much of data <a href='/' >click here </i></body></html>");
						resp.end();
						console.log(reqBody);
					}
					
				});
				req.on('end',function(data) {
					var formData = qs.parse(reqBody);
					console.log(reqBody);
					getCalcForm(req, resp, formData);
				});
				
				
			}
			else {
				console.log('inside post nethod before 404 : ' + req.url);
				get404(req, resp);
			}
				break;
			
			default:
				get405(req , resp);
				break;
	}
	
	
	
}).listen(port);
