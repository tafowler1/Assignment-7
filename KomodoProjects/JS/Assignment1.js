/* exported Orders */
/* exported GetOrderHistory */
/* exported GetOrders */
/* exported GetCustomerOrders */
/* exported UpdateOrder */
/* exported ToAddCustomer*/
/* exported AddCustomer*/
/* exported DeleteCustomer*/
/* exported ModifyOrder*/

function MenuChoice(selection)
{
    document.getElementById("Area1").style.display="none";
    document.getElementById("Area2").style.display="none";
    document.getElementById("Area3").style.display="none";
    document.getElementById("Area5").style.display="none";
    document.getElementById("Area7").style.display="none";
    document.getElementById("Area8").style.display="none";
    document.getElementById("Area9").style.display="none";
    document.getElementById("Area10").style.display="none";
    document.getElementById("Area11").style.display="none";
    document.getElementById("Area12").style.display="none";
    switch(selection)
    {
        case "Area1":
            document.getElementById("Area1").style.display="initial"; ListCustomers();
            break;
        case "Area2":
            document.getElementById("Area2").style.display="initial";
            break;
        case "Area3":
            document.getElementById("Area3").style.display="initial";
            break;
        case "Area5":
            document.getElementById("Area5").style.display="initial";
            break;
        case "Area7":
            document.getElementById("Area7").style.display="initial";
            break;
        case "Area8":
            document.getElementById("Area8").style.display="initial";
            break;
        case "Area9":
            document.getElementById("Area9").style.display="initial";
            break;
        case "Area10":
            document.getElementById("Area10").style.display="initial";
            break;
        case "Area11":
            document.getElementById("Area11").style.display="initial";
            break;
        case "Area12":
            document.getElementById("Area12").style.display="initial";
            break;
        case "None":
            break;
        default:
            alert("Please select a menu option");
    }
}

function ListCustomers()
{   document.getElementById("Area4").style.display="none";
    document.getElementById("Area2").style.display="none";
    document.getElementById("Area3").style.display="none";
    document.getElementById("Area5").style.display="none";
    document.getElementById("Area6").style.display="none";
    document.getElementById("Area7").style.display="none";
    document.getElementById("Area8").style.display="none";
    document.getElementById("Area9").style.display="none";
    document.getElementById("Area10").style.display="none";
    document.getElementById("Area11").style.display="none";
    document.getElementById("Area12").style.display="none";
    document.getElementById("Area1").style.display="initial";
    var xmlhttp= new XMLHttpRequest();
    var url ="https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCustomers";
    
    xmlhttp.onreadystatechange=function() {
        if(xmlhttp.readyState== 4 && xmlhttp.status==200){
            var output=JSON.parse(xmlhttp.responseText);
            GenerateOutput(output);
        }
  };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  


function GenerateOutput(result)
{
    var display="<table><tr><th>Company Name</th><th>Customer ID</th><th>City</th><th>Current Orders</></tr>";
    var count=0;
    var companyname="";
    var customerid="";
    var city="";
    var currentorders="";
    var deletecustomer="";
    
    for(count =0; count<result.GetAllCustomersResult.length; count++)
    {
        customerid =result.GetAllCustomersResult[count].CustomerID;
        companyname ='<a href="javascript:Orders('+"'"+customerid+"');"+'">';
        companyname+=result.GetAllCustomersResult[count].CompanyName;
        companyname+='</a>';
        city=result.GetAllCustomersResult[count].City;
        currentorders= '<button onclick= GetOrders(\'' + result.GetAllCustomersResult[count].CustomerID + '\') class=button> Current Orders</button>';
        deletecustomer= '<button onclick=  DeleteCustomer(\'' + result.GetAllCustomersResult[count].CustomerID + '\'); type="submit" class=button>Delete Customer</button>';
        display+="<tr><td>"+customerid+"</td><td>"+companyname+"</td><td>"+city+"</td><td>"+currentorders+"</td><td>"+deletecustomer+"</td></tr>";
        
    }
    display+="</table>" + "<br>" + '<a href="javascript:MenuChoice()">Go Back</a>';
    document.getElementById("listcustomers").innerHTML=display;
}

}
 function Orders(customerid)
 {
    var xmlhttp= new XMLHttpRequest();
    var url=
    "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
    url += customerid;
    
    xmlhttp.onreadystatechange=function() {
        if(xmlhttp.readyState== 4 && xmlhttp.status==200){
            var output=JSON.parse(xmlhttp.responseText);
            GenerateOutput(output);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
 }
    function GenerateOutput(result)
    {
        var display="<table><tr><th>Product Name</th><th>Total</th></tr>";
        var count=0;
        for(count=0; count<result.length; count++)
        {
            display+="<tr><td>"+ result[count].ProductName + "</td><td>"+ result[count].Total +"</td></tr>";
        }
        display+="</table>" + '<a href="javascript:ListCustomers()">Go Back</a>';
        document.getElementById("listcustomers").innerHTML=display;
         MenuChoice("Area1");
    }
 


function GetOrderHistory ()
{//Create URL and Query string
    var objRequest = new XMLHttpRequest();
    var url= "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
    url +=document.getElementById("CustID").value;

    
    //Checks that the object has returned data
    objRequest.onreadystatechange=function()
    {
        if(objRequest.readyState==4 && objRequest.status==200)
        {
            var output = JSON.parse(objRequest.responseText);
            GenerateOutput(output);
        }
    };
    
    //Initiate the server request
    objRequest.open("GET", url, true);
    objRequest.send();
}

function GenerateOutput(result)
{
    var count=0;
    var displaytext= "<table><tr><th>Product Name </th><th>Quantity</th></tr>";
    
    for(count=0; count < result.length; count++)
    {
        displaytext += "<tr><td>" + result[count].ProductName +"</td><td>" + result[count].Total+"</td></tr>";
    }
    displaytext += "</table>";
    
    document.getElementById("orderdisplay").innerHTML=displaytext;
}


function GetOrders(customerid)
 {  
    var xmlhttps= new XMLHttpRequest();
    var url= "https://student.business.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/";
    url += customerid;
    
    xmlhttps.onreadystatechange=function() {
        if(xmlhttps.readyState== 4 && xmlhttps.status==200){
            var output=JSON.parse(xmlhttps.responseText);
            GeneratedaOutput(output);
        }
    };
    xmlhttps.open("GET", url, true);
    xmlhttps.send();
 }
    function GeneratedaOutput(result)
    {   var currentorders=document.getElementById("currentorders");
        currentorders.innerHTML="";
        var display="<table><tr><th>Order ID</th><th>Ship to Address</th><th>Ship City</th><th>Ship Name</th><th>Ship Post Code</th></tr>";
        var count=0;
        for(count=0; count<result.GetOrdersForCustomerResult.length; count++)
        {
            display+="<tr><td>"+ result.GetOrdersForCustomerResult[count].OrderID +
            "</td><td>"+ result.GetOrdersForCustomerResult[count].ShipAddress +"</td><td>" + result.GetOrdersForCustomerResult[count].ShipCity + "</td><td>" +
            result.GetOrdersForCustomerResult[count].ShipName + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipPostcode +"</td></tr>";
        }
        display+="</table>" + "<br>" + '<a href="javascript:ListCustomers()">Go Back</a>';
        document.getElementById("currentorders").innerHTML=display;
        document.getElementById("Area1").style.display="none";
        document.getElementById("Area4").style.display="initial";

    }   
    
function GetCustomerOrders()
 {  
    var xmlhttP= new XMLHttpRequest();
    var url= "https://student.business.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/";
    url += document.getElementById("customername").value;
    
    xmlhttP.onreadystatechange=function() {
        if(xmlhttP.readyState== 4 && xmlhttP.status==200){
            var output=JSON.parse(xmlhttP.responseText);
            GeneratEOutput(output);
        }
    };
    xmlhttP.open("GET", url, true);
    xmlhttP.send();
 
    function GeneratEOutput(result)
    {   
        var modifyorder="";
        var display="<table><tr><th>Order ID</th><th>Ship to Address</th><th>Ship City</th><th>Ship Name</th><th>Ship Post Code</th><th>Update Order</th></tr>";
        var count=0;
        for(count=0; count<result.GetOrdersForCustomerResult.length; count++)
        {
            modifyorder='<button onclick= UpdateOrder(\'' + result.GetOrdersForCustomerResult[count].OrderID + '\') class=button> Update </button>';
            display+="<tr><td>"+ result.GetOrdersForCustomerResult[count].OrderID +
            "</td><td>"+ result.GetOrdersForCustomerResult[count].ShipAddress +"</td><td>" + result.GetOrdersForCustomerResult[count].ShipCity + "</td><td>" +
            result.GetOrdersForCustomerResult[count].ShipName + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipPostcode +"</td><td>" + modifyorder + "</td></tr>";
        }
        display+="</table>" + "<br>" + '<a href="javascript:ListCustomers()">Go Back</a>';
        document.getElementById("displaycustomerorders").innerHTML=display;

    }
 }
    
    function UpdateOrder(orderID){
         document.getElementById("Area5").style.display="none";
         document.getElementById("Area1").style.display="none";
         document.getElementById("Area2").style.display="none";
         document.getElementById("Area3").style.display="none";
         document.getElementById("Area4").style.display="none";
         document.getElementById("Area7").style.display="none";
         document.getElementById("Area8").style.display="none";
         document.getElementById("ARea9").style.display="none";
         document.getElementById("Area10").style.display="none";
         document.getElementById("Area11").style.display="none";
         document.getElementById("Area12").style.display="none";
        document.getElementById("Area6").style.display="initial";
	if(orderID == 'default') return;
	var xhttp;
	xhttp = new XMLHttpRequest();
    var url="https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderInfo/";
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.response);
			document.getElementById('OrderID').value = data[0].OrderID;
			document.getElementById('ShipName').value = data[0].ShipName;
			document.getElementById('ShipAddress').value = data[0].ShipAddress;
			document.getElementById('ShipCity').value = data[0].ShipCity;
			document.getElementById('ShipPostcode').value = data[0].ShipPostcode;
		}
	};
	xhttp.open('GET', url + orderID, true);
	xhttp.send();
}
    function ModifyOrder(){
       
	var OrderID = document.getElementById('OrderID');
	var ShipAddress = document.getElementById('ShipAddress');
	var ShipCity = document.getElementById('ShipCity');
	var ShipName = document.getElementById('ShipName');
	var ShipPostcode = document.getElementById('ShipPostcode');
	var UpdateOrder = {"OrderID":OrderID.value, "ShipAddress":ShipAddress.value, "ShipCity":ShipCity.value, "ShipName":ShipName.value, "ShipPostCode":ShipPostcode.value};
	var xhttp;
	xhttp = new XMLHttpRequest();
    var url="https://student.business.uab.edu/jsonwebservice/service1.svc/UpdateOrderAddress";
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.response);
	
			switch(data)
			{
				case 1:
					alert("Order was updated and you will return to Customer Listing");
					break;
				case 0:
					alert("Something went wrong, the order failed to update");
					break;
				case -2:
					alert("Order failed to update - The data string supplied could not be deserialized into the service object");
					break;
				case -3:
					alert("Order failed to update - A record with the supplied identifier could not be found");
					break;
			}
            ListCustomers();

			
		}
	};
	xhttp.open('POST', url, true);
	xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhttp.send(JSON.stringify(UpdateOrder));
}
    
 function DeleteCustomer(customerid)
 { var confirmation =confirm("Are you sure you want to delete this customer?");
    var deleteRequest = new XMLHttpRequest();
    //var CustomerID =document.getElementById("customerid").value;
    var url= "https://student.business.uab.edu/jsonwebservice/service1.svc/deleteCustomer/";
    url += customerid;
    
    //Checks that the object has returned data
    deleteRequest.onreadystatechange=function()
    {
        if(deleteRequest.readyState==4 && deleteRequest.status==200)
        {
            var result = JSON.parse(deleteRequest.responseText);
            Generatedeleteresult(result);
        }
    };
    
    //Initiate the server request
    deleteRequest.open("GET", url, true);
    deleteRequest.setRequestHeader ("Content-type", "application/x-www-form-urlencoded");
    deleteRequest.send();
}

function Generatedeleteresult(result)
{
    if (result.DeleteCustomerResult.WasSuccessful == 1)
    {
       alert("The customer was deleted successfully.");
        
    }
    else
    {
        alert ("Something went wrong, the customer was not deleted successfully." + "<br>" + result.DeleteCustomerResult.Exception);
    }
    MenuChoice("Area1");

    
}
function ToAddCustomer()
{document.getElementById("Area4").style.display="none";
    document.getElementById("Area2").style.display="none";
    document.getElementById("Area3").style.display="none";
    document.getElementById("Area5").style.display="none";
    document.getElementById("Area6").style.display="none";
    document.getElementById("Area1").style.display="none";
    document.getElementById("Area8").style.display="none";
    document.getElementById("Area9").style.display="none";
    document.getElementById("Area10").style.display="none";
    document.getElementById("Area11").style.display="none";
    document.getElementById("Area12").style.display="none";
    document.getElementById("Area7").style.display="initial";
    }

function AddCustomer ()
{
    //Create URL and Query string
    var objRequest = new XMLHttpRequest();
    var url= "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
    
    var CustomerID =document.getElementById("CustomerID").value;
    var CompanyName =document.getElementById("CompanyName").value;
    var CompanyCity =document.getElementById("City").value;
    
    var addcustomer = '{"CustomerID":"'+ CustomerID +'","CompanyName":"' + CompanyName + '", "City":"' + CompanyCity + '"}';
    
    //Checks that the object has returned data
    objRequest.onreadystatechange=function()
    {
        if(objRequest.readyState==4 && objRequest.status==200)
        {
            var result = JSON.parse(objRequest.responseText);
            GenerateOutput(result);
        }
    };
    
    //Initiate the server request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader ("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(addcustomer);
}

function GenerateOutput(output)
{ 
    if (output.WasSuccessful == 1)
    {
        alert ("The customer was added successfully.");     
    }
    else
    {
        alert ("Something went wrong, the customer was not added successfully." + "<br>" + output.Exception);
    }
    var display=
    document.getElementById("listcustomers").innerHTML=display;
    MenuChoice("Area1");
}

function	Location()	
{
				var	geo	=navigator.geolocation;	
				if	(geo)
				{
				geo.getCurrentPosition(showPosition);
				}
				else
				{
				alert("Geolocation	is	not	supported");
				}
}

function	showPosition(position)
{
				var	latitude = position.coords.latitude;
				var	longitude =	position.coords.longitude;
				document.getElementById("latitude").innerHTML=latitude;
				document.getElementById("longitude").innerHTML=longitude;
}


function CapturePhoto()
{
	navigator.camera.getPicture(onSuccess, onFail, { quality:20, destinationtype:
    destinationtype.FILE_URI,saveToPhotoAlbum:true, targetWidth:550, targetHeight:550 });

}

function onSuccess(imageURI)
{
	var	picdisplay =document.getElementById("snapshot");
    picdisplay.style.display='block';
	picdisplay.src=imageURI;	
}

function onFail(message)
{
 alert("Failed because: " +	message);
}

function pickContact()
{
	navigator.contacts.pickContact(function(contact)	
	{
	var	contactlist	="";
	contactlist	+=contact.name.givenName + ""+ contact.name.familyName +"<br>";
	var	count=0;
	if	(contact.phoneNumbers !==null) 
	{
	for	(count=0; count<contact.phoneNumbers.length;count++)	
	{
	contactlist	+=contact.phoneNumbers[count].type+":"+ contact.phoneNumbers[count].value+"<br>";
	}
	}
	if	(contact.emails	!==null)
	{
	for(count=0;count<contact.emails.length;count++)	
	{
	contactlist	+=contact.emails[count].type+": "+contact.emails[count].value+"<br>";
	}
	}
	document.getElementById("contactname").innerHTML=contactlist;
	},
    function(err)
	{
	alert("Error:"+err);							
}
); }
    
    function SearchList(){
        
    var lastname = document.getElementById("LastName").value;
    var options  = new ContactFindOptions();
    options.filter = lastname;
    options.multiple=true;
    options.desiredFields =[navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name, navigator.contacts.fieldType.phoneNumbers];
    options.hasPhoneNumber =true;
    var fields =[navigator.contacts.fieldType.displayName];
    navigator.contacts.find(fields, onSuccesS, onError, options);
    
function onSuccesS(contacts) {
    alert('You have ' + contacts.length + ' contacts with this last name.');
    var count="";
    var table = document.createElement ("table");
    table = "<table border = 1><tr><th>Display Name</th><th>Phone Numbers</th/</tr>";
    for (var i = 0; i<contacts.length; i++){
        
        var phone = "";
        var name = contacts[i].name.formatted;
        if (contacts.phoneNumbers !== null) 
{
for (count=0; count < contacts[i].phoneNumbers.length; count++) 
{
phone += contacts[i].phoneNumbers[count].value + ", ";
}
        }   
    table += "<tr><td>" + (name) + "</td><td>" + (phone) + "</td></tr>";
    }
    document.getElementById("contactname").innerHTML = table;
}
function onError(contactError) {
    alert('onError!');
}


}

function checkConnectionType() {
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
    alert('Connection type: ' + states[networkState]);
}
checkConnectionType();