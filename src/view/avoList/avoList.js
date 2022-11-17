import {getAvocados,appURL} from "../../services/getData.js"

const avocadosList = async () =>{

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

    $container.appendChild($fragment)

}

const loadAvoList = async ()=>{
    const container = document.querySelector('#main-container')
    const HTMLfile = 'src/view/avoList/avoList.html'
    const res = await fetch(HTMLfile)
    let htmlText = await res.text()
    container.innerHTML = htmlText

    avocadosList()
}

export { avocadosList,loadAvoList};