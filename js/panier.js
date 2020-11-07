function fillBasket(){

/*if basketContent.lenght === 0{

	let divParent = document.getElementById('divJS');
	divParent.innerHTML = '<h1>Panier vide</h1>';

else*/
let basketContent = localStorage.basketContent;
console.log(basketContent);
	basketContent.forEach((item) => {
	let divParent = document.getElementById('divJS');
	let divWrapper = document.createElement("div");

	//addName(item, divWrapper);
	//addPrice(item, divWrapper);
	   console.log('haha'); 

	divParent.appendChild(divWrapper);
})
}
fillBasket();




/*function addName(item, divWrapper){
	let name = 
}*/
