const initialState = {
    isOnline: false
}

export const internetState = (state = initialState, action: any) => {
    switch (action.type) {
        case ('online'):
            return { ...state, isOnline: true }
        case ('ofline'):
            return { ...state, isOnline: false }
        default:
            return { ...state, isOnline: false }
    }
}