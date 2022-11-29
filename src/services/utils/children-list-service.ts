import { dummyFacilitatorData } from "../constants/dashboard-dummy-constants";
import { stringifyFilter } from "./data-manipulation-utilits";
import { sendRequest } from "./request";
import { swal } from './swal-utils';
import { toast } from 'react-toastify';

export let filters: any = {};

export const updateFilters = (filter: any) => {
    filters = { ...filter };
};

export const getChild = (id: any, callback: Function) => {
    const param = {
        ...filters,
    }
    sendRequest({
        url: '/children/' + id + stringifyFilter(param)
    }, (res: any) => {
        if (res.responseCode === 1 && res.payload) {
            callback(res.payload);
        }
        // callback(dummyFacilitatorData.data)
    }, (err: any) => {
        if (err) {
            console.log(err)
            // callback(dummyFacilitatorData.data)
        }
    })
}

export const getChildren = (query: string, callback: Function) => {
    const param = {
        ...filters,
    }
    if (query && query !== 'registered') {
        param[query] = true;
    }
    sendRequest({
        url: '/children' + stringifyFilter(param)
    }, (res: any) => {
        if (res.responseCode === 1 && res.payload.rows.length !== 0) {
            callback(res.payload.rows);
            return;
        }
        callback(dummyFacilitatorData.data)
    }, (err: any) => {
        if (err) {
            callback(dummyFacilitatorData.data)
        }
    })
}

export const getChildEvent = (id:any, callback: Function) => {
    const param = {
        ...filters,
    }
    if (id) {
        param.child_id = id;
    }
    sendRequest({
        url: '/result' + stringifyFilter(param)
    }, (res: any) => {
        if (res.responseCode === 1 && res.payload.rows.length !== 0) {
            callback(res.payload.rows);
            return;
        }
        callback(dummyFacilitatorData.data)
    }, (err: any) => {
        if (err) {
            callback(dummyFacilitatorData.data)
        }
    })
}