const initialState = {
    isDarkTheme: false
}

export default (state = initialState, action: any) => {

    switch (action.type) {
        case "TOGGLE_THEME":
            return { ...state, isDarkTheme: !state.isDarkTheme }
        // case "SET_LIGHT":
        //     return { ...state, isDarkTheme: false }
    }
    return state

}
