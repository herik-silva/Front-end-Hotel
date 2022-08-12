/**
 * Esta classe tem como objetivo facilitar a manipulação
 * das telas(sections) por meio de navegação empilhada.
 * @Author Herik Aparecida
 */
class PileSection<T> {
    private pile: Array<T>;
    private sectionDefault: T;

    constructor(sectionDefault: T) {
        this.pile = new Array();
        this.sectionDefault = sectionDefault;
    }

    /**
     * Insere uma seção na pilha
     * @param newSection nova seção exibida
     */
    insert(newSection: T): void {
        this.pile.push(newSection);
    }

    /**
     * Remove a seção no topo da pilha e retorna nova que está no topo.
     * Caso a pilha esteja vazia, retorna a seção padrão.
     */
    nextSection(): T {
        var lastPos: number;
        
        if(this.pile.length > 0){
            this.pile.pop();
        }

        lastPos = this.pile.length - 1;

        return this.pile[lastPos] ? this.pile[lastPos] : this.sectionDefault;
    }

    checkIsOpen(sectionToCheck: T): boolean {
        return this.pile.find(section => section == sectionToCheck) ? true : false;
    }
}

export default PileSection;