function refreshBasket(){
    const $basketHeader = document.getElementById("headerBasket")

    const data = JSON.parse(localStorage.getItem('cart'));
    console.log({data})
    if(!(data instanceof Array) || data.length === 0){
        $basketHeader.innerHTML = "Canasta" 
    }else{

        let total = data.reduce((acc,obj)=> acc + parseInt(obj.cantidad),0 )
        $basketHeader.innerHTML = "Canasta(" + total + ")"
    }
}

function menuSelected(){

    const doc = document.querySelectorAll(".header__icon-container")
    const view = location.hash.slice(1).split('/')[1] || '/';
    console.log(doc)
    console.log({view})
    doc.forEach(el => el.classList.remove("icon--selected"))
    

    if(view ==="avoList" || view ==="/") doc[0].classList.add("icon--selected")

    if(view ==="avoBasket") doc[1].classList.add("icon--selected")
    
}

export {refreshBasket,menuSelected}