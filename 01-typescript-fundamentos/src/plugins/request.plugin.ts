import axios from 'axios';

export interface HttpAdapter {
    get<T>(url: string): Promise<T>;
}

export class RequestFetchPlugin implements HttpAdapter {
    get = async<T>(url: string): Promise<T> => {
        console.log('Peticion con fetch');
        
        const resp = await fetch(url);
        const data: T = await resp.json();
        return data;
    }
}

export class RequestPlugin implements HttpAdapter {

    private readonly requestHttp = axios;

    get = async <T>(url: string): Promise<T> => {
        console.log('Peticion con axios');
        const { data } = await this.requestHttp.get<T>(url);
        return data;
    }

    /* post = async (url: string, data: any) => {
        return;
    }

    pathc = async (url: string, data: any) => {
        return;
    }

    delete = async (url: string) => {
        return;
    } */
}