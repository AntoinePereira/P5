const requestTeddies = new XMLHttpRequest();

requestTeddies.open("GET", " http://localhost:3000/api/teddies/", true);

requestTeddies.onreadystatechange = function() {
	if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
	  const teddies = JSON.parse(this.responseText);
	 
	  let divParent = document.getElementById('divJS');

		teddies.forEach((item) => {
	    const divWrapper = document.createElement("div");

	    addTitle(item, divWrapper);
	    addImageInLink(item, divWrapper);
	    
		divParent.appendChild(divWrapper);
    })
  }
}
requestTeddies.onerror = function(){
	let divParent = document.getElementById('divJS');
	divParent.innerHTML = "<h1>ERROR</h1>";
}
requestTeddies.send();

function addTitle(item, divParent){
	const title = document.createElement('h2');
	title.innerHTML = item.name;
	divParent.appendChild(title);
}
function addImageInLink(item, divParent){
	const link = document.createElement('a');
	link.href = "show.html?id="+ item._id;
	divParent.appendChild(link);
	addImage(item, link);
}
function addImage(item, divParent){
	const image = document.createElement('img');
	image.src = item.imageUrl;
	divParent.appendChild(image);
}
