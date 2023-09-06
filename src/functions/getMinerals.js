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
