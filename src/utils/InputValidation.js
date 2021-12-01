class InputValidation {
    constructor(fields, errorCatcher) {
        this.fields = fields;
        this.errorCatcher = errorCatcher;
        this.formIsValid = false
    }
    text(fieldName) {
        if (!this.fields[fieldName]) {
            this.formIsValid = false;
            this.errorCatcher[fieldName] = "Cannot be empty";
        }

        if (typeof this.fields[fieldName] !== "undefined") {
            if (!this.fields[fieldName].match(/^[a-zA-Z]+$/)) {
                this.formIsValid = false;
                this.errorCatcher[fieldName] = "Only letters";
            }
        }
    }

    getResult() {
        return {
            field: this.fields,
            error: this.errorCatcher,
            formIsValid: this.formIsValid
        }
    }
}
export default InputValidation