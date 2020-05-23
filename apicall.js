

fetch('http://localhost:8081/api/tasks')   
.then(response => response.json())   
.then(json => arrayOfTasks=json)
.then(elem => console.log(elem))

function init()
{
	fetch('http://localhost:8081/api/dates')
	.then(response => response.json())
	.then(json => Array.from(json))
	.then(arr => {
		appendDays(arr)
		addEvenListenersToDays()
	})
}


function addNew()
{
	var element=document.getElementById('show-hide')
	if(element.style.display=="none")element.style.display="block"
	else element.style.display="none"
}

function appendTasks(arr)
{
var ul=document.createElement('ul')
	ul.classList.add('list-group')
	ul.id='task_list'
	document.getElementById('task').appendChild(ul);
	for(elem of arr) 
	{
		var li = document.createElement('li');
		li.classList.add('list-group-item')
            ul.appendChild(li);
            li.innerHTML=elem.description;
	}
}

function addEvenListenersToDays()
{
	var ul=document.getElementById('days_list')
	var items= ul.getElementsByTagName('li')
	for(i=0;i<items.length;i++)
	{
		items[i].addEventListener("click",showTasks)
	}
}

function appendDone(arr)
{
var ul=document.createElement('ul')
	ul.classList.add('list-group')
	ul.id='done_list'
	document.getElementById('done').appendChild(ul);
	for(elem of arr) 
	{
		var li = document.createElement('li');
		li.classList.add('list-group-item')
            ul.appendChild(li);
            if(elem.done==true)li.innerHTML='done';
            else  li.innerHTML='to do';
	}
}

function appendEditDelete(arr)
{
var ul=document.createElement('ul')
	ul.classList.add('list-group')
	ul.id='buttons_list'
	document.getElementById('btn_group').appendChild(ul);
	var index=0
	for(elem of arr) 
	{

		var li1 = document.createElement('button');
		var li2 = document.createElement('button');
		var box=document.createElement('div');
		
			li1.innerText='Edit';
            li2.innerText='Delete';
            li1.id='edit_button'+index;
            li2.id='delete_button'+index;
			li1.classList.add("btn",'btn-secondary')
			li2.classList.add("btn",'btn-secondary')
			box.appendChild(li1)
			box.appendChild(li2)
            ul.appendChild(box);  
	}
}


function appendEditDeleteButtons(arr){
	var box=document.getElementById("edit_delete_buttons")
	index=0;
	for(elem of arr)
	{
		var box_group=document.createElement('div');
		box_group.classList.add('btn-group')

		var button_edit=document.createElement('button')
		button_edit.classList.add('btn', 'btn-secondary')
		button_edit.id='button_edit'+index;
		button_edit.innerText='Edit'
		var button_delete=document.createElement('button')
		button_delete.classList.add('btn', 'btn-secondary')
		button_delete.id='button_delete'+index;
		button_delete.innerText='Delete'
		box_group.appendChild(button_edit)
		box_group.appendChild(button_delete)
		box.appendChild(box_group)
		index++;
	}
}

function appendDays(arr)
{
	var ul=document.createElement('ul')
	ul.classList.add('list-group')
	ul.id='days_list'
	document.getElementById('days').appendChild(ul);
	var index=0;
	for(elem of arr)
	{
		var li = document.createElement('li');
		li.classList.add('list-group-item')
            ul.appendChild(li);
            li.id='day'+index;
            li.innerHTML=elem;
        index++;
	}
}

function removeButtons()
{
var elements=document.getElementById('edit_delete_buttons').children
	for(i=elements.length-1;i>=0;i--)
	{
	elements[i].remove()
	}
}

function showTasks(event)
{
	if(document.getElementById('task_list')!=null)document.getElementById('task_list').remove()
	if(document.getElementById('done_list')!=null)document.getElementById('done_list').remove()
	removeButtons()
	var date=event.target.textContent
	document.getElementById('task_label').innerText='';
	document.getElementById('task_label').innerText='Tasks from '+date+':';
	var url='http://localhost:8081/api/tasks?taskDate='+date
	fetch(url)
	.then(response => response.json())
	.then(json => Array.from(json))
	.then(arr => {
		appendTasks(arr)
		appendDone(arr)
		appendEditDeleteButtons(arr)
	})
}



