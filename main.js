import {avocadosList,loadAvoList} from "./src/view/avoList/avoList.js"
import {avoDetail} from "./src/view/avoDetail/avoDetail.js"

const InsertaHTML = async (e)=>{
    const container = document.querySelector('body')
    const HTMLfile = e.getAttribute('data-include')

    const res = await fetch(HTMLfile)
    const htmlText = await res.text()

    e.outerHTML = htmlText
}

const loadPage = ()=>{
    document.querySelectorAll("[data-include]").forEach((e)=>{
        InsertaHTML(e)
    })
    avocadosList()
}

loadPage()


/*document.addEventListener("click",(e) => {
    if(!e.target.matches(".article")) return false;
    console.log("click en articulo")
})*/

window.addEventListener('hashchange', () => {

    const view = location.hash.slice(1).split('/')[1] || '/';
    const id = location.hash.slice(1).split('/')[2] || '/';
    console.log(view);
    console.log(id);

    window.history.pushState({}, "Hecho", "/");
    switch (view) {
        case "avoDetail":
            avoDetail(id);
            break;
        case "avoList":
            loadAvoList()
            break;
    }


    //localStorage.setItem('charID', id);
    console.log('hasta aca');
    //window.location.replace('/character.html');
});





