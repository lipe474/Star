

export interface CityType {
    id: string;
    nome: string;
    microrregiao: microrregiao;
    regiaoImediata: regiaoIntermediaria;

}

type microrregiao = {
    id: string;
    nome: string;
    regiaoIntermediaria: regiaoIntermediaria;
}
type regiaoImediata = {
    id: string;
    nome: string;
    regiaoIntermediaria: regiaoIntermediaria;
}
type regiaoIntermediaria = {
    id: string;
    nome: string;
    UF: UF;
}

type UF = {
    id: string;
    sigla: string;
    nome: string;
    regiao: RG;
}

type RG = {
    id: string;
    sigla: string;
    nome: string;
}





