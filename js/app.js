const requestTeddies = new XMLHttpRequest();

requestTeddies.onreadystatechange = function() {
	if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
	  const teddies = JSON.parse(this.responseText);
	  console.log(teddies);

	  let divParent = document.getElementById('divJS');

		teddies.forEach((item) => {
	    const divWrapper = document.createElement("div");

	    addTitle(item, divWrapper);
	    addImageInLink(item, divWrapper);
	    

	    divParent.appendChild(divWrapper);
    })
  }
};


function addTitle(item, divParent){
	const title = document.createElement('h2');
	title.innerHTML = item.name;
	divParent.appendChild(title);
}
function addImageInLink(item, divParent){
	const link = document.createElement('a');
	link.href = "produit.html?id="+ item._id;
	divParent.appendChild(link);
	addImage(item, link);
}
function addImage(item, divParent){
	const image = document.createElement('img');
	image.src = item.imageUrl;
	divParent.appendChild(image);
}

requestTeddies.open("GET", " http://localhost:3000/api/teddies/");
requestTeddies.send();





/* const api_url = " http://localhost:3000/api/teddies/";
async function getTeddies(){
	const response = await fetch(api_url);
	const teddies = await response.json();
	console.log(teddies);
}
getTeddies();



//affiche ours-----------------------------------------------------------------------
let divJS = document.getElementById('divjs1');
	console.log(monDivPourJS1);
monDivPourJS1.innerHTML = "<img src='http://localhost:3000/images/teddy_1.jpg'>";
//affiche ours------------------------------------------------------------------------
let img = document.createElement("img"); 
img.src = "http://localhost:3000/images/teddy_1.jpg"; 
let monDivPourJS2 = document.getElementById("divjs2"); 
	console.log(img)
monDivPourJS2.appendChild(img); 
//-----------------------------------------------------------------------------------

*/