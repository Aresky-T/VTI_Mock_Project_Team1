import lodash from "lodash";

const SET_ALL = "SET_ALL";
const SET_FIELD = "SET_FIELD";
const RESET = "RESET";
const CLEAR = "CLEAR";

export const initStepForm = {
    stepNumber: 1,
    name: "",
    description: "",
    duration: "",
    imageUrl: null,
    imageFile: null,
    isNew: true,
    isSaved: false,
    isValid: false,
    errors: new Map(),
};

const stepFormReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_ALL:
            return { ...state, ...payload };
        case SET_FIELD:
            const { name, value } = payload;
            return { ...state, [name]: value };
        case RESET:
            return { ...state };
        case CLEAR:
            return { ...state, ...lodash.cloneDeep(initStepForm) };
        default:
            return state;
    }
};

export const onUpdateStepField = (name, value, dispatch) => {
    dispatch({ type: SET_FIELD, payload: { name, value } });
};

export const onUpdateMultipleStepFields = (formData, dispatch) => {
    dispatch({ type: SET_ALL, payload: formData });
};

export const onResetStepForm = (dispatch) => {
    dispatch({ type: RESET });
};

export const onClearStepForm = (dispatch) => {
    dispatch({ type: CLEAR });
};

export default stepFormReducer;
