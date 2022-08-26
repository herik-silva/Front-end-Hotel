abstract class Formater {

    static removeSpecialChars(string: string, specialChar: Array<string>): string {
        var index = 0;

        while(specialChar[index]){
            if(string.includes(specialChar[index])){
                string = string.replace(specialChar[index], "");
            }
            else{
                index++;
            }
        }

        return string;
    }
    
    static formatContactPhone(number: string): string {
        const specialChar = ["(",")","-"," "];
        var formatedString = this.removeSpecialChars(number, specialChar);

        if(formatedString.length == 10){
            formatedString = number.replace(/^(\d{2})(\d)/g,"($1) $2").replace(/(\d)(\d{4})$/,"$1-$2");
        }
        
        return formatedString;
    }

    static formatCPF(cpf: string): string {
        const specialChar = [".", "-"];
        var formatedString = this.removeSpecialChars(cpf, specialChar);

        if(formatedString.length == 11){
            formatedString = cpf.replace(/(\d{3})?(\d{3})?(\d{3})?(\d{2})/, "$1.$2.$3-$4");
        }

        return formatedString;
    }
}

export default Formater;