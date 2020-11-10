function fillBasket(){
	let basketContent = JSON.parse(localStorage.basketContent);
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
	let basketContent = JSON.parse(localStorage.basketContent);	
	let divWrapper = document.getElementById('total');
	let sum = null;
	basketContent.forEach(function(value, index, array){
		sum += value.price;
	});
	divWrapper.innerHTML = sum + '$';
console.log(sum);
}
displayTotalPrice();


function sendOrder(){

	const order = {
    contact: {},
    products: [],
	}	
	btn = document.getElementById('btn');
	btn.addEventListener('click', (event) => {
		let contact = new 
	})
}
sendOrder();