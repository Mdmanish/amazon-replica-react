const initialState = {
    userId: "",
    userName: "",
    name: "",
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "USER":
            console.log("action.payload", action.payload);
            state = {
                ...state,
                userName: action.payload.userName,
            }
            break
        default:
            break
    }
    return state;
};

export default userReducer;
