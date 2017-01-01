// Function To Generate Table Row
function createRow(account, filename, status){
    // Create Table Row
    var tableRow = Ti.UI.createTableViewRow({ height: 30 });

    // Create Table Row Columns
    var accountView   = Ti.UI.createView({ left : 0,     width : "25%", height: Ti.UI.Size });
    var filenameView  = Ti.UI.createView({ left : "25%", width : "25%", height: Ti.UI.Size });
    var statusView   = Ti.UI.createView({ left : "50%", width : "50%", height: Ti.UI.Size });
   

    // Create Table Row Column Labels
    accountView.add(Ti.UI.createLabel({   top: 5, right: 5, bottom: 5, left: 5, text: account }));
    filenameView.add(Ti.UI.createLabel({  top: 5, right: 5, bottom: 5, left: 5, text: filename }));
    statusView.add(Ti.UI.createLabel({   top: 5, right: 5, bottom: 5, left: 5, text: status }));
    

    // Add Columns To Table Row
    tableRow.add(accountView);
    tableRow.add(filenameView);
    tableRow.add(statusView);


    // Resource Clean-Up
    account = filename = status = null;

    // Finished
    return tableRow;
}

// Create Table Data
	//Array to store the data from the todo list
	var dataArray = [];
	//We execute the function to show the data for the first view
	getTransList();
	
	function getTransList () {
		//function to use HTTP to connect to a web server and transfer the data.
		var st_rest_it = Ti.Network.createHTTPClient({
			onerror: function(e){
				Ti.API.debug(e.error);
				alert('Error connecting to SecureTransprot API');
			},
		    timeout:10000,
		});
		var endTimeAfter = new Date(new Date().getTime() - 480*60*1000).toUTCString().replace("GMT", "+0000");	
		//Connection details follow next
		st_rest_it.validatesSecureCertificate = false;
		st_rest_it.open('GET', 'https://172.17.0.2:444/api/v1.2/transfers/?limit=500&endTimeAfter='+endTimeAfter);  
		authstr = 'Basic ' + Titanium.Utils.base64encode('admin' + ':' + 'admin');
		st_rest_it.setRequestHeader('Authorization', authstr);
		st_rest_it.setRequestHeader('Content-Type','application/json');
		st_rest_it.send(); 
		//Creating a function to parse json data on sucesfull resposne only
		st_rest_it.onload = function(){
			var json = JSON.parse(this.responseText);

			//Make sure that any previous data is deleted 
			dataArray = [];
			
			//Place parsed json data in a non-fancy table 
			for( var i=0; i<json.transferEntries.length; i++){
			dataArray.push(createRow(json.transferEntries[i].transferEntry.account, json.transferEntries[i].transferEntry.status, json.transferEntries[i].transferEntry.filename));
			};
			
			$.tableView.setData(dataArray);			
		 };
	};

//reload chart view when the tab is opened
$.mainTabGroup.addEventListener('focus', function(e) {
    if (e.index == 1) {
        $.mainView.reload();
    }
});
	$.mainTabGroup.open();