
document.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault()

    const task = JSON.parse(localStorage.getItem("task")) || [];

    // Accessing elements
    const add_btn = document.getElementById("add-btn");
    const addtask_modal = document.getElementById("add-task-modal")
    const edittask_modal = document.getElementById("edit-task-modal")
    const close_modal = document.getElementById("close-modal")
    const eclose_modal = document.getElementById("e-close-modal")
    const add_task_btn = document.getElementById("add-task-btn")
    const editTaskForm = document.getElementById('edit-task-form');


    const closeModals = () =>{
        addtask_modal.style.display = "none";
        edittask_modal.style.display = "none";
    }

    close_modal.addEventListener('click',closeModals);

    eclose_modal.addEventListener('click',closeModals);

    add_btn.addEventListener('click', (e)=>{
        e.preventDefault();
        addtask_modal.style.display = "block";
    })

    function savetask(){
        localStorage.setItem('task', JSON.stringify(task));
    }

    function showtask(){
        console.log("Arrived");
        
        const task_list = document.getElementById('task-list');

        if(task_list){
            task_list.innerHTML ="";

            task.forEach((task,index)=>{
                const taskSequence = document.createElement("div");
                taskSequence.classList.add = "task-s";
                taskSequence.innerHTML=`
                <div class = "task-content" data-index = ${index}>
                    <span><button class="done" data-index= ${index}>Done</button></span>
                    <h3>&nbsp;&nbsp;&nbsp;${task.tasktitle}</h3>
                    
                    <p>${task.taskdescp}</p>
                     <p>${task.taskdate} </p>
                    <div class="t-btn">
                        <button class ="edit-btn" data-index=${index}>Edit</button>
                        <button class="delete-btn" data-index=${index}>Delete</button>
                    </div>
                </div>
                `
                if(task.isCompleted){
                    taskSequence.innerHTML=`
                   <div class = "task-content" data-index = ${index} style="border-color:green; background-color: #bae08c">
    
                    <h3>&nbsp;&nbsp;&nbsp;${task.tasktitle}</h3>
                    
                    <p>${task.taskdescp}</p>
                     <p>${task.taskdate} </p>
                    <div class="t-btn">
                        <button class="delete-btn" data-index=${index}>Delete</button>
                    </div>
                </div>
                    `
                }
                task_list.appendChild(taskSequence);
            })
        }
    }

    function addtask(){

        // event.preventDefault()

        const tasktitle = document.getElementById("title").value;
        const taskdescp = document.getElementById("description").value;
        const taskdate = document.getElementById("date").value;

        // console.log(taskdate,taskdescp,tasktitle);

        const newtask= {
            tasktitle,
            taskdescp,
            taskdate
        }

        task.unshift(newtask);

        savetask();

        resetForm()
        closeModals()
    }

    function handleevent(event){
        // console.log("yes");
        
        const index = event.target.getAttribute("data-index");
        // console.log(index);
        
        if(event.target.classList.contains("edit-btn")){
            t = task[index];
            // console.log(t);

            edittask_modal.style.display = "block";

            let a =document.getElementById('e-title');
            let b =document.getElementById('e-description');
            let c =document.getElementById('e-date');
            let btn =document.getElementById('edit-task-btn');
            
            a.value = t.tasktitle;
            b.value = t.taskdescp;
            c.value = t.taskdate;
            btn.innerText = "Update";

            btn.addEventListener('click', (e)=>{
                e.preventDefault()
                console.log(a.value, b.value, c.value);
                t.tasktitle = a.value;
                t.taskdescp = b.value;
                t.taskdate = c.value;

                savetask();
                showtask();
                resetForm()
                closeModals()
                alert("Update done!");
                
            })
        }

        if(event.target.classList.contains("delete-btn")){
            // console.log("yez");
            choice = confirm("Are you sure, You wanna delete?")
            if(choice){
                task.splice(index,1);
                savetask();
                showtask();
            }
        }

        if(event.target.classList.contains("done")){
           t= task[index];
           t.isCompleted = true;
           savetask();
           showtask();
        }
    }

    function resetForm(){
        const form=document.getElementById('task-form')
        form.reset();
    }


    const taskForm = document.getElementById('task-form');
    const task_list = document.getElementById('task-list');


    if(taskForm){
        taskForm.addEventListener('submit', addtask);
    }

    if(task_list){
        task_list.addEventListener('click', handleevent);
    }

    showtask();
});
