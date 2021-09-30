function show(){
    document.querySelector('.details-popUp').style.display = 'flex';

}

function remove(){
    document.querySelector('.details-popUp').style.display = 'none';

}
var transactions = [,,];
var profile = [];
fetch('https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?'+ new URLSearchParams({
    userId : 1,
    recipientId : 2
})).then((apidata)=>{
    console.log(apidata);
    return apidata.json();
}).then((actualData)=>{
    console.log(actualData);
    transactions =  actualData.transactions;  //array of transactions to be displayed on the screen
    document.getElementById("transactions").innerHTML = returnHTML();
//     ` 
//     ${transactions.map(chatTemplate).join("")}            
// `;                                                        
//     for(var i = 0;i<actualData.transaction.length;i++ ){
//         document.getElementById("transactions").innerHTML = `
//     ${transactions.map(chatTemplate)}
// `;
    // }
    
    console.log(transactions);
}).catch((error)=>{
    console.log('The error is '+error);
})



function returnHTML (){
    var s = `<div class = "date-group">${transactions[0].startDate.substring(0,10)}</div>`;

    for(i = 0; i<transactions.length;i++){
        if(i > 0 && transactions[i].startDate.substring(0,10) != transactions[i-1].startDate.substring(0,10)){
            s+= `<div class = "date-group">${transactions[i].startDate.substring(0,10)}</div>`;
        }
        s += chatTemplate(transactions[i]);
        
    }
    return s;
}

function  chatTemplate(transaction){


    date = dateTime(transaction.startDate);

    if(transaction.direction == 1){
        // document.getElementById("transactions").className = "right";
        if (transaction.type == 1){ // pay
            return `
            <div id = "right">
            <div id = "right-column">
            <div class="details">
            <div class="upper-details">
                <p id = "money">&#8377 ${transaction.amount}</p>
                <p id = "payment-detail">you paid</p>
            </div>
            <div class="bottom-details">
                <div>
                    <p id = "id-text">Transaction Id</p>
                    <p id = "transaction-id">${transaction.id}</p>
                </div>
                <div  onClick = "show()">
                <img style="height: auto; cursor: pointer" src="assets/outline_chevron_right_black_18dp.png" alt="next">
                </div>
            </div>
        </div>
        <p class = "date-below">${date}</p>
    </div>
    </div>
    </div>
    <div class = "details-popUp" style="width: fit-content; display: none; background-color: white; cursor: pointer; opacity:1;">
            <div>
                <div onclick="remove()">
                    <img src="assets/outline_close_black_24dp.png" alt="close">
                </div>
                <div class="allInfo">
                    <div class="customerInfo">
                        <div class="profile">
                            <div class="nameInitial">Joe</div>
                        </div>
                      <p><h3>Customer Information: -</h3></p>
                      <span class="vPay">vPay: ${transaction.customer.vPay}<br>vPay ID: ${transaction.customer.vPayId}</span>
                    </div>
                    <br>
                    <div class="partnerInfo">
                      <p><h3>Partner Information: -</h3></p>
                      <span class="vPay">vPay: ${transaction.partner.vPay}<br>vPay ID: ${transaction.partner.vPayId}</span>
                    </div>
                    <br>
                    <div class="amountInfo">
                      <p><h3>Payment Information: -</h3></p>
                      <span class="paymentId">ID: ${transaction.id}<br></span>
                      <span class="amount">Amount: ${transaction.amount}<br></span>
                      <span class="amountDescription">Description: ${transaction.description}<br></span>
                      <span class="date">Initiated: ${date} <br>Ending: ${transaction.endDate}<br></span>
                    </div>
                  </div>
            </div>
        </div>
            `;
        }else{
            return `
            <div id = "right">
            <div id = "right-column">
            <div class="details">
            <div class="upper-details">
                <p id = "money">&#8377 ${transaction.amount}</p>
                <p id = "payment-detail">you requested</p>
            </div>
            <div class="bottom-details">
                <button id="cancel-button" type="button">Cancel</button>
                <div onclick = "show()">
                <img style="height: auto; cursor: pointer" src="assets/outline_chevron_right_black_18dp.png" alt="next">
                </div>
            </div>
        </div>
        <div  id = "right-date">
    <p class = "date-below">${date}</p>
    </div>
    </div>
    </div>
    </div>
    <div class = "details-popUp" style="width: fit-content; display: none; background-color: white; cursor: pointer;">
            <div>
                <div onclick="remove()">
                    <img src="assets/outline_close_black_24dp.png" alt="close">
                </div>
                <div class="allInfo">
                    <div class="customerInfo">
                        <div class="profile">
                            <div class="nameInitial">Joe</div>
                        </div>
                      <p><h3>Customer Information: -</h3></p>
                      <span class="vPay">vPay: ${transaction.customer.vPay}<br>vPay ID: ${transaction.customer.vPayId}</span>
                    </div>
                    <br>
                    <div class="partnerInfo">
                      <p><h3>Partner Information: -</h3></p>
                      <span class="vPay">vPay: ${transaction.partner.vPay}<br>vPay ID: ${transaction.partner.vPayId}</span>
                    </div>
                    <br>
                    <div class="amountInfo">
                      <p><h3>Payment Information: -</h3></p>
                      <span class="paymentId">ID: ${transaction.id}<br></span>
                      <span class="amount">Amount: ${transaction.amount}<br></span>
                      <span class="amountDescription">Description: ${transaction.description}<br></span>
                      <span class="date">Initiated: ${date} <br>Ending: ${transaction.endDate}<br></span>
                    </div>
                  </div>
            </div>
        </div>
        `;
        }
        
    }else{
        // document.getElementById("transactions").className = "left";
        if (transaction.type == 1){ // pay
            return `
            <div id = "left">
            <div class="details">
            <div class="upper-details">
                <p id = "money">&#8377 ${transaction.amount}</p>
                <p id = "payment-detail">you recieved</p>
            </div>
            <div class="bottom-details">
                <div>
                    <p id = "id-text">Transaction Id</p>
                    <p id = "transaction-id">i${transaction.id}</p>
                </div>
                <div onclick = "show()">
                <img style="height: auto; cursor: pointer" src="assets/outline_chevron_right_black_18dp.png" alt="next">
                </div>
            </div>
        </div>
        <div id = "left-date">
    <p class = "date-below">${date}</p>
    </div>
    </div>
    </div>
    </div>
    <div class = "details-popUp" style="width: fit-content; display: none; background-color: white; cursor: pointer;">
            <div>
                <div onclick="remove()">
                    <img src="assets/outline_close_black_24dp.png" alt="close">
                </div>
                <div class="allInfo">
                    <div class="customerInfo">
                        <div class="profile">
                            <div class="nameInitial">Joe</div>
                        </div>
                      <p><h3>Customer Information: -</h3></p>
                      <span class="vPay">vPay: ${transaction.customer.vPay}<br>vPay ID: ${transaction.customer.vPayId}</span>
                    </div>
                    <br>
                    <div class="partnerInfo">
                      <p><h3>Partner Information: -</h3></p>
                      <span class="vPay">vPay: ${transaction.partner.vPay}<br>vPay ID: ${transaction.partner.vPayId}</span>
                    </div>
                    <br>
                    <div class="amountInfo">
                      <p><h3>Payment Information: -</h3></p>
                      <span class="paymentId">ID: ${transaction.id}<br></span>
                      <span class="amount">Amount: ${transaction.amount}<br></span>
                      <span class="amountDescription">Description: ${transaction.description}<br></span>
                      <span class="date">Initiated: ${date} <br>Ending: ${transaction.endDate}<br></span>
                    </div>
                  </div>
            </div>
        </div>
            `;
        }else{
            return `
            <div id = "left">
            <div class="details">
            <div class="upper-details">
                <p id = "money">&#8377 ${transaction.amount}</p>
                <p id = "payment-detail">Request Recieved</p>
            </div>
            <div class="bottom-details">
                <div>
                <button id= "pay-button" type="button">Pay</button>
                <button id = "decline-button" type="button">Decline</button>
                </div>
                <div onclick = "show()">
                <img style="height: auto; cursor: pointer" src="assets/outline_chevron_right_black_18dp.png" alt="next">
                </div>
            </div>
        </div>
            <div>
    <p class = "date-below" id = "left-date">${date}</p>
    </div>
    </div>
    </div>
    <div class = "details-popUp" style="width: fit-content; display: none; background-color: white; cursor: pointer;">
            <div>
                <div onclick="remove()">
                    <img src="assets/outline_close_black_24dp.png" alt="close">
                </div>
                <div class="allInfo">
                    <div class="customerInfo">
                        <div class="profile">
                            <div class="nameInitial">Joe</div>
                        </div>
                      <p><h3>Customer Information: -</h3></p>
                      <span class="vPay">vPay: ${transaction.customer.vPay}<br>vPay ID: ${transaction.customer.vPayId}</span>
                    </div>
                    <br>
                    <div class="partnerInfo">
                      <p><h3>Partner Information: -</h3></p>
                      <span class="vPay">vPay: ${transaction.partner.vPay}<br>vPay ID: ${transaction.partner.vPayId}</span>
                    </div>
                    <br>
                    <div class="amountInfo">
                      <p><h3>Payment Information: -</h3></p>
                      <span class="paymentId">ID: ${transaction.id}<br></span>
                      <span class="amount">Amount: ${transaction.amount}<br></span>
                      <span class="amountDescription">Description: ${transaction.description}<br></span>
                      <span class="date">Initiated: ${date} <br>Ending: ${transaction.endDate}<br></span>
                    </div>
                  </div>
            </div>
        </div>
        `;
        }
    }

}

function dateTime(Date = ''){
    date = Date.substring(0,10);
    time = Date.substring(11,16);
    return date+','+time;
}