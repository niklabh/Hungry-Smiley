function JSONscriptRequest(fullUrl) {
    this.fullUrl = fullUrl; 
    this.noCacheIE = '&noCacheIE=' + (new Date()).getTime();
    this.headLoc = document.getElementsByTagName("head").item(0);
    this.scriptId = 'YJscriptId' + JSONscriptRequest.scriptCounter++;
}
JSONscriptRequest.scriptCounter = 1;
JSONscriptRequest.prototype.buildScriptTag = function () {
    this.scriptObj = document.createElement("script");    
    this.scriptObj.setAttribute("type", "text/javascript");
    this.scriptObj.setAttribute("src", this.fullUrl + this.noCacheIE);
    this.scriptObj.setAttribute("id", this.scriptId);
}
JSONscriptRequest.prototype.removeScriptTag = function () {
    this.headLoc.removeChild(this.scriptObj);  
}

JSONscriptRequest.prototype.addScriptTag = function () {
    this.headLoc.appendChild(this.scriptObj);
}
function generateQRCODE(iitag,iisize,url) {	
	if (url) {
		var thistext = url;
	} else {
		var thistext = location.href;
	}
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ";
	var string_length = 8;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}	
	document.write("<div id='tagcx_"+randomstring+"'></div>");
	request = 'http://www.tag.cx/qr-codes/ajax-qrcode.php?tag='+iitag+'&isize='+iisize+'&t='+randomstring+'&url='+url+'&str='+escape(thistext)+'&callback=getBM';
	aObj = new JSONscriptRequest(request);
	aObj.buildScriptTag();
	aObj.addScriptTag();
}

function getBM(jData) {
	if (jData == null) {
		alert("There was a problem parsing search results.");
		return;
	}
	var myval = jData.ResultSet;
	var mydiv = jData.xxMyDiv;
	document.getElementById(mydiv).innerHTML =  myval;
}
