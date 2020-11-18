let basketContent = JSON.parse(localStorage.basketContent);
let totalPrice = null;

function fillBasket(){
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
	let divWrapper = document.getElementById('total');
	basketContent.forEach(function(value, index, array){
		totalPrice += value.price;
	});
	divWrapper.innerHTML = totalPrice + '$';
	localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
}
displayTotalPrice();

function sendOrder(){
	const form = document.getElementById('form');
	form.addEventListener('submit', function(event){
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
		if (regExpMail.test(document.getElementById("mail").value) == false){
			alert('Adresse e-mail non valide');
		}
		else sendRequest(toBeSent);
	});
}
sendOrder();

function sendRequest(toBeSent){
	var xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://localhost:3000/api/teddies/order');
    xhr.onreadystatechange = function() {
      if (this.readyState == XMLHttpRequest.DONE) {
      	let confirmation = JSON.parse(this.responseText);
        localStorage.setItem('order', JSON.stringify(confirmation));
      	document.location.href = 'confirmation.html';
      } 
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(toBeSent));
}


let regExpMail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
