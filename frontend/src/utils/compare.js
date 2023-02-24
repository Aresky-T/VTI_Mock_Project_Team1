export const compareString = (key, order = 'asc') => {
    return function (a, b) {

        /**
         * hasOwnProperty trong JavaScript là một phương thức trong object Object, 
         * có tác dụng kiểm tra 1 một thuộc tính có tồn tại trong Object hay không. 
         * Nếu thuộc tính chỉ định tồn tại trong object chỉ định, true được trả về. Nếu không tồn tại, giá trị false được trả về.
         */

        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
        }

        const varA = (typeof a[key] === 'string') ?
            a[key].toUpperCase() : a[key];

        const varB = (typeof b[key] === 'string') ?
            a[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * - 1) : comparison
        );
    }
}


export const compareDate = (key, order = 'asc') => {
    return function (a, b) {

        /**
         * hasOwnProperty trong JavaScript là một phương thức trong object Object, 
         * có tác dụng kiểm tra 1 một thuộc tính có tồn tại trong Object hay không. 
         * Nếu thuộc tính chỉ định tồn tại trong object chỉ định, true được trả về. Nếu không tồn tại, giá trị false được trả về.
         */

        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
        }

        const varA = (typeof a[key] === 'string') ?
            new Date(a[key]).getTime() : a[key];

        const varB = (typeof b[key] === 'string') ?
            new Date(b[key]).getTime() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    }
}