
import { sendRequest } from "./request";

export let coreStates = [];
export let coreLgas = [];
export let coreWards = [];
export let coreBanks = [];
export let coreOcupations = [];
export let corePillars = [];

export const getState = (callback: Function) => {
    sendRequest({
      url: '/state'
    }, (res: any)=>{
        coreStates = res.payload.rows;
        callback(res.payload.rows)
    }, (err: any)=>{
        if (err) {
            callback([])
        }
    })
}

export const getCities = (stateCode: string ,callback: Function) => {
    
    sendRequest({
        // url: 'countries/state/cities',
        url: 'https://countriesnow.space/api/v0.1/countries/state/cities',
        external: true,
        method: 'POST',
        body: {
            country: "Nigeria",
            state: stateCode
        }
    }, (res: any) => {
        coreLgas = res.data;
        callback(res.data)
    }, (err: any) => {
        if (err) {
            callback([])
        }
    })
}

export const getLgas = (id: number ,callback: Function) => {
    
    sendRequest({
        url: '/lga?state_id=' + id
    }, (res: any) => {
        coreLgas = res.payload.rows;
        callback(res.payload.rows)
    }, (err: any) => {
        if (err) {
            callback([])
        }
    })
}

export const getWards = (id: number ,callback: Function) => {
    
    sendRequest({
        url: '/ward?lga_id=' + id
    }, (res: any) => {
        coreWards = res.payload.rows;
        callback(res.payload.rows)
    }, (err: any) => {
        if (err) {
            callback([])
        }
    })
}

export const getBanks = (callback: Function) => {
    sendRequest({
      url: '/bank'
    }, (res: any)=>{
        coreBanks = res.payload.rows;
        callback(res.payload.rows)
    }, (err: any)=>{
        if (err) {
            callback([])
        }
    })
}

export const getOcupations = (callback: Function) => {
    sendRequest({
      url: '/occupation'
    }, (res: any)=>{
        coreOcupations = res.payload.rows;
        callback(res.payload.rows)
    }, (err: any)=>{
        if (err) {
            callback([])
        }
    })
}

export const getPillars = (callback: Function) => {
    sendRequest({
        url: '/pillar'
    }, (res: any) => {
        coreStates = res.payload;
        callback(res.payload)
    }, (err: any) => {
        if (err) {
            callback([])
        }
    })
}