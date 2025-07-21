const cardback = "https://m.media-amazon.com/images/I/61AGZ37D7eL._UF894,1000_QL80_.jpg"

var processing = false

async function getRandomCard(){
    let req = await fetch("random")
    let res = await req.json()
    return res
}

async function getCards(){
    if(processing){
        alert("Please wait")
        return
    }
    processing = true
    let toUpdate = document.getElementsByTagName("img")
    for(let image of toUpdate){
        image.classList = "grayscale"
        image.src = cardback
    }

    for(let image of toUpdate){
        
        let res = await getRandomCard()
        image.classList = ""
        image.src = res.image
    }
    processing = false
}

(async ()=>{
    window.onload = () => {
        let toUpdate = document.getElementsByTagName("img")
        
        for(let image of toUpdate){
            image.classList = "grayscale"
            image.src = cardback
        }
        document.getElementById("submit").onclick = getCards
    }
    //console.log(await getRandomCard())
})()