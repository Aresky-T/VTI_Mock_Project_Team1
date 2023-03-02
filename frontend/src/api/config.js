export const configApi = (token) => {
    return {
        headers : {
            Authorization: `Bearer ${token}`
        }
    }
}