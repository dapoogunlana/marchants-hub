import { dummyFacilitatorData } from "../constants/dashboard-dummy-constants";
import { stringifyFilter } from "./data-manipulation-utilits";
import { sendRequest } from "./request";
import { swal } from './swal-utils';
import { toast } from 'react-toastify';

export let filters: any = {};

export const updateFilters = (filter: any) => {
    filters = { ...filter };
};

export const getFacilitators = (query: string, callback: Function) => {
    const param = {
        ...filters,
    }
    if (query){
        param[query] = true;
    }
    sendRequest({
        url: '/facilitator' + stringifyFilter(param)
    }, (res: any)=>{
        if (res.responseCode === 1 && res.payload.rows.length !== 0) {
            callback(res.payload.rows);
            return;
        }
        callback(dummyFacilitatorData.data)
    }, (err: any)=>{
        if (err) {
            callback(dummyFacilitatorData.data)
        }
    })
}

export const getFacilitator = (id: any, callback: Function) => {
    const param = {
        ...filters,
    }
    sendRequest({
        url: '/facilitator/' + id + stringifyFilter(param)
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

export const acceptFacilitator = (id: Number, callBack: Function) => {
    swal.fire({
        title: 'Accept Facilitator',
        text: "Are you sure you wish to accept this facilitator?",
        icon: 'success',
    }).then((result: any) => {
        if (result.isConfirmed) {
            sendRequest({
                url: 'facilitator/accept-reject',
                method:'PUT',
                body: {
                    id, 
                    status: "accept"
                },
            }, (res: any) => {
                if(res.responseCode === 1) {
                    toast.success(res.responseText);
                    callBack(res.payload.count);
                    return;
                }
                toast.error(res.responseText);
            }, (err: any) => {
                toast.error(err.error?.emailError || err.message || 'Unable to complete');
            });
        }
    })
} 

export const rejectFacilitator = (id: Number, callBack: Function) => {
    swal.fire({
        title: 'Reject Facilitator',
        text: "Are you sure you wish to reject this facilitator?",
        icon: 'error',
    }).then((result: any) => {
        if (result.isConfirmed) {
            sendRequest({
                url: 'facilitator/accept-reject',
                method:'PUT',
                body: {
                    id, 
                    status: "reject"
                },
            }, (res: any) => {
                if(res.responseCode === 1) {
                    toast.success(res.responseText);
                    callBack(res.payload.count);
                    return;
                }
                toast.error(res.responseText);
            }, (err: any) => {
                toast.error(err.error?.emailError || err.message || 'Unable to complete');
            });
        }
    })
}