let seatsElement = document.querySelectorAll(".seat");

for (let seat of seatsElement) {
    seat.addEventListener("click", function (event) {
        let clickedElement = event.target;

        /* Seats Count */
        let countTicketElement = document.getElementById("seats-count");
        let countTicketElementText = countTicketElement.innerText;
        let countTicketValue = parseInt(countTicketElementText);

        if(countTicketValue === 3){
            let buttonApplyElement = document.getElementById("button-apply");
            buttonApplyElement.classList.add("apply-btn")
            buttonApplyElement.removeAttribute("disabled");
        }


        /* Check if the ticket is already in the tbody */
        let targetedElementName = clickedElement.innerText;
        let tableTbodyElement = document.getElementById("tbody-main-table");
        let existingRows = tableTbodyElement.querySelectorAll("tr");
        for (let row of existingRows) {
            if (row.children[0].innerText === targetedElementName) {

                // Total price value decrease || first conver the total price into the number
                let totalPriceElement = document.getElementById("total-price");
                let totalPriceElementText = totalPriceElement.innerText;
                let totalPriceValue = parseInt(totalPriceElementText);
                console.log(totalPriceValue);

                let listedPriceElement = document.getElementById("listed-price");
                let listedPriceElementText = listedPriceElement.innerText;
                let listedPriceValue = parseInt(listedPriceElementText);

                let total = totalPriceValue - listedPriceValue;

                totalPriceElement.innerText = total;

                //remove row
                row.remove();

                clickedElement.style.backgroundColor = "";
                clickedElement.style.color = "";


                countTicketElement.innerText = countTicketValue - 1;


                // set 40 total value Increase
                let setsElement = document.getElementById("total-seats");
                let totalSetsText = setsElement.innerText;
                let setsValue = parseInt(totalSetsText);

                setsElement.innerText = setsValue + 1;


                if(countTicketValue > 3){
                    let buttonApplyElement = document.getElementById("button-apply");
                    buttonApplyElement.classList.remove("apply-btn");
                    buttonApplyElement.setAttribute("disabled", true)
                }

                return;  // Exit the function if the ticket is already selected
            }
        }


        /* Prevent adding more than 4 tickets */
        if (countTicketValue >= 4) {
            alert("You can't buy more than 4 tickets!");
            return;
        }


        // Set background color to #1DD100 and text color to white
        clickedElement.style.backgroundColor = "#1DD100";
        clickedElement.style.color = "white";

        // Increment seat count
        countTicketElement.innerText = countTicketValue + 1;

        /* 40 left Seats Decrease */
        let totalSetsElement = document.getElementById("total-seats");
        let totalSetsElementText = totalSetsElement.innerText;
        let totalSetsValue = parseInt(totalSetsElementText);

        // Decrement total seats
        let remainSeats = totalSetsValue - 1;
        totalSetsElement.innerText = remainSeats;

        /* Add seat details to tbody as appendChild */
        let perTicketCostElement = document.getElementById("per-ticket-price");
        let perTicketCostElementText = perTicketCostElement.innerText;
        let perTicketCostValue = parseInt(perTicketCostElementText);

        let newTrElement = document.createElement("tr");

        // Adding ticket details
        newTrElement.innerHTML = `
            <td>${targetedElementName}</td>
            <td>P-Paribahan</td>
            <td id="listed-price">${perTicketCostValue}</td>
        `;

        tableTbodyElement.appendChild(newTrElement);


        
        let totalPriceElement = document.getElementById("total-price");
        let totalPriceElementText = totalPriceElement.innerText;
        let totalPriceValue = parseInt(totalPriceElementText);

        let total = totalPriceValue + perTicketCostValue;

        totalPriceElement.innerText = total;


    });
}






// Apply Coupon Button

document.getElementById("button-apply").addEventListener("click", function(){
    let couponFieldElement = document.getElementById("coupon-code-field");
    let couponFieldValue = couponFieldElement.value;
    
    if(couponFieldValue === "NEW15"){
        let totalPriceEle = document.getElementById("total-price").innerText;
        let totalPriceEleValue = parseInt(totalPriceEle);
        
        let totalDiscountAmount = discount(totalPriceEleValue, 15);

        let discountElement = document.getElementById("discount-price");
       discountElement.innerText = totalDiscountAmount;
       couponFieldElement.value = "";

       let forGrandTotal = totalPriceEleValue - totalDiscountAmount;
       let grandTotalElement = document.getElementById("grand-total");
       grandTotalElement.innerText = forGrandTotal;

       couponFieldElement.setAttribute("disabled", true);


    }

    else if(couponFieldValue === "Couple20"){
        let totalPriceEle = document.getElementById("total-price").innerText;
        let totalPriceEleValue = parseInt(totalPriceEle);
        
        let totalDiscountAmount = discount(totalPriceEleValue, 20)
        let discountElement = document.getElementById("discount-price");
        discountElement.innerText = totalDiscountAmount;
        couponFieldElement.value = "";

        let forGrandTotal = totalPriceEleValue - totalDiscountAmount;
        let grandTotalElement = document.getElementById("grand-total");
        grandTotalElement.innerText = forGrandTotal;

        couponFieldElement.setAttribute("disabled", true);


    }
})


function discount(totalPrice, num){
    let totalAmount = totalPrice * num;
    let totalDiscount = totalAmount / 100;
    return totalDiscount;
}