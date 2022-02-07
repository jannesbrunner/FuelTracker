export const getTimeFrame = (data) => {
    return {
        to: data[0].created_at.substring(0, 10),
        from: data[data.length - 1].created_at.substring(0, 10)
    }
}

export const getTotalKM = (data) => {
    return data[0].mileage - data[data.length - 1].mileage
}

export const getAvgConsumption = (data) => {
    let totalL = 0.0;
    for (let index = 1; index < data.length; index++) {
        totalL += data[index].volume
    }
    return {
        "km100": ((totalL / getTotalKM(data)) * 100).toFixed(2),
        "km10": ((totalL / getTotalKM(data)) * 10).toFixed(2),
        "km1": ((totalL / getTotalKM(data))).toFixed(2)
    }
}

export const getAvgCostsPerKm = (data) => {
    let totalEuros = 0.0;
    for (let index = 1; index < data.length; index++) {
        totalEuros += data[index].price
    }
    return {
        "euro100": ((totalEuros / getTotalKM(data)) * 100).toFixed(2),
        "euro10": ((totalEuros / getTotalKM(data)) * 10).toFixed(2),
        "euro1": ((totalEuros / getTotalKM(data))).toFixed(2)
    }
}

export const getAvgCostsPerLiter = (data) => {
    const costsPerLiter = []
    data.forEach(fueling => {
        costsPerLiter.push(fueling.price / fueling.volume)
    });
    const sum = costsPerLiter.reduce((a, b) => a + b, 0);
    const sortedCosts = costsPerLiter.sort()

    const median = () => {
        let length = sortedCosts.length;
        if (length % 2 == 0) {
            return (sortedCosts[(length / 2) - 1] + sortedCosts[(length / 2)]) / 2
        } else {
            return sortedCosts[Math.floor(length / 2)]
        }
    }

    return {
        max: sortedCosts[sortedCosts.length - 1].toFixed(2),
        min: sortedCosts[0].toFixed(2),
        avg: (sum / costsPerLiter.length).toFixed(2) || 0,
        median: median().toFixed(2)
    }

}