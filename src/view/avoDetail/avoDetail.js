import {refreshBasket,menuSelected} from "../header/header.js"
import {getAvocado,appURL} from "../../services/getData.js"

let objDetail = {}

const loadAvoDetail = async (id)=>{

    objDetail = await getAvocado(id);

    const container = document.querySelector('#main-container')
    const HTMLfile = 'src/view/avoDetail/avoDetail.html'
    const res = await fetch(HTMLfile)
    let htmlText = await res.text()
    htmlText = htmlText.replace("{{imagen}}",appURL + objDetail.image)
    htmlText = htmlText.replace("{{name}}", objDetail.name)
    htmlText = htmlText.replace("{{price}}", objDetail.price)
    htmlText = htmlText.replace("{{sku}}", objDetail.sku)
    htmlText = htmlText.replace("{{descripcion}}", objDetail.attributes.description)
    
    container.innerHTML = htmlText

    menuSelected()
    eventDetail()

}

function eventDetail(){

    let buttonAddAvo = document.getElementById("addAvo")

    console.log({buttonAddAvo})

    buttonAddAvo.addEventListener("click", handleAddAvo)
}

function handleAddAvo(e){
    console.log("entro en handle")
    //click en boton agregar carrito
    let cart = []
    
    cart = JSON.parse(localStorage.getItem('cart'))
    let cantidadDetail = document.getElementById("cantAvocado").value

    objDetail.cantidad = cantidadDetail
    if (!cart){
        cart = []
        cart.push(objDetail)
    }else{
        let index = cart.findIndex( (obj) => obj.id === objDetail.id)

        if(index >=0 ){
            cart[index].cantidad = parseInt(cart[index].cantidad) + parseInt(cantidadDetail)
        }
        else{
            cart.push(objDetail)
        }
    }

    localStorage.setItem('cart',JSON.stringify(cart))

    e.target.disabled = true

    e.target.style.opacity = 0.7;
    e.target.textContent = 'Agregando...';
    
    //simula operacion de agregado
    setTimeout(function() {
        e.target.textContent = 'A la Canasta';
        e.target.style.opacity = 1;
        e.target.disabled = false;
        refreshBasket()
    }, 1000);

}

export {loadAvoDetail,objDetail,eventDetail};