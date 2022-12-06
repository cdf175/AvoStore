/*********       Trae los modulos que necesito de los otros archivos js          *********/
import {refreshBasket} from "./src/view/header/header.js"
import {avocadosList,loadAvoList} from "./src/view/avoList/avoList.js"
import {loadAvoDetail} from "./src/view/avoDetail/avoDetail.js"
import {loadAvoBasket} from "./src/view/avoBasket/avoBasket.js"

/*****************************************************************************************/


/*********   Reemplaza pedazo de la pagina con el archivo html indicado en el valor de data-include   *********/
const InsertaHTML = async (e)=>{
    const container = document.querySelector('body')
    const HTMLfile = e.getAttribute('data-include')

    const res = await fetch(HTMLfile)
    const htmlText = await res.text()

    e.outerHTML = htmlText

    if(htmlText.indexOf("header.html")){
        refreshBasket()
    }
}

const loadPage = ()=>{

    document.querySelectorAll("[data-include]").forEach((e)=>{
        InsertaHTML(e)
    })
    
    if(location.hash.slice(1).split('/')[1]){
        handleRouter()
    }
    else{
        avocadosList()
    }
}

// Se ejecuta al iniciar
loadPage()



window.addEventListener('hashchange', handleRouter);

function handleRouter(){
    const view = location.hash.slice(1).split('/')[1] || '/';
    const id = location.hash.slice(1).split('/')[2] || '/';

    switch (view) {
        case "/" :
            loadAvoList()
            break;
        case "avoList":
            loadAvoList()
            break;
        case "avoDetail":
            loadAvoDetail(id);
            break;
        case "avoBasket":
            loadAvoBasket();
            break;
    }

}




