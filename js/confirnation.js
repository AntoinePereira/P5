let order = JSON.parse(localStorage.order);
let orderId = order.orderId;
console.log(orderId);
let totalPrice = JSON.parse(localStorage.totalPrice);
console.log(totalPrice);
function displayOrder(){
	let divParent = document.getElementById('divJS');
	divParent.innerHTML = 'Votre commande<br>' + orderId + "<br>d'un montant de :<br>" + totalPrice + '$<br> est en cours de traitement';
}
displayOrder();