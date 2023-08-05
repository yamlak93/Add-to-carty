import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-a8fb5-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "Shopping List")
const shoppingListEl = document.getElementById("shopping-list")

const inputFieldEl = document.getElementById("input-field")
const addButton = document.getElementById("add-button")

addButton.addEventListener("click", function(){
    let inputvalue = inputFieldEl.value
    push(shoppingListInDB, inputvalue)

    clearInputValue()

})

onValue(shoppingListInDB, function(snapshot){
    if(snapshot.exists()){
        let snap = snapshot.val()
        let itemsArray = Object.entries(snap)
      
        clearShoppingListEl()
    
        for(let i=0; i<itemsArray.length; i++){
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            appendShoppingListEl(currentItem)
            
        }
    }else{
        shoppingListEl.innerHTML = "No items here...Yet"
    }


})

function clearShoppingListEl(){
    shoppingListEl.innerHTML = ""
}

function clearInputValue(){
    inputFieldEl.value = ""
}

function appendShoppingListEl(item){
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener("click", function(){
        let exactLocationOfItemInDB = ref(database, `Shopping List/${itemID}`)
        console.log(itemID)
        remove(exactLocationOfItemInDB)
    })
    shoppingListEl.append(newEl)
}

