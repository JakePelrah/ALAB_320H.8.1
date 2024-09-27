const url = 'https://swapi.dev/api/'



export async function getAllStartships() {
    
    const starships = []

    let res = await fetch(`${url}/starships`).then(res=>res.json())
    starships.push(res.results)


    while (res.next !== null) {
        res = await fetch(res.next).then(res=>res.json())
        starships.push(res.results)
    }

    return starships.flat()
}