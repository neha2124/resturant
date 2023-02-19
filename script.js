const cards = document.querySelector(".cards")
const order = document.querySelector(".your-order")
const table = document.querySelector("#customers")
const Loading = document.querySelector(".loading-container")
const placeOrder = document.querySelector(".order")
const pay = document.querySelector("#pay")
const payment = document.querySelector(".payment")
const demo = document.querySelector(".list")
const orderPrepartion = document.querySelector(".order-prep")
const thanks = document.querySelector("#thank")
const close = document.querySelector(".order-close-btn")
//this function fetch food menu and call display and order function
async function getMenu (){
  try{ const url ="https://free-food-menus-api-production.up.railway.app/burgers"
   const response = await fetch(url)
   const data = await response.json()
   const menu = data;
   display(menu)
  
  takeOrder(menu)
   
  }catch (err){
    cards.innerHTML = err.message
  }
    // console.log(data)
}
//this function display food item to screen
function display (data) {
    let html =""
  data.forEach(item=> {
    html += `
    <div class="card">
                <div class="card-body">
                 <div class="card-img">
                    <img src="${item.img}" alt="">
                    </div>
                    <div class="card-text">
                    <span> ${item.name}</span>
                    
                    <p>price:&nbsp; &nbsp;  ₹ ${item.price}  </p>
                    <p>Ratings: &nbsp; &nbsp; ${item.rate}</p>
                    
                    </div>
                    <button class="food-order">Order Now</button>
                </div>
            </div>
    `
    
  });
  cards.innerHTML = html

}

let Order = {orderStaus:false , paymentStatus : false}
// this function randomly take order and return orderStatus 
function takeOrder (data){
   
   let obj = []
    for (let i=0; i<3; i++){
        let rndom = Math.floor(Math.random() *data.length) 

        obj.push(data[rndom])
        // console.log(obj)
        
    }
   
    return new Promise ((res) => {
      
           let  Html =  `
           
            <thead>
            <tr>
             <th>#</th>
              <th scope="col">Item</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>

            `
            obj.map((item)=>{
                let quan = Math.floor(Math.random()*5)+1
            Html += `
            <tbody class="t-body">
            <tr>
        
              <td class="img"><img src = " ${item.img}"> </td>          
              <td>   ${item.name}</td> 
              <td class="price"> ${item.price*quan}</td>
             <td> ${quan}</td>
             
            </tbody>
            `
            })
            setTimeout(() => {
              res(table.innerHTML= Html)
                    Order.orderStaus = true;
                    // console.log(Order)
            }, 2000);
          
    })
    
} 
//this function return payment Status and alert
function payOrder (){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(
               
                  Order.paymentStatus = true,
                //   alert("your payment is successful")
            )
                 
          }, 1500);
          
    })
  }

// this function hide display
   function payDisplay(){
    if(payOrder){
    payment.classList.add("hide")
    }
   }
  

 
   function orderPrepDisplay(){
    let html = ` <div class="loading-container">
    <h2>Order  preparing</h2>
    <div class="loading"></div>
    <div class="loading loading-2"></div>
    <div class="loading loading-3"></div>
</div> 
    
    `
       orderPrepartion.innerHTML = html;

    
   }

 
// this function check order and payment staus and call orderprepDisplay()
function orderPrep () {
    return new Promise((resolve) => {
        if(Order.orderStaus == true && Order.paymentStatus == true){
            setTimeout(()=>{
            resolve(payment.classList.add("hide"),
            orderPrepDisplay()
            )
            },1000)
        }
        thankyou()
    })
   
    
}
//this function shows thanks message when order is preapred
function thankyou (){
    setTimeout(()=>{
        orderPrepartion.innerHTML ="";
        // orderPrepartion.innerHTML = "th"
        thanks.classList.remove("hide")
        
        },3000)
}
const payed = document.querySelector("#payed")
payed.addEventListener("click",()=>orderPrep())
console.log(payed)
// takeOrder(card)
placeOrder.addEventListener("click",()=>{
    order.classList.remove("hide")
})
pay.addEventListener("click",()=>{
    
    demo.classList.add("hide")
    payment.classList.remove("hide")
   
})
close.addEventListener("click" ,()=>{
    order.classList.add("hide")
} )
getMenu()

payDisplay()
// orderPrep()
payOrder()

