const url ='https://swapi.dev/api/'



export async function getAllStartships(){
   return await fetch(`${url}/starships`)
    .then(res=>res.json())
    .then(data=>data.results) 
}