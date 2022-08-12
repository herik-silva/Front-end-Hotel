import { FormControl } from "@angular/forms";

type ValidateTypes = "EQUALS" | "MINOR" | "LARGER";

type Validate = {
    field: FormControl,
    validateWith: ValidateTypes,
    compareTo: any
}

/**
 *  Realiza a validação dos campos passados no construtor com as comparações de
 * igualdade, maior ou menor.
 * 
 * @author Herik Apracida
 */
class ValidateInputs {
    private fieldsToValidate: Array<Validate>

    constructor(fields: Array<Validate>){
        this.fieldsToValidate = fields;
    }

    /**
     * Realiza a validação do input verificando se seu valor é igual
     * do que o valor comparado.
     * @param validate Objeto de validação contendo input, forma de validação e valor para comparar.
     * @returns True se o valor do input for igual e False caso contrário.
     */
    private equals(validate: Validate): boolean {
        if(typeof validate.field.value == "string"){
            return validate.field.value.length == validate.compareTo;
        }

        return validate.field.value == validate.compareTo;
    }

    /**
     * Realiza a validação do input verificando se seu valor é menor
     * do que o valor comparado.
     * @param validate Objeto de validação contendo input, forma de validação e valor para comparar.
     * @returns True se o valor do input for menor e False caso contrário.
     */
    private minor(validate: Validate): boolean {
        if(typeof validate.field.value == "string"){
            return validate.field.value.length < validate.compareTo;
        }

        return validate.field.value < validate.compareTo
    }

    /**
     * Realiza a validação do input verificando se seu valor é maior
     * do que o valor comparado.
     * @param validate Objeto de validação contendo input, forma de validação e valor para comparar.
     * @returns True se o valor o input for maior e False caso contrário.
     */
    private larger(validate: Validate): boolean {
        if(typeof validate.field.value == "string"){
            return validate.field.value.length > validate.compareTo;
        }

        return validate.field.value > validate.compareTo;
    }

    /**
     * Realiza a validação dos inputs.
     * @returns True caso todas as validações passem. False caso contrário.
     */
    validate(): boolean {
        if(this.fieldsToValidate.length > 0){
            const fieldToValidade = this.fieldsToValidate.shift();
            if(fieldToValidade){
                var isOk = false;
                switch(fieldToValidade.validateWith){
                    case "EQUALS":
                        isOk = this.equals(fieldToValidade);
                        break;
                    case "MINOR":
                        isOk = this.minor(fieldToValidade);
                        break;
                    case "LARGER":
                        isOk = this.larger(fieldToValidade);
                        break;
                }

                if(isOk){
                    return this.validate();
                }
            }
            return false;
        }
        else{
            return true;
        }
    }
}

export default ValidateInputs;