const express = require('express')
const app = express()
const port = 3000

app.use(express.static('static'))


async function getRandomCard(){
    let myHeaders = {
        "Accept": "*/*",
        "User-Agent":"Wheeling Runner App"
    }

    let req = await fetch("https://api.scryfall.com/cards/random?q=f%3Avintage",{
        headers:myHeaders
    })
    let response;
    try{
        response = await req.text()
        response = JSON.parse(response)
    }catch{
        //assume the error is due to a timeout, try again
        console.log(response)
        return await getRandomCard()
    } 

    //console.log(response)
    try{
        let toReturn = {
            name:response.name,
            image:response.image_uris.png
        }
        return toReturn
    }catch{
        console.log(response)
        let toReturn = {
            name:response.name,
            image:response.card_faces[0].image_uris.png
        }
        return toReturn
    }
    
}


app.get('/', (req, res) => {
  res.sendFile("static/index.html")
})

app.get('/random', async (req,res) => {
    console.log("Handling request for random card")
    res.send(JSON.stringify(await getRandomCard()))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})