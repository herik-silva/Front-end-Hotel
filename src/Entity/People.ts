abstract class People {
    protected name: string;
    protected contactPhone: string;
    protected cpf: string;
    protected photo: string | undefined;
    
    constructor(name: string, cpf: string, contactPhone: string = "", photo: string | undefined = undefined){
        this.name = name;
        this.cpf = cpf;
        this.contactPhone = contactPhone;
        this.photo = photo;
    }

    public getName(): string {
        return this.name;
    }

    public getContactPhone(): string {
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
        this.contactPhone = number;
    }
}

export default People;