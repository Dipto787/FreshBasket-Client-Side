import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../../../firebase/firebase.config";
import axios from "axios";
let auth = getAuth(app)
export let AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
    let [loading, setLoading] = useState(true);
    let [user, setUser] = useState(null);
    let signUp = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    let updateUserProfile = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }

    let logout = () => {
        setLoading(true);
        return signOut(auth);
    }
    let signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    let userInfo =
    {
        signUp,
        loading,
        updateUserProfile,
        user,
        logout,
        setUser,
        signIn,
        setLoading
    };
    const getToken = async email => {
        const { data } = await axios.post(
            `https://fresh-basket-server-side.vercel.app/jwt`,
            { email },
            { withCredentials: true }
        )
        return data
    }
    useEffect(() => {
        let unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                console.log(currentUser)
                getToken(currentUser.email);
            }
            setLoading(false)
        })

        return () => unsubscribe();
    }, [])
    return (
        <AuthContext.Provider value={userInfo} >
            {children}
        </AuthContext.Provider >
    )
};

export default AuthProvider;