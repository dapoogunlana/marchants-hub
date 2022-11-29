export interface IrequestFormat {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    url: string;
    body?: any;
    header?: any
    external?: boolean
}