function innerTextToNumber(elementId){
    let element = document.getElementById(elementId);
    let elementText = element.innerText;
    let elementValue = parseInt(elementText);
    return elementValue;
}


function setValue(elementId, value){
    let element = document.getElementById(elementId);
    element.innerText = value;
}


function getInputFieldValue(elementId){
    let inputElement = document.getElementById(elementId);
    let inputElementValue = inputElement.value;

    inputElement.value = "";

    return inputElementValue;
}


function discount(num){
    let totalAmount = innerTextToNumber("total-price");
    let discount = totalAmount * num;
    let totalDiscount = discount / 100;
    return totalDiscount;
}


