var todoList=document.querySelector(".todo .clist")
var doneList=document.querySelector(".done .clist")
var inputDom=document.querySelector("#write")
var todoNumber=document.querySelector(".todo h1 .num")
var doneNumber=document.querySelector(".done h1 .num")
var main = document.querySelector(".main")

var dateList=localStorage.dataList?JSON.parse(localStorage.dataList):[]
renderList()

inputDom.onkeypress=function (e) {
	// console.log(e)
	if(e.code=="Enter" &&inputDom.value!=""){
        var data = {
            content:inputDom.value,
            type:"todo"
        }
		dateList.push(data)
		renderList();
	}
}

function renderList() {
	localStorage.dataList=JSON.stringify(dateList )
    todoList.innerHTML=""
    doneList.innerHTML=""
	var todoNum=0
	var doneNum=0
    dateList.forEach(function (item,index) {
        newDiv=document.createElement("div")
        newDiv.className="item"
        if(item.type=="todo"){
        	todoNum++
            newDiv.innerHTML=`
						<span class="checkbox">
							<input type="checkbox" name="check"  value=""  data-index="${index}"/>
						</span>
                        <span class="content">
							${item.content}
						</span>
                         <span class="delete"  data-index="${index}"></span>
		`
            todoList.appendChild(newDiv)
		}else {
        	doneNum++
            newDiv.innerHTML=`	  
						<span class="checkbox">
							<input type="checkbox" name="check"  value=""  checked/>
						</span>
                        <span class="content">
							${item.content}
						</span>
                         <span class="delete"  data-index="${index}"></span>
		`
            doneList.appendChild(newDiv)
		}
        todoNumber.innerHTML=todoNum
        doneNumber.innerHTML=doneNum

    })
}

todoList.onchange = function(e){
    var index = e.target.dataset.index;
    console.log(index)
    dateList[index].type = "done";
    renderList()
}

main.addEventListener("click",function (e) {
	if(e.target.className=="delete"){
		var index=e.target.dataset.index;
		dateList.splice(index,1)
		renderList()
	}
})











