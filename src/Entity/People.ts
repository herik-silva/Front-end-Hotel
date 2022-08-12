abstract class People {
    protected name: string;
    protected contactPhone: Array<string>;
    protected cpf: string;
    protected photo: string | undefined;
    
    constructor(name: string, cpf: string, contactPhone: Array<string> = [], photo: string | undefined = undefined){
        this.name = name;
        this.cpf = cpf;
        this.contactPhone = contactPhone;
        this.photo = photo;
    }

    public getName(): string {
        return this.name;
    }

    public getContactPhone(): Array<string> {
        return this.contactPhone;
    }

    public getCpf(): string {
        return this.cpf;
    }

    public getPhoto(): string | undefined {
        if(this.photo)
            return this.photo;

        return undefined;
    }

    public setPhoto(newPhoto: string) {
        this.photo = newPhoto;
    }

    public setCpf(newCpf: string): void {
        this.cpf = newCpf;
    }

    public setName(newName: string): void {
        this.name = newName;
    }

    public setContactPhone(number: string): void {
        this.contactPhone[0] = number;
    }

    public addContactPhone(newNumber: string): boolean {
        if(this.contactPhone.length<2){
            this.contactPhone.push(newNumber);
            return true;
        }

        return false;
    }

    public removeContactPhone(numberId: number): void {
        switch(numberId){
            case 1:
                this.contactPhone.shift();
                break;

            case 2:
                this.contactPhone.pop();
                break;

            default:
                throw "Id inválido!";
        }
    }
}

export default People;