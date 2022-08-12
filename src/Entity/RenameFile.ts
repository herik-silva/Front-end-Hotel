abstract class RenameFile {
    public static genRandomName() {
        const max=1024, min=0;
        var randomName = "";
        
        while(randomName.length < 64){
            const randomNumber = (Math.random() * (max-min) + min).toFixed(0);
            randomName += randomNumber.toString();
        }
        
        return randomName;
    }

    public static renameFile(file: File) {
        console.log(file.name);
        const extensionName = file.name.split(".").pop();
        const newFileName = this.genRandomName();
        return `${newFileName}.${extensionName}`;
    }
}

export default RenameFile;