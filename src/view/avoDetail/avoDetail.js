import {getAvocado,appURL} from "../../services/getData.js"

const avoDetail = async (id)=>{
    console.log("Hola avo Detail Nº" +id )
    const data = await getAvocado(id);
    console.log(data);

    const container = document.querySelector('#main-container')
    const HTMLfile = 'src/view/avoDetail/avoDetail.html'
    const res = await fetch(HTMLfile)
    let htmlText = await res.text()
    htmlText = htmlText.replace("{{imagen}}",appURL + data.image)
    htmlText = htmlText.replace("{{name}}", data.name)
    htmlText = htmlText.replace("{{price}}", data.price)
    htmlText = htmlText.replace("{{sku}}", data.sku)
    htmlText = htmlText.replace("{{descripcion}}", data.attributes.description)
    console.info(htmlText)
    container.innerHTML = htmlText

}

export { avoDetail };