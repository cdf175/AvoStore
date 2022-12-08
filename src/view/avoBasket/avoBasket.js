import {appURL} from "../../services/getData.js"
import {refreshBasket,menuSelected} from "../header/header.js"

const avocadosBasket = async () =>{

    const data = JSON.parse(localStorage.getItem('cart'));

    const $container = document.querySelector('.articles-basket');

    document.querySelectorAll(".article-basket").forEach(el => el.remove());
    document.querySelectorAll(".cart-subtotal").forEach(el => el.remove());
    
    if(!(data instanceof Array) || data.length === 0){
        $container.innerHTML = "<h2>La canasta esta vacia</h2>"
        refreshBasket()
        return
    }

    const $fragment = new DocumentFragment();
    const articleTemplate = document.querySelector('#articleBasketTemplate')
    let totalAmount = 0
    let totalPrice = 0

    data.forEach((avocado)=>{

        const tempClone = articleTemplate.content.cloneNode(true)

        const img = tempClone.querySelector("img");
        img.setAttribute("src", `${appURL}/${avocado.image}`);

        tempClone.querySelector("h2").textContent = avocado.name ;
        tempClone.querySelector("p").textContent = "$" + avocado.price + " x " + avocado.cantidad ;
        tempClone.querySelector("button").setAttribute("id", avocado.id);
        tempClone.querySelector("#avoTextId").setAttribute("id", "avoText" + avocado.id);

        totalAmount = parseInt(totalAmount) +  parseInt(avocado.cantidad)
        totalPrice = (Number(totalPrice) + (Number(avocado.price) * parseInt(avocado.cantidad))).toFixed(2)

        $fragment.appendChild(tempClone)
    })

    const div = document.createElement("div");
    div.classList.add("cart-subtotal");
    div.innerHTML = "<h4> Cantidad Total: " + totalAmount + "</h4>" + "<h4> Precio Total $: " + totalPrice + "</h4>"
    $fragment.appendChild(div)

    $container.appendChild($fragment)
  
    refreshBasket()
    
}

const loadAvoBasket = async ()=>{
    const container = document.querySelector('#main-container')
    const HTMLfile = 'src/view/avoBasket/avoBasket.html'
    const res = await fetch(HTMLfile)
    let htmlText = await res.text()
    container.innerHTML = htmlText

    avocadosBasket()
    menuSelected()
    eventBasket()
}

function eventBasket(){

    let $articles = document.querySelector(".articles-basket")
    $articles.addEventListener("click", handleBasket)
}

function handleBasket(e){
    //Array de objetos 
    const data = JSON.parse(localStorage.getItem('cart'));

    if(!(data instanceof Array)){
        return
    }
   //Si hizo click en un boton con la clase btnRemove
   if(e.target.className === "btnRemove"){

        let id = e.target.getAttribute("id")

        //Clona data. Resta la cantidad cuando coincide el id. Si la cantidad es 1 no agrega el objeto.
        const avoArr = data.map((obj)=>{
            if(obj.id === id){
                if(parseInt(obj.cantidad)>1){
                    obj.cantidad = parseInt(obj.cantidad) - 1
                    return obj
                }
            }else{
                return obj
            }
        })

        //filtra elementos null
        const cart = avoArr.filter(value=>value)

        if(cart){
            localStorage.setItem('cart',JSON.stringify(cart))
        }else{
            localStorage.clear()
        }

        avocadosBasket()
   }
}

export {loadAvoBasket};