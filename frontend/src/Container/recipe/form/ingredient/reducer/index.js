import lodash from "lodash"

export const initIngredientForm = {
    id: null,
    ingredientNumber: 1,
    name: "",
    amount: 0,
    unit: "",
    isNew: true,
    isValid: true,
    isSaved: false,
    errors: new Map(),
};

const SET_ALL = "SET_ALL";
const SET_FIELD = "SET_FIELD";
const RESET = "RESET";
const CLEAR = "CLEAR";

const ingredientFormReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_FIELD:
            const { name, value } = payload;
            return { ...state, [name]: value };
        case SET_ALL:
            return { ...state, ...payload };
        case RESET:
            return { ...state, ...lodash.cloneDeep(initIngredientForm) };
        case CLEAR:
            return { ...state, ...lodash.cloneDeep(initIngredientForm) };
        default:
            return state;
    }
};

export const onUpdateIngredientField = (name, value, dispatch) => {
    dispatch({ type: SET_FIELD, payload: { name, value } });
};

export const onUpdateMultipleIngredientFields = (formData, dispatch) => {
    dispatch({ type: SET_ALL, payload: formData });
};

export const onResetIngredientForm = (dispatch) => {
    dispatch({ type: RESET });
};

export const onClearIngredientForm = (dispatch) => {
    dispatch({ type: CLEAR });
};

export default ingredientFormReducer;