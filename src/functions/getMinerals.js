import axios from 'axios'

async function getMineralImage(mineralName) {
    const mineralMap = {
        'the rock': 'Dwayne_Johnson',
        dolomite: 'Dolomite_(mineral)',
        celestine: 'Celestine_(mineral)',
        feldspar: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Feldspar-Group-291254.jpg',
    }

    const queryName = mineralMap[mineralName.toLowerCase()] || mineralName

    const response = await axios.get(
        `https://en.wikipedia.org/w/api.php?action=query&titles=${queryName}&prop=pageimages&format=json&pithumbsize=500`
    )

    const pages = response.data.query.pages
    const page = Object.values(pages)[0]

    return page.thumbnail ? page.thumbnail.source : null
}

export async function generateRandomMineralJson(mineral) {
    const mineralImage = await getMineralImage(mineral.name)

    return {
        ...mineral,
        image: mineralImage,
    }
}

let recentlyUsedMinerals = []

export const getRandomMineral = (minerals) => {
    const maxRecentMemory = Math.min(7, minerals.length - 1)

    const unusedMinerals = minerals.filter((mineral) => !recentlyUsedMinerals.includes(mineral))

    if (unusedMinerals.length === 0) {
        recentlyUsedMinerals = []
        const randomIndex = Math.floor(Math.random() * minerals.length)
        const chosenMineral = minerals[randomIndex]
        recentlyUsedMinerals.push(chosenMineral)
        return chosenMineral
    }

    const randomIndex = Math.floor(Math.random() * unusedMinerals.length)
    const chosenMineral = unusedMinerals[randomIndex]

    recentlyUsedMinerals.push(chosenMineral)
    if (recentlyUsedMinerals.length > maxRecentMemory) {
        recentlyUsedMinerals.shift()
    }

    return chosenMineral
}
