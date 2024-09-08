let seatsElement = document.querySelectorAll(".seat");
for (let seat of seatsElement) {
    seat.addEventListener("click", function (event) {
        let eventTarget = event.target;
        let ticketInnerText = eventTarget.innerText;

        // set seats count increase
        let seatsCountElement = document.getElementById("seats-count");
        let seatsValue = innerTextToNumber("seats-count");

        if (seatsValue === 3) {
            let applyButton = document.getElementById("button-apply");
            applyButton.classList.add("apply-btn");
            applyButton.removeAttribute("disabled");
        }


        let tbodyElement = document.getElementById("tbody-main-table");
        let existingRows = tbodyElement.querySelectorAll("tr");
        for (let row of existingRows) {
            let rowChildElement = row.children[0].innerText;
            if (rowChildElement === ticketInnerText) {

                // total price decrease
                let appendTicketPrice = row.children[2].innerText;
                let appendTicketPriceValue = parseInt(appendTicketPrice);

                let totalPriceCost = innerTextToNumber("total-price");

                let totalPriceCalculate = totalPriceCost - appendTicketPriceValue;
                setValue("total-price", totalPriceCalculate)

                //remove row
                row.remove();

                // color and bg remove
                eventTarget.style.backgroundColor = "";
                eventTarget.style.color = "";

                // 4 seats decrease
                let seatsTotalNumber = innerTextToNumber("seats-count");
                let totalSeats = seatsTotalNumber - 1;
                setValue("seats-count", totalSeats);

                // 40 total seats increase
                let totalAmountSeats = innerTextToNumber("total-seats");
                let increaseTotalValue = totalAmountSeats + 1;
                setValue("total-seats", increaseTotalValue);

                if (seatsTotalNumber >= 3) {
                    let btnApplyElement = document.getElementById("button-apply");
                    btnApplyElement.classList.remove("apply-btn");
                    btnApplyElement.setAttribute("disabled", true);
                }

                return;
            }

        }


        if (seatsValue >= 4) {
            alert("You can't buy more then 4 ticket, Thanks!");
            return;
        }



        eventTarget.style.backgroundColor = "#1DD100";
        eventTarget.style.color = "white";


        let seatsTotal = seatsValue + 1;
        seatsCountElement.innerText = seatsTotal;

        // total 40 seats decrease
        let totalSeatsElement = document.getElementById("total-seats");
        let totalSeatsValue = innerTextToNumber("total-seats");

        let decreaseTotalSeats = totalSeatsValue - 1;
        totalSeatsElement.innerText = decreaseTotalSeats;


        // add ticket as a appendChild
        let perTicketCost = innerTextToNumber("per-ticket-price");
        let tableTbodyElement = document.getElementById("tbody-main-table");
        let tr = document.createElement("tr");
        tr.innerHTML = `
                <td>${ticketInnerText}</td>
                <td>${"P-Paribahan"}</td>
                <td>${perTicketCost}</td>

        `;

        tableTbodyElement.appendChild(tr);


        // total price output

        let totalPrice = innerTextToNumber("total-price");

        let totalPriceAmount = totalPrice + perTicketCost;
        setValue("total-price", totalPriceAmount)
    })
}



document.getElementById("button-apply").addEventListener("click", function () {
    let inputFieldValue = getInputFieldValue("coupon-code-field");
    if (inputFieldValue === "NEW15") {
        let discountPrice = discount(15);
        setValue("discount-price", discountPrice);

        setGrandTotal(discountPrice);

        setDisabled("coupon-code-field");

    }

    else if (inputFieldValue === "Couple20") {
        let discountPrice = discount(20);
        setValue("discount-price", discountPrice);

        setGrandTotal(discountPrice);

        setDisabled("coupon-code-field");

    }
})



function setGrandTotal(discountPrice) {
    let ticketToalPrice = innerTextToNumber("total-price");
    let grandTotal = ticketToalPrice - discountPrice;
    setValue("grand-total", grandTotal);
}


function setDisabled(elementId){
    let inputFieldElement = document.getElementById(elementId);
    inputFieldElement.setAttribute("disabled", true);
}