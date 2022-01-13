const login = () => {
    return {
        type: "LOGIN",
        payload: user
    };
};

const signout = () => {
    return {
        type: "LOGOUT"
    };
};

export default {
    login,
    signout
};