if (localStorage.basketContent == null){
	let divParent = document.getElementById('panierVide');
	divParent.innerHTML = 'Votre panier est vide';
}
let basketContent = JSON.parse(localStorage.basketContent);
let totalPrice = null;

fillBasket();
displayTotalPrice();
sendOrder();

function fillBasket(){
	basketContent.forEach((item) => {
		let divParent = document.getElementById('divJS');
		let divWrapper = document.createElement("div");

		addName(item, divWrapper);
		addPrice(item, divWrapper); 
		divParent.appendChild(divWrapper);
	})
}
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

function sendOrder(){
	const form = document.getElementById('form');
	form.addEventListener('submit', function(event){
		event.preventDefault();
		let contact = defineContact();
		let basket = JSON.parse(localStorage.basketContent);
		let products = basket.map((item) => item.id);
		let toBeSent = {contact, products};
		if (validEmail()){
			sendRequest(toBeSent);
		} else {
			alert('Adresse e-mail non valide');
		}
	});
}
function defineContact(){
	return{
		'firstName' : document.getElementById("name").value,
		'lastName' : document.getElementById("firstname").value,
		'address' : document.getElementById("adress").value,
		'city' : document.getElementById('city').value,
		'email' : document.getElementById("mail").value
		};
}

function validEmail(){
	let regExpMail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
	return regExpMail.test(document.getElementById("mail").value);
}

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