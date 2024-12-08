const EMAIL_PATTERN = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const RULES = {
    REQUIRED: "REQUIRED",
    NOT_EMPTY: "NOT_EMPTY",
    MIN: "MIN",
    MAX: "MAX",
    MIN_LENGTH: "MIN_LENGTH",
    MAX_LENGTH: "MAX_LENGTH",
    PATTERN: "PATTERN",
    EMAIL: "EMAIL",
    DIGITS: "DIGITS",
    EQUAL_TO: "EQUAL_TO",
    ANY_MATCH: "ANY_MATCH",
    NONE_MATCH: "NONE_MATCH",
    ALL_MATCH: "ALL_MATCH",
}

export default function ValidateUtils(formData) {
    let isValid;
    let errors;

    const defaultMessages = {
        [RULES.REQUIRED]: (fieldName) => `Required ${fieldName}`,
        [RULES.NOT_EMPTY]: (fieldName) => `${fieldName} can not be empty`,
        [RULES.MIN]: (fieldName) => `${fieldName} must be greater than or equals to {${RULES.MIN}}`,
        [RULES.MAX]: (fieldName) => `${fieldName} must be less than or equal to {${RULES.MAX}}`,
        [RULES.MIN_LENGTH]: (fieldName) => `${fieldName} must be at least {${RULES.MIN_LENGTH}} characters long`,
        [RULES.MAX_LENGTH]: (fieldName) => `${fieldName} can only contain up to {${RULES.MAX_LENGTH}} characters`,
        [RULES.PATTERN]: (fieldName) => `${fieldName} is not in the correct format`,
        [RULES.DIGITS]: (fieldName) => `${fieldName} is not a number`,
        [RULES.EMAIL]: (fieldName) => `${fieldName} is incorrect the email address format`,
        [RULES.EQUAL_TO]: (fieldName) => `${fieldName} does not match the {${RULES.EQUAL_TO}}`,
        [RULES.ANY_MATCH]: (fieldName, predicateDescription) => `${fieldName} must contain at least one item that matches ${predicateDescription}`,
        [RULES.NONE_MATCH]: (fieldName, predicateDescription) => `${fieldName} must contain no items that match ${predicateDescription}`,
        [RULES.ALL_MATCH]: (fieldName, predicateDescription) => `All items in ${fieldName} must match ${predicateDescription}`,
    }

    const ruleMethods = {
        [RULES.REQUIRED]: (fieldValue, ruleValue) => fieldValue != null && fieldValue !== undefined,
        [RULES.NOT_EMPTY]: (fieldValue, ruleValue) => {
            if (fieldValue instanceof Array) {
                return fieldValue.length > 0;
            }

            return fieldValue.trim() !== '';
        },
        [RULES.MIN]: (fieldValue, ruleValue) => fieldValue >= ruleValue,
        [RULES.MAX]: (fieldValue, ruleValue) => fieldValue <= ruleValue,
        [RULES.MIN_LENGTH]: (fieldValue, ruleValue) => fieldValue.length >= ruleValue,
        [RULES.MAX_LENGTH]: (fieldValue, ruleValue) => fieldValue.length <= ruleValue,
        [RULES.PATTERN]: (fieldValue, ruleValue) => ruleValue.test(fieldValue),
        [RULES.EMAIL]: (fieldValue, ruleValue) => EMAIL_PATTERN.test(fieldValue),
        [RULES.DIGITS]: (fieldValue, ruleValue) => typeof fieldValue === "number" && !isNaN(Number(fieldValue)),
        [RULES.EQUAL_TO]: (fieldValue, ruleValue) => fieldValue === formData[ruleValue],
        [RULES.ANY_MATCH]: (fieldValue, predicate) => {
            for (const item of fieldValue) {
                if (predicate(item)) return true;
            }

            return false;
        },
        [RULES.NONE_MATCH]: (fieldValue, predicate) => {
            for (const item of fieldValue) {
                if (predicate(item)) return false;
            }

            return true;
        },
        [RULES.ALL_MATCH]: (fieldValue, predicate) => {
            for (const item of fieldValue) {
                if (!predicate(item)) return false;
            }

            return true;
        },
    };

    const rules = {};
    const messages = {};

    function addFieldRule(fieldName, ruleName, ruleValue, message) {
        rules[fieldName] = {
            ...rules[fieldName],
            [ruleName]: ruleValue,
        }

        messages[fieldName + "_" + ruleName] = message;
    }

    function validate() {
        isValid = true;
        errors = new Map();

        for (const fieldName in rules) {
            const fieldValue = formData[fieldName];
            const fieldRules = rules[fieldName];

            for (const ruleName in fieldRules) {
                const ruleValue = fieldRules[ruleName];

                const validateResult = ruleMethods[ruleName](fieldValue, ruleValue);
                const keyMessage = fieldName + '_' + ruleName;
                const errorMessage = messages?.[keyMessage];
                const defaultMessage = defaultMessages[ruleName](fieldName).replace(`{${ruleName}}`, ruleValue);

                if (!validateResult) {
                    errors.set(fieldName, errorMessage || defaultMessage)
                    break;
                }
            }
        }

        if (errors.size > 0) {
            isValid = false;
        }

        return { isValid, errors }
    }

    return { validate, addFieldRule }
}