const products = document.querySelector('.products');
const cart = document.querySelector('.cart');
const URL = "https://fakestoreapi.com/products";
let cartProducts = [];

function fetchData(funcion, url) {
    try {
      return fetch(url)
      .then(response => response.json())
      .then(data => {
        funcion(data);
      })
    } catch {
      console.log("Error");
    };
  };


  function showProducts(data) {  
    let htmlContentToAppend = "";
      for (let product of data) {
        let rating = product.rating;
        htmlContentToAppend += `
        <div class="container-fluid list-group m-4 producto cursor-active" id="${product.id}" data-name="${product.name}" data-description="${product.description}" data-cost="${product.price}"}>
          <div class="product row list-group-item list-group-item-action d-flex justify-content-between">
            <div class="col-3">
              <img src="${product.image}" alt="${product.title}" class="product-image img-thumbnail">
            </div>
            <div class="col-7">
              <h2 class="product-name">${product.title}</h2>
              <p class="product-description">${product.description}</p>
              <strong class="product-cost">$${product.price}</strong>
            </div>
            <div class="col-2 text-muted">
              <p class="product-sold" id="count${product.id}">Stock: ${rating.count}</p>
            </div>
            <div class="row">
                <div class="col-1 offset-11 d-flex justify-content-end align-items-end mb-3">
                <button type="button" class="buy-button btn btn-primary btn-lg" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-count="${rating.count}">Comprar!</button>
                </div>
            </div>
          </div>
        </div>
      `;
    };
    products.innerHTML = htmlContentToAppend;    
    const buttons = document.querySelectorAll('.buy-button');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = document.getElementById('input' + btn.dataset.id);
            if(cartProducts.includes(btn.dataset.id)){
                input.setAttribute('value', input.value++);
                document.querySelector('#strong' + btn.dataset.id).textContent = `$${(btn.dataset.price * parseInt(input.value)).toFixed(2)}`;
                document.querySelector('#strong' + btn.dataset.id).setAttribute('data-total', (btn.dataset.price * parseInt(input.value)).toFixed(2));
            } else {          
            cart.innerHTML += `
                <li class="list-group-item m-2 shopping" id="btn${btn.dataset.id}">
                    <p>${btn.dataset.title}</p>
                    <label for="input${btn.dataset.id}"><span>x</span></label>
                    <input type="number" id="input${btn.dataset.id}" class='contador' min="1" max="${btn.dataset.count}" value="1" style="width: 2rem" readonly/><br>
                    <strong id="strong${btn.dataset.id}" class="price" data-total='${btn.dataset.price}'>$${btn.dataset.price}</strong>
                </li>
            `;
            cartProducts.push(btn.dataset.id);
            };
            btn.setAttribute('data-count', btn.dataset.count - 1);
            document.querySelector(`.product-sold#count${btn.dataset.id}`).textContent = `Stock: ${btn.dataset.count}`;
            if(btn.getAttribute('data-count') == 0){
                btn.classList.add('disabled');
            };
        });
    });
};



document.addEventListener('DOMContentLoaded', () => {
    fetchData(showProducts, URL);
});