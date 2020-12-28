function createNewElement(tagName){
    return document.createElement(tagName)
}

function setAttributes(elementName,AttributeNameValurPair){
    Object.keys(AttributeNameValurPair).forEach((attributeName)=>{
        elementName.setAttribute(attributeName,AttributeNameValurPair[attributeName])
    })
}

function createFormField(label,className,idValue,inputType,placeholderValue){

    var labelElement = createNewElement("label")
    setAttributes(labelElement,{
        for: idValue
    })
    labelElement.innerText = label

    var fieldElement = createNewElement("input")
    setAttributes(fieldElement,{
        type: inputType,
        class: className,
        id: idValue,
        required: ""
    })
    if(placeholderValue){
        fieldElement.placeholder = placeholderValue
    }

    return [labelElement, fieldElement]

}

function createOptions(optionsList,n,multi){
    optionElements = []
    for(var i=0;i<n;i++){
        optionElements.push(createNewElement("option"))
        optionElements[i].innerText = optionsList[i]
        if(i===0 && !multi){
            optionElements[i].value = ""
        }
        else{
            optionElements[i].value = optionsList[i]
        }  
    }
    return optionElements
}

var container = createNewElement("div")
setAttributes(container,{
    class:"container",
    style: "margin-top: 70px"
})


var formColumn = createNewElement("div")
setAttributes(formColumn,{
    class:"col col-sm-8 col-md-6 col-lg-6 col-xl-6 offset-sm-2 offset-md-3 offset-lg-3 offset-xl-3 card pt-2"
})

var formElement = createNewElement("form")

var nameFormRow = createNewElement("div")
setAttributes(nameFormRow,{
    class: "form-row"
})

var fNameFormCol = createNewElement("div")
setAttributes(fNameFormCol,{
    class: "form-group col-6"
})

var firstNameFields = createFormField("First Name","form-control","firstname","text","First Name")

var lNameFormCol = createNewElement("div")
setAttributes(lNameFormCol,{
    class: "form-group col-6"
})

var lastNameFields = createFormField("Last Name","form-control","lastname","text","Last Name")

var addressFormRow = createNewElement("div")
setAttributes(addressFormRow,{
    class:"form-group"
})

addressFields = createFormField("Address","form-control","address","text","Flat No/House No/Street")

var genderFormRow = createNewElement("div")
setAttributes(genderFormRow,{
    class: "form-group"
})

var genderMaleFormgroup = createNewElement("div")
setAttributes(genderMaleFormgroup,{
    class: "form-check form-check-inline"
})

genderMaleFields = createFormField("Male","form-check-input","male","radio")
genderMaleFields[0].classList.add("form-check-label","mr-2")
genderMaleFields[1].name = "radioOptions"
genderMaleFields[1].value = "Male"

var genderFemaleFormgroup = createNewElement("div")
setAttributes(genderFemaleFormgroup,{
    class: "form-check form-check-inline"
})

genderFemaleFields = createFormField("Female","form-check-input","female","radio")
genderFemaleFields[0].classList.add("form-check-label","mr-2")
genderFemaleFields[1].name = "radioOptions"
genderFemaleFields[1].value = "Female"


var foodFormRow = createNewElement("div")
setAttributes(foodFormRow,{
    class: "form-group"
})

var foodLabel = createNewElement("label")
setAttributes(foodLabel,{
    for: "food"
})
foodLabel.innerHTML = "Food  <small> (Press Ctrl and select more than one options) </small>"

var foodSelectElement = createNewElement("select")
setAttributes(foodSelectElement,{
    id: "food",
    class: "form-control",
    required: "",
    multiple: "",
    onchange:"checkFoodOptionValidity()"
})

var foodOptionsList = ["Dosa","Parotta","Noodles","Briyani","Fried Rice"]
var foodOptionElements = createOptions(foodOptionsList,5,true)

var stateCountryPinFormRow = createNewElement("div")
setAttributes(stateCountryPinFormRow,{
    class: "form-row"
})

var stateFormCol = createNewElement("div")
setAttributes(stateFormCol,{
    class: "form-group col-4"
})

var stateLabel = createNewElement("label")
setAttributes(stateLabel,{
    for: "state"
})
stateLabel.innerText = "State"

var stateSelectElement = createNewElement("select")
setAttributes(stateSelectElement,{
    id: "state",
    class: "form-control",
    required: ""
})

var stateOptionsList = ["Choose...","Tamil Nadu","Kerala","Karnataka","Andhra Pradesh","Telangana"]
var stateOptionElements = createOptions(stateOptionsList,6)

var countryFormCol = createNewElement("div")
setAttributes(countryFormCol,{
    class: "form-group col-4"
})

var countryLabel = createNewElement("label")
setAttributes(countryLabel,{
    for: "country"
})
countryLabel.innerText = "Country"

var countrySelectElement = createNewElement("select")
setAttributes(countrySelectElement,{
    id: "country",
    class: "form-control",
    required: ""
})

var countryOptionsList = ["Choose...","India","China","Japan","South Korea","Singapore"]
var countryOptionElements = createOptions(countryOptionsList,6)

var pinFormCol = createNewElement("div")
setAttributes(pinFormCol,{
    class: "form-group col-4",
    onchange:"isNumber()"
})

var pinFields = createFormField("PinCode","form-control","pincode","text")


var submitBtnFieldRow = createNewElement("div")
setAttributes(submitBtnFieldRow,{
    class: "form-group justify-content-center d-flex"
})

var submitBtnElement = createNewElement("button")
setAttributes(submitBtnElement,{
    class: "btn btn-primary",
    type: "submit"
})
submitBtnElement.innerText = "Submit"

var tableColumn = createNewElement("div")
setAttributes(tableColumn,{
    class:"col col-sm-10 col-md-10 col-lg-10 col-xl-10 offset-sm-1 offset-md-1 offset-lg-1 offset-xl-1 mt-5 card",
})

var messageElement = createNewElement("p")
setAttributes(messageElement,{
    class: "font-italic text-danger text-center mt-2",
})
messageElement.innerText = "No Previous Records"


var tableElement = createNewElement("table")
        setAttributes(tableElement,{
            class: "table table-hover table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl mt-3",
        })

var tableHead = createNewElement("thead")
        setAttributes(tableHead,{
            class: "thead-dark"
        })

var tableBody = createNewElement("tbody")

var countOfSubmission = 0

setAttributes(formElement,{
    onsubmit: "onFormSubmit(); return false"
})

function onFormSubmit(){

    var tableRowElement 
    var tableDataList, tableRowDataElements

    if(countOfSubmission===0){
        tableColumn.removeChild(messageElement)
        
        tableRowElement = createNewElement("tr")

        tableDataList = ["#","First Name","Last Name","Address","Pincode","Gender","Food","State","Country"]
        tableRowDataElements = createTableRowDataElements(9,tableDataList,0)

        tableColumn.append(tableElement)
        tableElement.append(tableHead,tableBody)
        tableHead.append(tableRowElement)
        tableRowElement.append(...tableRowDataElements)
    }

    countOfSubmission+=1

    tableRowElement = createNewElement("tr")
    tableDataList = [countOfSubmission]

    tableDataList.push(document.querySelector("#firstname").value)
    tableDataList.push(document.querySelector("#lastname").value)
    tableDataList.push(document.querySelector("#address").value)
    tableDataList.push(document.querySelector("#pincode").value)
    tableDataList.push(document.querySelector('input[type="radio"]:checked').value)
    tableDataList.push(Array.from(document.querySelector("#food").options).filter(op=>op.selected).map(op=>op.value))
    tableDataList.push(document.querySelector("#state").value)
    tableDataList.push(document.querySelector("#country").value)

    tableRowDataElements = createTableRowDataElements(9,tableDataList,1)
    
    tableBody.append(tableRowElement)
    tableRowElement.append(...tableRowDataElements)

    formElement.reset()
}

function createTableRowDataElements(n,tableDataList,headOrBody){
    tableDataElements = []
    for(var i=0;i<n;i++){
        if(headOrBody===0){
            tableDataElements.push(createNewElement("th"))
            setAttributes(tableDataElements[i],{
                scope: "col"
            })
        }
        else if(i===0){
            tableDataElements.push(createNewElement("th"))
            setAttributes(tableDataElements[i],{
                scope: "row"
            })
        }
        else{
            tableDataElements.push(createNewElement("td"))
        }
        tableDataElements[i].innerText = tableDataList[i]   
    }

    return tableDataElements
}

function checkFoodOptionValidity(){

    var foodOptions = document.querySelector("#food")

    var foodOptionsSelected = Array.from(foodOptions.options).filter(op=>op.selected)

    if(foodOptionsSelected.length<2){
        foodOptions.setCustomValidity("Atleast 2 options must be selected")
    }
    else{
        foodOptions.setCustomValidity("")
    }

}

function isNumber(){
    var pinElement = document.querySelector("#pincode")
    if(isNaN(pinElement.value)){
        pinElement.setCustomValidity("Only numbers are allowed")
    }
    else{
        pinElement.setCustomValidity("")
    }
    
}


document.body.append(container)

container.append(formColumn,tableColumn)

formColumn.append(formElement)

formElement.append(nameFormRow,addressFormRow,genderFormRow,foodFormRow,stateCountryPinFormRow,submitBtnFieldRow)

nameFormRow.append(fNameFormCol,lNameFormCol)
fNameFormCol.append(...firstNameFields)
lNameFormCol.append(...lastNameFields)

addressFormRow.append(...addressFields)

genderFormRow.append(genderMaleFormgroup,genderFemaleFormgroup)
genderMaleFormgroup.append(...genderMaleFields)
genderFemaleFormgroup.append(...genderFemaleFields)

foodFormRow.append(foodLabel,foodSelectElement)
foodSelectElement.append(...foodOptionElements)

stateCountryPinFormRow.append(stateFormCol,countryFormCol,pinFormCol)

stateFormCol.append(stateLabel,stateSelectElement)
stateSelectElement.append(...stateOptionElements)

countryFormCol.append(countryLabel,countrySelectElement)
countrySelectElement.append(...countryOptionElements)

pinFormCol.append(...pinFields)

submitBtnFieldRow.append(submitBtnElement)

tableColumn.append(messageElement)