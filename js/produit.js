function getId(){
	const param = window.location.search;
	const id = param.replace("?id=", ""); 
	return id;
}
const id = getId();
console.log(id); 

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

	const price = document.createElement('div');
	price.innerHTML = tedInfo.price + '$';
	divParent.appendChild(price);

	const btn = document.createElement('button');
	btn.innerHTML = 'Ajouter au panier';
	divParent.appendChild(btn);
}
const request = new XMLHttpRequest();

request.onreadystatechange = function() {
	if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
	  const tedInfo = JSON.parse(this.responseText);
	  console.log(tedInfo);

	  addProduct(tedInfo);
	}
};
request.open("GET", " http://localhost:3000/api/teddies/" + id);
request.send();
