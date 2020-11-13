let basketContent = JSON.parse(localStorage.basketContent);
let totalPrice = null;


function fillBasket(){
	//let basketContent = JSON.parse(localStorage.basketContent);
	basketContent.forEach((item) => {
		let divParent = document.getElementById('divJS');
		let divWrapper = document.createElement("div");

		addName(item, divWrapper);
		addPrice(item, divWrapper); 
		divParent.appendChild(divWrapper);
})
}
fillBasket();

function addName(item, divParent){
	let name = document.createElement('h3');
	name.innerHTML = item.name;
	divParent.appendChild(name);
}
function addPrice (item, divParent){
	let price = document.createElement('h4');
	price.innerHTML = 'Prix : ' + item.price + '$';
	divParent.appendChild(price);
}
	
function displayTotalPrice(){
	//let basketContent = JSON.parse(localStorage.basketContent);	
	let divWrapper = document.getElementById('total');
	//let sum = null;
	basketContent.forEach(function(value, index, array){
		totalPrice += value.price;
	});
	divWrapper.innerHTML = totalPrice + '$';
console.log(totalPrice);
}
displayTotalPrice();


function sendOrder(tedInfo){
	const btn = document.getElementById('btn');
	btn.addEventListener('click', function(event){
		event.preventDefault();
		
		//creation objets 'contact' et 'products'
		let contact = {
		'firstName' : document.getElementById("name").value,
		'lastName' : document.getElementById("firstname").value,
		'address' : document.getElementById("adress").value,
		'city' : document.getElementById('city').value,
		'email' : document.getElementById("mail").value
		};
		let basket = JSON.parse(localStorage.basketContent);
		let products = basket.map((item) => item.id);
		let toBeSent = {contact, products};
	console.log(toBeSent);

		//envoi POST request
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://localhost:3000/api/teddies/order');
    xhr.onreadystatechange = function() {
      if (this.readyState == XMLHttpRequest.DONE) {
      	let confirmation = JSON.parse(this.responseText);
        console.log(confirmation);
        localStorage.setItem('order', JSON.stringify(confirmation));
        console.log(totalPrice);
        localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
       	document.location.href = 'confirmation.html';
      } 
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(toBeSent));
	});
}
sendOrder();
