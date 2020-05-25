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

function submitNewTask(){
	console.log("submitNewTask()")
	var formData=new FormData();
	var description=document.getElementById('task_description').value;
	var date=document.getElementById('date').value;
	var done=document.querySelector("input[name='done']").value;
	console.log("description:"+description)
	console.log("date:"+date)
	console.log("done:"+done)
	formData.append('date',date)
	formData.append('description',description)
	formData.append('done',done)
	var jsonObject=JSON.stringify(Object.fromEntries(formData));
	console.log(jsonObject);

	fetch('http://localhost:8081/api/tasks', {
  	method: 'POST',
  	headers:{
  	'Content-Type':'application/json'
  	},
  	body: jsonObject,
	})
	.then(response => response.json())
	.then(result => {
  	console.log('Success:', result);
	})
	.catch(error => {
  	console.error('Error:', error);
	});


	
    var days_list=document.getElementById('days_list')
    if(containsDate(date)==false)
    {
	var li = document.createElement('li');
		li.classList.add('list-group-item')
		days_list.appendChild(li)
		li.id='day'+days_list.length;
        li.innerHTML=date;
        li.addEventListener("click",showTasks);
    }


    document.getElementById('task_description').value='';

    addNew()


}

function containsDate(date)
{
	var days_list=document.getElementById('days_list').children
	for(i=0;i<days_list.length;i++)
	{
		if(days_list[i].innerText==date)return true;
	}
	return false;
}


function addNew()
{
	var element=document.getElementById('new_task')
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
            li.id='task'+elem.id;
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
		li.id='done'+elem.id
            ul.appendChild(li);
            if(elem.done==true)li.innerHTML='done';
            else  li.innerHTML='to do';
	}
}


function appendEditDeleteButtons(arr){
	var box=document.getElementById("edit_delete_buttons")
	for(elem of arr)
	{
		var box_group=document.createElement('div');
		box_group.classList.add('btn-group')

		var button_edit=document.createElement('button')
		button_edit.classList.add('btn', 'btn-secondary')
		button_edit.id='button_edit'+elem.id;
		button_edit.innerText='Edit'
		button_edit.addEventListener("click",enableEdit)
		var button_delete=document.createElement('button')
		button_delete.classList.add('btn', 'btn-secondary')
		button_delete.id='button_delete'+elem.id;
		button_delete.innerText='Delete'
		button_delete.addEventListener("click",deleteTask)
		box_group.appendChild(button_edit)
		box_group.appendChild(button_delete)
		box.appendChild(box_group)
		
	}
}


function enableEdit(event)
{
	var id=event.target.id.match(/\d+/)
	var task=document.getElementById('task'+id);
	var done=document.getElementById('done'+id);
	var date=document.getElementById('task_label').innerText;
	
if(event.target.innerText=='Edit')
	{
 	console.log("id="+id)
	event.originalTarget.innerText='Save'
	task.contentEditable=true;
	done.addEventListener("click", changeStatus)
	}
else if(event.target.innerText=='Save')
	{
	console.log("saveEditedTask()")
	var formData=new FormData();
	var description=task.innerText;
	var done_status=(done.innerText=='done')?true:false;
	console.log("description:"+description)
	console.log("done:"+done_status)
	formData.append('id',id)
	formData.append('date',date);
	formData.append('description',description)
	formData.append('done',done_status)
	var jsonObject=JSON.stringify(Object.fromEntries(formData));
		task.contentEditable=false;
		done.removeEventListener('click',changeStatus);


		fetch('http://localhost:8081/api/tasks', {
  		method: 'PUT',
  		headers:{
  		'Content-Type':'application/json'
  		},
  		body: jsonObject,
		})
		.then(response => response.json())
		.then(result => {
  		console.log('Success:', result);
		})
		.catch(error => {
  		console.error('Error:', error);
		});
	event.target.innerText='Edit'
	}
	
}

function changeStatus(event)
{
if(event.target.innerText=="done")event.target.innerText="to do"
	else event.target.innerText="done"
}

function deleteTask(event)
{
	deleteEvent=event;
	var id=event.target.id.match(/\d+/)
	console.log("delete event:"+event);
	var question=confirm("Are you sure to delete this task?")
	if(question)
	{
		fetch('http://localhost:8081/api/tasks/'+id, {
  		method: 'DELETE',
  		headers:{
  		'Content-Type':'application/json'
  		}
		})
		.then(response => response.json())
		.then(result => {
  		console.log('Success:', result);
		})
		.catch(error => {
  		console.error('Error:', error);
		});
	document.getElementById('task'+id).remove();
	document.getElementById('done'+id).remove();
	document.getElementById('button_edit'+id).remove();
	document.getElementById('button_delete'+id).remove();

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
	document.getElementById('task_label').innerText=date;
	console.log('showing tasks from date:'+date)
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



