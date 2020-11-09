function fillBasket(){
	let basketContent = JSON.parse(localStorage.basketContent);
	basketContent.forEach((item) => {
		let divParent = document.getElementById('divJS');
		let divWrapper = document.createElement("div");

		addName(item, divWrapper);
		addPrice(item, divWrapper); 
		console.log(item.price);
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
	
function giveTotalPrice(){
	let basketContent = JSON.parse(localStorage.basketContent);	
console.log(basketContent)
	for (var i = 0; i < basketContent.length; i++){
		console.log(i);
		let x = basketContent.price(i);

    //$('body').append(localStorage.getItem(localStorage.key(i)));
  }

}

giveTotalPrice();



