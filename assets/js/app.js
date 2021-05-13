let carts = document.querySelectorAll('.add-to-cart')

let products = [
    {
        name: 'Audi Q6',
        tag: 'audi',
        price: 38500,
        inCart: 0
    },

    {
        name: 'BMW X5',
        tag: 'bmw',
        price: 43650,
        inCart: 0
    },
    {
        name: 'Nissan Juke',
        tag: 'nissan',
        price: 33900,
        inCart: 0
    },
    {
        name: 'Toyota Camry 70',
        tag: 'camry',
        price: 29500,
        inCart: 0
    },
    {
        name: 'Renault Duster',
        tag: 'duster',
        price: 30250,
        inCart: 0
    },
    {
        name: 'Lamborghini Aventador',
        tag: 'lambo',
        price: 84500,
        inCart: 0
    }
]


for(let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', ()=>{
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumber(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.header-action-num').textContent = productNumbers;
    }
}

function cartNumbers(product){

    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.header-action-num').textContent = productNumbers + 1;
    } else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.header-action-num').textContent = 1;
    }

    setItems(product);

}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else{
        product.inCart = 1;
        cartItems = {
        [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product){
    //console.log('The products price is', product.price);

    let cartCost = localStorage.getItem('totalCost');


    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else{
        localStorage.setItem("totalCost", product.price);
    }


}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems)
    let cartCost = localStorage.getItem('totalCost');
    let productContainer = document.querySelector(".pr-container")
    let sum = document.querySelector(".total-sum")

    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML += `
                                        <tr>
                                        <td class='product-name'>${item.name}</td>
                                        <td class='product-price-cart'><span class='amount'>$${item.price},00</span></td>
                                        <td class='product-quantity'>
                                                <span class='amount'>${item.inCart}</span>
                                        </td>
                                        <td class="product-subtotal">$${item.inCart * item.price},00</td>
                                    </tr>
            `;

        });

        sum.innerHTML += `
        <div class="text-center" style="font-family: Montserrat">
            <h2 class="breadcrumb-title" style="font-family: Montserrat">Total:</a>
            <a class="basketTotal" style="font-family: Montserrat; color:red;">$${cartCost},00</a><br>
            <button class="btn-primary" onclick="clearst()" style="color:black; background-color:red;">clear</button>
        </div>
        `;

    }
}

function clearst(){
    localStorage.clear();
    document.location.reload();
}

onLoadCartNumber();
displayCart();