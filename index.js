const inputEl = document.getElementById("input-el")
const saveBtn = document.getElementById("save-btn")
const tabBtn = document.getElementById("tab-btn")
const resetBtn = document.getElementById("reset-btn")
const ulEl = document.getElementById("ul-el")

let input = ""
let myLeads = []

let leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )

if(leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render()
}

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow:true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render()
    })
    
})

saveBtn.addEventListener("click", function() {
    input = ""
    myLeads.push(inputEl.value)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render()
})

resetBtn.addEventListener("click", function() {
    myLeads = []
    localStorage.clear()
    ulEl.textContent = ""
})

function render() {
    for(i=0; i<myLeads.length; i++){
        input += `
        <li><a target = '_blank' href = '${myLeads[i]}'>${myLeads[i]}</a></li>
        `
    }
    ulEl.innerHTML = input
    inputEl.value = ""
}