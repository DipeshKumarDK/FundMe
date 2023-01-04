export const changeTotal = (total) => {
    return{
        type:"CURRTOTAL",
        total:total
    }
}

export const changeSearch = (search) => {
    return{
        type:"SEARCH",
        search:search
    }
}
