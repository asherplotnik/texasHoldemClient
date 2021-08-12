
// Handling Products AppState

import AuthModel from "../models/AuthModel";

// Products AppState - המידע ברמת האפליקציה הקשור למוצרים - אלו בעצם כל המוצרים:
export class AuthState {
    public auth: AuthModel = new AuthModel(); // We're going to create initial object
    public constructor() {
        const storedAuth = JSON.parse(localStorage.getItem("auth"));
        if(storedAuth) {
            this.auth = storedAuth;
        }
    }
}

// ----------------------------------------------------------------------------------

// Products Action Types - אלו פעולות ניתן לבצע על המידע ברמת האפליקציה:
export enum AuthActionType {
    Login="Login",
    Logout="Logout",
    UpdateWallet="UpdateWallet" 
}

// ----------------------------------------------------------------------------------

// Product Action - אובייקט המכיל את המידע עבור הפעולה שאנו מבצעים על המידע ברמת הפליקציה
export interface AuthAction {
    type: AuthActionType;
    payload?: any; // payload?: any; if the payload can be empty.
}

// ----------------------------------------------------------------------------------

// Products Action Creators - מתאים עבור כל פעולה Action ומחזירות אובייקט payload-פונקציות המקבלות את ה

export  const loginAuthAction = (session: AuthModel): AuthAction => {
    return { type: AuthActionType.Login, payload: session };
}

export  const logoutAuthAction = (): AuthAction => {
    return { type: AuthActionType.Logout};
}

export  const updateAuthAction = (wallet: number): AuthAction => {
    return { type: AuthActionType.UpdateWallet, payload: wallet };
}

// ----------------------------------------------------------------------------------

// Products Reducer - פונקציה המבצעת את הפעולה בפועל
export const AuthReducer = (currentState: AuthState = new AuthState(), action: AuthAction): AuthState => {
    
    const newState = {...currentState}; // Spread Operator - שכפול אובייקט

    switch(action.type) {
        case AuthActionType.Login:
            newState.auth.token = action.payload.token; 
            newState.auth.name = action.payload.name; 
            newState.auth.id = action.payload.id;
            localStorage.setItem("auth", JSON.stringify(newState.auth));
            break;
        case AuthActionType.Logout:
            newState.auth = new AuthModel();
            localStorage.removeItem("auth"); // clear user from the local storage.
            break;
        case AuthActionType.UpdateWallet:
            newState.auth.wallet = action.payload;
            localStorage.setItem("auth", JSON.stringify(newState.auth));
            break;
    }

    return newState;
}
