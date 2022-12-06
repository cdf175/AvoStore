import {appURL} from "../../services/getData.js"
import {refreshBasket,menuSelected} from "../header/header.js"

const avocadosBasket = async () =>{

    const data = JSON.parse(localStorage.getItem('cart'));

    const $container = document.querySelector('.articles-basket');

    document.querySelectorAll(".article-basket").forEach(el => el.remove());
    document.querySelectorAll(".cart-subtotal").forEach(el => el.remove());
    
    if(!(data instanceof Array) || data.length === 0){
        console.log("No es un array")
        $container.innerHTML = "<h2>La canasta esta vacia</h2>"
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

    let buttonBasket = document.querySelector(".articles-basket")
    buttonBasket.addEventListener("click", handleBasket)
}

function handleBasket(e){
    console.log("handke basket")
    const data = JSON.parse(localStorage.getItem('cart'));

    if(!(data instanceof Array)){
        return
    }

   if(e.target.className){
        let id = e.target.getAttribute("id")
        console.log({id})
        
        const avoArr = data.map((obj)=>{
            if(obj.id === id){
                
                if(parseInt(obj.cantidad)>1){
                    
                    obj.cantidad = parseInt(obj.cantidad) - 1
                    const cantidadHtml = document.querySelector("#avoText" + id + " p")
                    cantidadHtml.innerHTML = "$" + obj.price + " x " + obj.cantidad
                    return obj
                }
            }else{
                return obj
            }
        })

        console.log({avoArr})

        const cart = avoArr.filter(value=>value)

        console.log({cart})

        if(cart){
            localStorage.setItem('cart',JSON.stringify(cart))
            if(avoArr.length != cart.length) avocadosBasket()
        }else{
            localStorage.clear()
            avocadosBasket()
        }

        refreshBasket()
   }
}

export {loadAvoBasket};