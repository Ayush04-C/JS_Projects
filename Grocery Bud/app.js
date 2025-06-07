const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');


let editElememt;
let editFlag = false;
let editId = '';
// Event Listeners
form.addEventListener('submit', addItem);
// clear items
clearBtn.addEventListener('click', clearItems);
//load items
window.addEventListener('DOMContentLoaded', setupItems);




// Functions
function addItem(e){
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();
    if(value && !editFlag ){
                    createListItems(id, value)
                    // display alert
                    displayAlert('item added to the list', 'success');
                    // show container
                    container.classList.add('show-container');
                    // add to local storage
                    addToLocalStorage(id, value);
                    // set back to default
                    setBackToDefault();
    }
    else if(value && editFlag){
        editElememt.innerHTML = value;
        displayAlert('value changed', 'success');
        // edit local storage
        editLocalStorage(editId, value);
        setBackToDefault();

    }
    else {
        displayAlert('Please enter value', 'danger')
    }
}

// dispaly alert
function displayAlert(text, action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    // remove alert
    setTimeout(function(){
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 1000);
};

function clearItems(){
    const items = document.querySelectorAll('.grocery-item');
    if(items.length > 0){
        items.forEach(function(item){
            list.removeChild(item);
        });
    }
    container.classList.remove('show-container');
    displayAlert('empty list', 'danger');
    setBackToDefault();
    localStorage.removeItem('list');
};

function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if(list.children.length === 0){
        container.classList.remove('show-container');
    }
    displayAlert('item removed', 'danger');
    setBackToDefault();
    // remove from local storage
    removeFromLocalStorage(id);
};

function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    // set edit item
    editElememt = e.currentTarget.parentElement.previousElementSibling;
    // set form value
    grocery.value = editElememt.innerHTML;
    editFlag = true;
    editId = element.dataset.id;
    submitBtn.textContent = 'edit';

};

// set back to default
function setBackToDefault(){
    grocery.value = '';
    editFlag  = false;
    editId = '';
    submitBtn.textContent = 'submit';
};


// add to local storage
function addToLocalStorage(id, value){
    const grocery = {id:id, value:value};
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem('list', JSON.stringify(items));
}

function removeFromLocalStorage(id){
    let items = getLocalStorage();
    items = items.filter(function(item){
        if(item.id !== id){
            return item;
        }
    })
    localStorage.setItem('list', JSON.stringify(items));
};

function editLocalStorage(id, value){
    let items = getLocalStorage();
    items = items.map(function(item){
        if (item.id === id){
            item.value = value;
        }
        return item;
    });
    localStorage.setItem('list', JSON.stringify(items));

};

function getLocalStorage(){
    return localStorage.getItem('list')?JSON.parse(localStorage.getItem('list')):[];
}

function setupItems(){
    let items = getLocalStorage();
    if (items.length>0){
        items.forEach(function(item){
            createListItems(item.id, item.value)
    });
    container.classList.add('show-container');
    }
}


function createListItems(id, value){
            if (!value) return;
            const element = document.createElement('article');
            // add id
            let attr = document.createAttribute('data-id');
            // add class
            element.classList.add('grocery-item');
            attr.value = id;
            element.setAttributeNode(attr);
            element.innerHTML = `<p class="title">${value}</p>
                    <div class="btn-container">
                        <button type="button" class="edit-btn">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button type="button" class="delete-btn">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>`;
            const deletBtn = element.querySelector('.delete-btn');
            deletBtn.addEventListener('click', deleteItem);
            const editBtn = element.querySelector('.edit-btn');
            editBtn.addEventListener('click', editItem);
            // append child
            list.appendChild(element);
}
