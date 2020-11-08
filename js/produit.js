function getId(){
	const param = window.location.search;
	const id = param.replace("?id=", ""); 
	return id;
}
const id = getId();

const request = new XMLHttpRequest();
request.open("GET", " http://localhost:3000/api/teddies/" + id);

request.onreadystatechange = function() {
	if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
	  const tedInfo = JSON.parse(this.responseText);

		addProduct(tedInfo);
		//addOptionSelector(tedInfo);
		addCommandButton();
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

	const colorSelector = document.createElement('select');
	const defaultOption = document.createElement('option');
	defaultOption.innerHTML = "Choisir la couleur";
	colorSelector.appendChild(defaultOption);
	divParent.appendChild(colorSelector);

	tedInfo.colors.forEach((color) =>{
		const colorOption = document.createElement('option');
		colorOption.innerHTML = color;
		colorSelector.appendChild(colorOption);
	})
}
/*function addOptionSelector(tedInfo){
	let divParent = document.getElementById('productContainer');
	const colorSelector = document.createElement('select');
	const defaultOption = document.createElement('option');
	defaultOption.innerHTML = "Choisir la couleur";
	colorSelector.appendChild(defaultOption);
	divParent.appendChild(colorSelector);
}*/

function addCommandButton(){
	let divParent = document.getElementById('productContainer');
	const btn = document.createElement('button');
	btn.innerHTML = 'Ajouter au panier';
	divParent.appendChild(btn);

	btn.addEventListener('click', function(tedInfo){
		let basketContent = JSON.parse(localStorage.getItem('basketContent'));
	if (basketContent === null){
		basketContent = [];
	}
	let product = {
		'Name' : tedInfo.name,
		'Price' : tedInfo.price
	};

	console.log(product);
	basketContent.push(product);
	localStorage.setItem('basketContent', JSON.stringify(basketContent));
	});
}

/*function addToLocalStorage(tedInfo){
	let basketContent = JSON.parse(localStorage.getItem('basketContent'));
	if (basketContent === null){
		basketContent = [];
	}
	let product = {
		'Name' : tedInfo.name,
		'Price' : tedInfo.price
	};

	console.log(product);
	basketContent.push(product);
	localStorage.setItem('basketContent', JSON.stringify(basketContent));
}*/
