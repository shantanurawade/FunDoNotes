export const toggleTheme = () => {
    return {
        type: "TOGGLE_THEME",
    }
}

export const isActive = () => {
    return{
        type: "online"
    }
}
export const isOffline = () => {
    return{
        type: "ofline"
    }
}