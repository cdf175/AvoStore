import {getAvocados,appURL} from "../../services/getData.js"
import {menuSelected} from "../../view/header/header.js"

let attempts = 0
const loader = document.getElementById('lds-ring');

const avocadosList = async () =>{
    
    loader.style.display = 'grid';
    const { data } = await getAvocados();
    const $container = document.querySelector('.articles-container');

    const $fragment = new DocumentFragment();
    const articleTemplate = document.querySelector('#articleTemplate')

    data.forEach((avocado)=>{

        const tempClone = articleTemplate.content.cloneNode(true)

        const img = tempClone.querySelector(".article img");
        img.setAttribute("src", `${appURL}/${avocado.image}`);

        const a = tempClone.querySelector("a");
        a.setAttribute("href", `/#/avoDetail/${avocado.id}`);

        tempClone.querySelector(".article div h2").textContent = avocado.name + "yolo";
        tempClone.querySelector(".article div p").textContent = avocado.price;

        $fragment.appendChild(tempClone)
    })

    loader.style.display = 'none';
    $container.appendChild($fragment)

    avoListEvent()
    attempts = 0
}

const loadAvoList = async ()=>{
    
    const container = document.querySelector('#main-container')
    const HTMLfile = 'src/view/avoList/avoList.html'
    const res = await fetch(HTMLfile)
    let htmlText = await res.text()
    container.innerHTML = htmlText

    avocadosList()
    menuSelected()
}

function avoListEvent(){
    const iconImg = document.getElementById("iconAvocado")
    iconImg.addEventListener("click",handleAvoImg)
}

function handleAvoImg(e){
    if(attempts > 3) return

    if(attempts < 3){
        e.target.classList.toggle("jello-vertical");
        setTimeout(function() {
            e.target.classList.toggle("jello-vertical");
        }, 50);
        attempts = attempts + 1
        return
    }else{
        e.target.setAttribute("src","src/assets/images/avocadoAnnoyed.png")
        e.target.classList.remove("jello-vertical")
        attempts = attempts + 1
        setTimeout(function() {
            alert("Ups... a la palta no le gusta que la toquen...")
        }, 50);
    }
}

export { avocadosList,loadAvoList};