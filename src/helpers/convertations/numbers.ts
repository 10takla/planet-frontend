export const convertNumToUnit = (input: number, indexSkip = 0) => {
    const units = ['тыс', 'млн', 'млрд', 'трлн']
    let currUnit = ''
    let currNum = input
    units.findIndex((unit, i) => {
            const y = 1000 ** (i + 1)
            if (input > y && i > indexSkip - 1) {
                currUnit = unit + '.'
                currNum = Number((input / y).toFixed(1))
            } else {
                return true
            }
        }
    )
    return `${currNum.toLocaleString()} ${currUnit}`
}