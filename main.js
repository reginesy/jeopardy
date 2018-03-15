board=document.getElementById("table");

function loadXMLDoc() {
	return new Promise(function(resolve,reject){
		  var xhr = new XMLHttpRequest();
		  xhr.open("GET", "http://jservice.io/api/categories?count=5&offset=10");
		  xhr.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200) {
		     categories=JSON.parse(this.responseText);
		     categories.forEach(
		     	function(cat){
		     		var col = document.createElement('div');
		     		col.classList.add("column");
		     		col.id="category-"+cat.id;

		     		var boxes=document.createElement('div'); //makes the boxes
		     		boxes.classList.add("box-list");
		     		boxes.innerHTML=cat.title;
		     		boxes.id="category-"+cat.id+"-boxes";
		     		col.appendChild(boxes)
		     		board.appendChild(col);

		     		getClues(cat.id).then(function(f){
		     			
		     			f.clues=f.clues.slice(0,5)
		     			f.clues.forEach(function(g)
		     			{
		     				var box = document.createElement("div");
		     				box.classList.add("box")
		     				box.classList.add("price")
		     				box.innerHTML=g.value;
		     				
		     				box.onclick=function() //clicking on box
		     					{
		     					this.classList.add("question");
		     					this.innerHTML=g.question;
		     					this.onclick=
		     					function()
		     						{
		     							this.classList.add("answer");
		     							this.innerHTML=g.answer
		     						}
		     					}
		     				document.getElementById("category-"+cat.id+"-boxes").appendChild(box); //add to boxes
		     			}
		     			)
		     			});
		     	})
		     resolve(categories);
		    }
		  };
		  xhr.oneror = function()
		  {
		  	reject(["error"]);
		  }
		  xhr.send();
	})
}

function getClues(cat_id) {
	return new Promise(function(resolve,reject)
	{
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "http://jservice.io/api/category?id="+cat_id); //get categories
		xhr.onreadystatechange = function() {
		  if (this.readyState == 4 && this.status == 200) {
		   	resolve(JSON.parse(this.responseText));
		  }
		};
		xhr.oneror = function()
		{
			reject(["error"]);
		}
		xhr.send();
	})
  
}

loadXMLDoc().then(function(f){})