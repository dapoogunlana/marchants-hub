export interface IloginData {
    token: number,
    firstname: string,
    lastname: string,
    userLevel: string,
}

export interface IroutObjectData {
    label?: string,
    routes: {
        name: string,
        link: string,
        icon?: string,
    }[],
}

