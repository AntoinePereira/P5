function getId(){
	const param = window.location.search;
	const id = param.replace("?id=", ""); 
	return id;
}
const id = getId();

const request = new XMLHttpRequest();
request.open("GET", "http://localhost:3000/api/teddies/" + id);

request.onreadystatechange = function() {
	if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
	  const tedInfo = JSON.parse(this.responseText);
		addProduct(tedInfo);
		addOptionSelector(tedInfo);
		addCommandButton(tedInfo);
	}
};
request.onerror = function(){
	let divParent = document.getElementById('productContainer');
	divParent.innerHTML = "<h1>ERROR</h1>";
}
request.send();

function addProduct(tedInfo){
	let divParent = document.getElementById('productContainer');

	const img = document.createElement('img');
	img.setAttribute('src', tedInfo.imageUrl);
	divParent.appendChild(img);

	const title = document.createElement('div');
	title.innerHTML = tedInfo.name;
	divParent.appendChild(title);

	const description = document.createElement('div');
	description.innerHTML = tedInfo.description;
	divParent.appendChild(description);

	const price = document.createElement('div');
	price.innerHTML = tedInfo.price + '$';
	divParent.appendChild(price);
}

function addOptionSelector(tedInfo){
	let divParent = document.getElementById('productContainer');
	const colorSelector = document.createElement('select');
	const defaultOption = document.createElement('option');
	defaultOption.innerHTML = "Choisir la couleur";
	colorSelector.appendChild(defaultOption);
	divParent.appendChild(colorSelector);

	tedInfo.colors.forEach((color) =>{
		addOptionToSelector(color, colorSelector)
	})
}

function addOptionToSelector(color, colorSelector){
	const colorOption = document.createElement('option');
	colorOption.innerHTML = color;
	colorSelector.appendChild(colorOption);
}

function addCommandButton(tedInfo){
	const btn = document.getElementById('btn');
	btn.addEventListener('click', function(){
		let basketContent = JSON.parse(localStorage.getItem('basketContent'));
		if (basketContent === null){
			basketContent = [];
		}
		let product = getProductInfosForStorage(tedInfo);
		
		basketContent.push(product);
		localStorage.setItem('basketContent', JSON.stringify(basketContent));
		alert('Produit ajouté au panier');
	});
}
function getProductInfosForStorage(tedInfo){
	return{
	'name' : tedInfo.name,
	'price' : tedInfo.price,
	'id' : tedInfo._id
	}
};
