const ValidationRules = {
    REQUIRED: "REQUIRED",
    NOT_EMPTY: "NOT_EMPTY",
    MIN: "MIN",
    MAX: "MAX",
    MIN_LENGTH: "MIN_LENGTH",
    MAX_LENGTH: "MAX_LENGTH",
    PATTERN: "PATTERN",
    EMAIL: "EMAIL",
    IMAGE_FILE: "IMAGE_FILE",
    DIGITS: "DIGITS",
    GREATER_THAN: "GREATER_THAN",
    LESS_THAN: "LESS_THAN",
    EQUAL_TO: "EQUAL_TO",
    MATCH: "MATCH",
    ANY_MATCH: "ANY_MATCH",
    NONE_MATCH: "NONE_MATCH",
    ALL_MATCH: "ALL_MATCH",
};


const defaultMessages = {
    [ValidationRules.REQUIRED]: (fieldName) => `${fieldName} is required`,
    [ValidationRules.NOT_EMPTY]: (fieldName) => `${fieldName} cannot be empty`,
    [ValidationRules.MIN]: (fieldName, ruleValue) => `${fieldName} must be greater than or equal to ${ruleValue}`,
    [ValidationRules.MAX]: (fieldName, ruleValue) => `${fieldName} must be less than or equal to ${ruleValue}`,
    [ValidationRules.MIN_LENGTH]: (fieldName, ruleValue) => `${fieldName} must be at least ${ruleValue} characters`,
    [ValidationRules.MAX_LENGTH]: (fieldName, ruleValue) => `${fieldName} can only contain up to ${ruleValue} characters`,
    [ValidationRules.PATTERN]: (fieldName) => `${fieldName} is not in the correct format`,
    [ValidationRules.EMAIL]: (fieldName) => `${fieldName} is in an incorrect email format`,
    [ValidationRules.IMAGE_FILE]: (fieldName) => `${fieldName} is not a image file`,
    [ValidationRules.DIGITS]: (fieldName) => `${fieldName} must be a valid number`,
    [ValidationRules.GREATER_THAN]: (fieldName, ruleValue) => `${fieldName} must be greater than ${ruleValue}`,
    [ValidationRules.LESS_THAN]: (fieldName, ruleValue) => `${fieldName} must be less than ${ruleValue}`,
    [ValidationRules.EQUAL_TO]: (fieldName, ruleValue) => `${fieldName} must be equal to ${ruleValue}`,
    [ValidationRules.MATCH]: (fieldName) => `${fieldName} does not match the specified field`,
    [ValidationRules.ANY_MATCH]: (fieldName, predicateDescription) => `${fieldName} must contain at least one item that matches: ${predicateDescription}`,
    [ValidationRules.NONE_MATCH]: (fieldName, predicateDescription) => `${fieldName} must contain no items that match: ${predicateDescription}`,
    [ValidationRules.ALL_MATCH]: (fieldName, predicateDescription) => `All items in ${fieldName} must match: ${predicateDescription}`,
};

export default class ValidateUtils {
    #formData;
    #results;

    constructor(formData) {
        this.#formData = formData;
        this.#results = {};
    }

    #updateResults(fieldName, ruleName, ruleValue, isValid, errorMessage, predicateMessage) {
        if (!this.#results[fieldName]) {
            this.#results[fieldName] = { isValid: true, errors: {} };
        }

        if (!isValid) {
            const defaultMessage = defaultMessages[ruleName](fieldName, predicateMessage || ruleValue);
            this.#results[fieldName].isValid = false;
            this.#results[fieldName].errors[ruleName] = errorMessage || defaultMessage;
        }
    }

    #validateField(fieldName, ruleName, ruleValue, validationFn, errorMessage, predicateMessage) {
        const fieldValue = this.#formData[fieldName];
        const isValid = validationFn(fieldValue, ruleValue);
        this.#updateResults(fieldName, ruleName, ruleValue, isValid, errorMessage, predicateMessage);
    }

    required(fieldName, errorMessage) {
        this.#validateField(fieldName, ValidationRules.REQUIRED, null, (value) => value != null, errorMessage);
    }

    notEmpty(fieldName, errorMessage) {
        this.#validateField(fieldName, ValidationRules.NOT_EMPTY, null, (value) => value && value.trim() !== '', errorMessage);
    }

    min(fieldName, minValue, errorMessage) {
        this.#validateField(fieldName, ValidationRules.MIN, minValue, (value) => value >= minValue, errorMessage);
    }

    max(fieldName, maxValue, errorMessage) {
        this.#validateField(fieldName, ValidationRules.MAX, maxValue, (value) => value <= maxValue, errorMessage);
    }

    minLength(fieldName, minLength, errorMessage) {
        this.#validateField(fieldName, ValidationRules.MIN_LENGTH, minLength, (value) => value && value.length >= minLength, errorMessage);
    }

    maxLength(fieldName, maxLength, errorMessage) {
        this.#validateField(fieldName, ValidationRules.MAX_LENGTH, maxLength, (value) => value && value.length <= maxLength, errorMessage);
    }

    pattern(fieldName, pattern, errorMessage) {
        this.#validateField(fieldName, ValidationRules.PATTERN, null, (value) => pattern.test(value), errorMessage);
    }

    email(fieldName, errorMessage) {
        const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        this.#validateField(fieldName, ValidationRules.EMAIL, null, (value) => emailPattern.test(value), errorMessage);
    }

    imageFile(fieldName, errorMessage) {
        this.#validateField(fieldName, ValidationRules.IMAGE_FILE, null, (value) => {
            const allowedExtensions = /(.+)(?=\.(jpg|jpeg|png|gif|webp)$)/i;
            const fileType = value instanceof File ? value.name : "";
            return fileType && allowedExtensions.test(fileType);
        }, errorMessage)
    }

    digits(fieldName, errorMessage) {
        this.#validateField(fieldName, ValidationRules.DIGITS, null, (value) => typeof value === "number" && !isNaN(Number(value)), errorMessage);
    }

    greaterThan(fieldName, targetValue, errorMessage) {
        this.#validateField(fieldName, ValidationRules.GREATER_THAN, null, (value) => value > targetValue, errorMessage);
    }

    lessThan(fieldName, targetValue, errorMessage) {
        this.#validateField(fieldName, ValidationRules.LESS_THAN, null, (value) => value < targetValue, errorMessage);
    }

    equalTo(fieldName, targetValue, errorMessage) {
        this.#validateField(fieldName, ValidationRules.EQUAL_TO, null, (value) => value === targetValue, errorMessage);
    }

    matchWithField(fieldName, targetField, errorMessage) {
        this.#validateField(fieldName, ValidationRules.MATCH, null, (value) => value === this.#formData[targetField], errorMessage);
    }

    anyMatch(fieldName, predicate, errorMessage, predicateMessage) {
        this.#validateField(fieldName, ValidationRules.ANY_MATCH, null, (value) => value.some(predicate), errorMessage, predicateMessage);
    }

    noneMatch(fieldName, predicate, errorMessage, predicateMessage) {
        this.#validateField(fieldName, ValidationRules.NONE_MATCH, null, (value) => value.every(item => !predicate(item)), errorMessage, predicateMessage);
    }

    allMatch(fieldName, predicate, errorMessage, predicateMessage) {
        this.#validateField(fieldName, ValidationRules.ALL_MATCH, null, (value) => value.every(predicate), errorMessage, predicateMessage);
    }

    validate() {
        const errors = new Map();

        for (const [fieldName, validateResult] of Object.entries(this.#results)) {
            if (!validateResult.isValid) {
                errors.set(fieldName, validateResult.errors);
            }
        }

        return {
            isValid: errors.size === 0,
            errors,
        };
    }
}