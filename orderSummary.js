  
  function toggleMenu() {
    const menu = document.getElementById('dropdownMenu');
    menu.classList.toggle('show');
  }

      let cart =  JSON.parse(localStorage.getItem('cart')); 

    function updateCartQuantity(){
        let cartQuantity = 0;
        cart.forEach((item) =>{
            cartQuantity = cartQuantity + item.quantity;
        });

        document.querySelector('.cart-quantity').innerHTML = cartQuantity;
    } updateCartQuantity();



      if(!cart){ 
        cart = [{
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: 2    
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: 3
        }];
      }
      


        function saveToStorage(){
          localStorage.setItem('cart', JSON.stringify(cart)); console.log(cart);
        }
          
        saveToStorage();
  
// cart.js code



function renderOrderSummary(){

      let checkoutHtml = '';
      let cartNo = 0;
      cart.forEach((cartItem) =>{
            cartNo = cartNo + Number(cartItem.quantity);
            const productId = cartItem.productId;
            
            let matchingProduct;
            products.forEach((product) =>{
                if(product.id === productId){
                    matchingProduct = product;
                }
            });
          

            // const today = dayjs();
            // const delDate = today.add(deliveryOption.deliveryDays, 'days');
            // const date = delDate.format('dddd, MMMM D');

            const date = "date.369"; console.log(matchingProduct);


          checkoutHtml =checkoutHtml + `<div class="tostyle">
                <div class="cart-item-container-${matchingProduct.id}">
                    <div class="delivery-date">
                      Delivery date: ${date}
                    </div>

                    <div class="cart-item-details-grid">
                      <img class="product-image"
                        src="${matchingProduct.image}">

                      <div class="cart-item-details">
                        <div class="product-name">
                        ${matchingProduct.name}
                        </div>
                        <div class="product-price">
                          Ksh ${matchingProduct.priceCents}
                        </div>
                        <div class="product-quantity">
                          <span>
                            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                          </span>
                          <span class="update-quantity-link link-primary">
                            Update
                          </span>
                          <span class="delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                            Delete
                          </span>
                        </div>
                      </div>
                    </div>
                  </div></div>
                  `; 
        });







// console.log(checkoutHtml);

// console.log(matchingProduct.id);







    const cartSummary = document.querySelector('.order-summary');
    cartSummary.innerHTML = checkoutHtml;

    const delBtns = document.querySelectorAll('.delete-quantity-link'); 
    delBtns.forEach((btn) =>{
        btn.addEventListener('click', ()=>{
          
            const productId = btn.dataset.productId;
            removeFromCart(productId);
            

            const container = document.querySelector(`.cart-item-container-${productId}`);
            container.remove();
            renderPaymentSummary (); 
            updateItemsNo();
        })
    })

    function removeFromCart(productId){
        const newCart = [];

        cart.forEach((cartItem) =>{
            if(cartItem.productId !== productId){
                newCart.push(cartItem);
            }
        })

        cart = newCart;

        saveToStorage();
        

    }


     function renderPaymentSummary () {
        let productPriceCents = 0;
        cart.forEach((cartItem) =>{
            const productId = cartItem.productId;
            let matchingProduct;
            products.forEach((product) =>{
                if(product.id === productId){
                    matchingProduct = product;
                }
            });
                const prc = matchingProduct.priceCents;
                productPriceCents += prc * cartItem.quantity;
        })
      
        

        const totalBeforeTaxPrice = Number(productPriceCents);
        const taxCents = totalBeforeTaxPrice * 0.1;
        const totalCents = totalBeforeTaxPrice + taxCents;

        const paymentSummaryHTML =`
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div class = "cartitems">${cartNo} items:</div>
            <div class="payment-summary-money">Ksh ${productPriceCents}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">Ksh ${totalBeforeTaxPrice}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">Ksh ${taxCents}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">Ksh ${totalCents}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        `;

        const payHtml = document.querySelector('.payment-summary');
        payHtml.innerHTML = paymentSummaryHTML;

      }
      
      renderPaymentSummary ();
} 




renderOrderSummary(); 


    function updateItemsNo(){
      const itemsNoDiv = document.querySelector('.return-to-home-link');
      const itemsNo = document.querySelector('.cartitems');
              cartNo = 0;
            cart.forEach((cartItem) =>{
            cartNo = cartNo + Number(cartItem.quantity);
          })
      cartNo = `${cartNo} items`;
      itemsNoDiv.innerText = cartNo;    console.log(cartNo);  
      itemsNo.innerText = cartNo;    
    }

    updateItemsNo();