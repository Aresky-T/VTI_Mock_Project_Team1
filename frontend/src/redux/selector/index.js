import { useSelector } from "react-redux"

export const useAuth = () => {
    return useSelector(state => state.auth);
}

export const useProfile = () => {
    return useSelector(state => state.user.user);
}