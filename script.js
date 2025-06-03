
  function toggleMenu() {
    const menu = document.getElementById('dropdownMenu');
    menu.classList.toggle('show');
  }
  
    const track = document.getElementById('sliderTrack');
    const slides = document.querySelectorAll('.slide');
    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateSliderPosition() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSliderPosition();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSliderPosition();
    }

    setInterval(() => {
    nextSlide();
    }, 5000);      




    let productsHtml = '';

    products.forEach((product) => {
        productsHtml = productsHtml + `
            <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
            ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="ratings/rating-${product.rating.stars * 10}.png">
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
            Ksh ${product.priceCents}
            </div>

            <div class="product-quantity-container">
                <select id="${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>

            <div class="added-to-cart">
                <img src="icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary" data-product-id = "${product.id}">
                Add to Cart
            </button>
            </div>
        `;
    })

        function saveToStorage(){
            localStorage.setItem('cart', JSON.stringify(cart)); console.log(cart);
        }

        function loadCartFromStorage() {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    }

        function addToCart(productId){

            var qtt = document.getElementById(productId).value;
            qtt = Number(qtt);
            
            cart = loadCartFromStorage(); 
            let matchingItem;
            cart.forEach((item) => {
                if(productId === item.productId){
                    matchingItem = item;
                }
            });

            if(matchingItem){
                matchingItem.quantity = Number(matchingItem.quantity);
                matchingItem.quantity = matchingItem.quantity + qtt; 
            } else{
                cart.push({
                    productId: productId,
                    quantity: qtt
                });          
            }
            
            saveToStorage()
        }


    function updateCartQuantity(){
    let cartQuantity = 0;
    cart.forEach((item) =>{
        cartQuantity = cartQuantity + item.quantity;
    });

    document.querySelector('.cart-quantity').innerHTML = cartQuantity;
    }


    document.querySelector('.products-grid').innerHTML = productsHtml;


    cart = loadCartFromStorage();
    updateCartQuantity();



    let productHtml = '';

    products.forEach((product) => {
        productHtml = productHtml + `
                    <div class="card">
                        <div class="image-container">
                            <img src="${product.image}" alt="Image 1">
                        </div>
                        <div class="product-name limit-text-to-2-lines">
                         ${product.name}
                        </div>

                        <div class="product-price">
                        Ksh ${product.priceCents}
                        </div>

                        <div class="product-quantity-container">
                            <select id="${product.id}">
                            <option selected value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            </select>
                        </div>

                        <div class="added-to-cart">
                            <img src="icons/checkmark.png">
                            Added
                        </div>

                        <button class="add-to-cart-button button-primary" data-product-id = "${product.id}">
                            Add to Cart
                        </button>
                    </div>
        `;
    });

    const grid = document.querySelector(".grid");
    grid.innerHTML = productHtml;

        document.querySelectorAll('.add-to-cart-button').forEach((button) => {
        button.addEventListener('click', ()=>{
            const productId = button.dataset.productId;

            addToCart(productId);

            updateCartQuantity();
        });
    }); 
