import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import ReserveView from 'src/Entity/ReserveView';
import Reserve from 'src/Entity/ReserveView';
import { SectionReserve } from 'src/Types/viewsType';

type ReserveRow = { reserve: Reserve, row: { class: string } };

@Component({
  selector: 'app-reserve-list',
  templateUrl: './reserve-list.component.html',
  styleUrls: ['./reserve-list.component.css']
})
@Injectable()
export class ReserveListComponent implements OnInit {
  private _filter?: string;
  private aux?: Array<any>;

  @Input() set filter(filter: string) {
    this._filter = filter;
    this.reserveListView = this.reserveList.filter(reserveRow => reserveRow.reserve.guestName.includes(filter));
  }

  @Output() reserveEmitter: EventEmitter<Reserve>;
  @Output() showInfoEmitter: EventEmitter<SectionReserve>;

  reserveList: Array<ReserveRow>;
  reserveListView: Array<ReserveRow>;
  selectedReserve?: ReserveRow;

  constructor(private http: HttpClient) {
    this.reserveList = new Array();
    this.reserveListView = this.reserveList;
    this.reserveEmitter = new EventEmitter();
    this.showInfoEmitter = new EventEmitter();
  }

  ngOnInit(): void {
    this.aux = [
      {
        "nome": "Marcos Vinicius Lucca Anthony Novaes",
        "cpf": "69733884502",
        "rg": "290568328",
        "data_nasc": "15/01/1984",
        "sexo": "Masculino",
        "cidade": "Serra",
        "celular": "27999458961",
      },
      {
        "nome": "Flávia Heloise Sarah das Neves",
        "cpf": "91634813243",
        "rg": "371454244",
        "data_nasc": "11/04/2000",
        "sexo": "Feminino",
        "cidade": "Salvador",
        "celular": "71985859998",
      },
      {
        "nome": "Rebeca Nair Andreia Sales",
        "cpf": "72227016809",
        "rg": "472083363",
        "data_nasc": "09/06/1948",
        "sexo": "Feminino",
        "cidade": "Caucaia",
        "celular": "85997192696",
      },
      {
        "nome": "Gabriela Juliana Agatha da Silva",
        "cpf": "05558806303",
        "rg": "121809729",
        "data_nasc": "03/07/1947",
        "sexo": "Feminino",
        "cidade": "Cuiabá",
        "celular": "65994651443",
      },
      {
        "nome": "Giovanni Iago José Martins",
        "cpf": "67176926344",
        "rg": "265796192",
        "data_nasc": "07/06/1946",
        "sexo": "Masculino",
        "cidade": "Chapecó",
        "celular": "49992908908",
      },
      {
        "nome": "Elza Adriana Galvão",
        "cpf": "28712438405",
        "rg": "490521885",
        "data_nasc": "23/01/1977",
        "sexo": "Feminino",
        "cidade": "São Mateus",
        "celular": "27984900043",
      },
      {
        "nome": "Lucas Pedro Henrique Duarte",
        "cpf": "98408887734",
        "rg": "373340187",
        "data_nasc": "05/03/1983",
        "sexo": "Masculino",
        "cidade": "Rio Verde",
        "celular": "64996428460",
      },
      {
        "nome": "Yago Lorenzo Samuel Silva",
        "cpf": "98692248223",
        "rg": "213335578",
        "data_nasc": "25/01/1959",
        "sexo": "Masculino",
        "cidade": "Camboriú",
        "celular": "47988477700",
      },
      {
        "nome": "Mário Manuel Cardoso",
        "cpf": "17357549275",
        "rg": "427566198",
        "data_nasc": "01/08/1998",
        "sexo": "Masculino",
        "cidade": "Tucuruí",
        "celular": "94996101301",
      },
      {
        "nome": "Enrico Kevin Gonçalves",
        "cpf": "34825568300",
        "rg": "423238425",
        "data_nasc": "10/05/1967",
        "sexo": "Masculino",
        "cidade": "Arapiraca",
        "celular": "82989305013",
      },
      {
        "nome": "Pedro Henrique Diogo Geraldo da Paz",
        "cpf": "19708573400",
        "rg": "271901615",
        "data_nasc": "24/01/1998",
        "sexo": "Masculino",
        "cidade": "São José dos Campos",
        "celular": "12986123323",
      },
      {
        "nome": "Sueli Laura Brenda Aragão",
        "cpf": "09324029339",
        "rg": "389383697",
        "data_nasc": "03/08/1991",
        "sexo": "Feminino",
        "cidade": "Goiânia",
        "celular": "62997723947",
      },
      {
        "nome": "Vanessa Emilly Lorena Caldeira",
        "cpf": "98420374520",
        "rg": "484839792",
        "data_nasc": "22/07/1994",
        "sexo": "Feminino",
        "cidade": "Palmas",
        "celular": "63991724225",
      },
      {
        "nome": "Fátima Lúcia Almada",
        "cpf": "13683985020",
        "rg": "503791180",
        "data_nasc": "21/04/1975",
        "sexo": "Feminino",
        "cidade": "Brusque",
        "celular": "47991455152",
      },
      {
        "nome": "Luiz Severino Pires",
        "cpf": "95963500214",
        "rg": "259488033",
        "data_nasc": "02/08/1996",
        "sexo": "Masculino",
        "cidade": "Teresina",
        "celular": "86995666869",
      },
      {
        "nome": "Clara Sophia Castro",
        "cpf": "14044941386",
        "rg": "340821152",
        "data_nasc": "19/07/1999",
        "sexo": "Feminino",
        "cidade": "Fortaleza",
        "celular": "85991653644",
      },
      {
        "nome": "Manuela Marina da Mata",
        "cpf": "71439058520",
        "rg": "403209547",
        "data_nasc": "01/01/1990",
        "sexo": "Feminino",
        "cidade": "Arapiraca",
        "celular": "82991739889",
      },
      {
        "nome": "Simone Giovanna Mendes",
        "cpf": "97121960702",
        "rg": "269177231",
        "data_nasc": "09/05/1944",
        "sexo": "Feminino",
        "cidade": "Suzano",
        "celular": "11993763282",
      },
      {
        "nome": "Pietro Iago Oliveira",
        "cpf": "23456382570",
        "rg": "121708895",
        "data_nasc": "15/01/1991",
        "sexo": "Masculino",
        "cidade": "Ji-Paraná",
        "celular": "69997744547",
      },
      {
        "nome": "Fábio Bernardo Monteiro",
        "cpf": "99294276783",
        "rg": "184103125",
        "data_nasc": "06/04/1985",
        "sexo": "Masculino",
        "cidade": "Águas Lindas de Goiás",
        "celular": "61995014331",
      },
      {
        "nome": "Nicole Lívia Tereza Barros",
        "cpf": "25640678089",
        "rg": "227613053",
        "data_nasc": "17/04/1958",
        "sexo": "Feminino",
        "cidade": "Xinguara",
        "celular": "94995221565",
      },
      {
        "nome": "Giovanna Liz da Mota",
        "cpf": "02736348362",
        "rg": "458051287",
        "data_nasc": "19/04/1948",
        "sexo": "Feminino",
        "cidade": "Blumenau",
        "celular": "47993088594",
      },
      {
        "nome": "Rosângela Emanuelly Costa",
        "cpf": "56295082378",
        "rg": "329295536",
        "data_nasc": "08/04/2001",
        "sexo": "Feminino",
        "cidade": "Rio de Janeiro",
        "celular": "21986895757",
      },
      {
        "nome": "Lívia Bárbara Aparecida Carvalho",
        "cpf": "82263014837",
        "rg": "448771123",
        "data_nasc": "24/05/1959",
        "sexo": "Feminino",
        "cidade": "Serra",
        "celular": "27991521090",
      },
      {
        "nome": "Kevin Theo Rafael Peixoto",
        "cpf": "02073594158",
        "rg": "401433079",
        "data_nasc": "18/02/1943",
        "sexo": "Masculino",
        "cidade": "Cuiabá",
        "celular": "65989611336",
      },
      {
        "nome": "Vinicius Arthur Geraldo Fogaça",
        "cpf": "73650325373",
        "rg": "213304715",
        "data_nasc": "07/01/1950",
        "sexo": "Masculino",
        "cidade": "Belém",
        "celular": "91996892582",
      },
      {
        "nome": "Nina Sophie Assis",
        "cpf": "57005339878",
        "rg": "377502248",
        "data_nasc": "17/02/1965",
        "sexo": "Feminino",
        "cidade": "Ponta Porã",
        "celular": "67997543974",
      },
      {
        "nome": "Oliver Murilo Lima",
        "cpf": "55068774391",
        "rg": "377799695",
        "data_nasc": "08/07/1955",
        "sexo": "Masculino",
        "cidade": "Macapá",
        "celular": "96991664670",
      },
      {
        "nome": "Theo Noah Barbosa",
        "cpf": "86772985923",
        "rg": "368168852",
        "data_nasc": "04/08/1969",
        "sexo": "Masculino",
        "cidade": "Recife",
        "celular": "81989187139",
      },
      {
        "nome": "Yago César Renan Jesus",
        "cpf": "43088809040",
        "rg": "184073029",
        "data_nasc": "14/06/1962",
        "sexo": "Masculino",
        "cidade": "Blumenau",
        "celular": "47998992980",
      }
    ];
    this.getReserves();
  }

  private emitSelectedReserve(reserveToEmit: Reserve) {
    this.reserveEmitter.emit(reserveToEmit);
  }

  select(index: number) {
    if(this.selectedReserve){
      this.selectedReserve.row.class = "";
    }

    this.selectedReserve = this.reserveListView[index];
    this.selectedReserve.row.class = "selected";
    this.emitSelectedReserve(this.selectedReserve.reserve);
  }

  getValidString(value: string | Date | undefined): string {
    if(value){
      if(typeof value == "string"){
        return value.length > 0 ? value : "-";
      }
  
      return value ? value.toDateString() : "-";
    }

    return "-";
  }

  getReserves(): void {
    const url = "api/reserve/all";
    const obsRequest = this.http.get<ReserveView | Array<ReserveView>>(url);
    console.log("Requisição feita");
    obsRequest.subscribe({
      next: data => {
        console.log(data);
        if(data instanceof Array<ReserveView>){
          for(let reserveView of data){
            this.reserveList.push({reserve: reserveView, row: {class: ""}});
          }

          this.reserveList.sort((a, b) => {
            if(a.reserve.roomNumber > b.reserve.roomNumber){
              return 1;
            }
            else if(a.reserve.roomNumber < b.reserve.roomNumber){
              return -1;
            }
            else{
              return 0;
            }
          });

          this.reserveListView = this.reserveList;
        }
      }
    })
  }

  showInformations(): void {
    this.showInfoEmitter.emit("INFORMATION");
  }
}
