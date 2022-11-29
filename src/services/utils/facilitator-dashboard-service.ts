import { useSelector } from "react-redux";
import { barchartData, pieAgeData, pieGenderData, userData } from "../constants/dashboard-dummy-constants";
import { stringifyFilter } from "./data-manipulation-utilits";
import { sendRequest } from "./request";

export let filters: any = {};

export const updateFilters = (filter: any) => {
    filters = {...filter};
};

export const getAppliedCount = (callBack: Function) => {
    const param = {
        ...filters,
        all_applied:true
    }
    sendRequest({
        url: 'facilitator/count' + stringifyFilter(param),
    }, (res: any) => {
        if(res.responseCode === 1) {
            callBack(res.payload.count);
            return;
        }
        callBack();
    }, (err: any) => {
        callBack();
    });
};
export const getEvaluatedCount = (callBack: Function) => {
    const param = {
        all_evaluated: true,
        ...filters,
    }
    sendRequest({
        url: 'facilitator/count' + stringifyFilter(param),
    }, (res: any) => {
        if(res.responseCode === 1) {
            callBack(res.payload.count);
            return;
        }
        callBack();
    }, (err: any) => {
        callBack();
    });
};
export const getConfirmedCount = (callBack: Function) => {
    const param = {
        ...filters,
        all_confirmed: true
    }
    sendRequest({
        url: 'facilitator/count' + stringifyFilter(param),
    }, (res: any) => {
        if(res.responseCode === 1) {
            callBack(res.payload.count);
            return;
        }
        callBack();
    }, (err: any) => {
        callBack();
    });
};
export const getActiveCount = (callBack: Function) => {
    const param = {
        ...filters,
        active: true
    }
    sendRequest({
        url: 'facilitator/count' + stringifyFilter(param),
    }, (res: any) => {
        if(res.responseCode === 1) {
            callBack(res.payload.count);
            return;
        }
        callBack();
    }, (err: any) => {
        callBack();
    });
};

export const getPillarBreakdown = (callBack: Function, query?: string) => {
    let param = {
        ...filters,
    }
    if (query) {
        param[query]=true
    }
    sendRequest({
        url: 'facilitator/get-count-facilitator-by-pillar' + stringifyFilter(param),
    }, (res: any) => {
        if (res.responseCode === 1 && res.payload.length !== 0) {
            let data: any = []
            let results: any = res.payload;
            results.map((result: any) => {
                const newData = { 'x' : result?.pillar?.name || result['applied_facilitator_pillar.pillar.name'] || result['facilitator_pillar.pillar.name'], 'y': Number(result?.count) }
                if (Number(result?.count) !== 0) {
                    data.push(newData);
                }
            })
            callBack(data);
            return;
        }
        callBack([]);
    }, (err: any) => {
        callBack([]);
    });
};

export const getStateBreakdown = (callBack: Function, query?: string) => {
    let param = {
        ...filters,
    }
    if (query) {
        param[query] = true
    }
    sendRequest({
        url: 'facilitator/get-count-facilitator-by-state' + stringifyFilter(param),
    }, (res: any) => {
        if (res.responseCode === 1 && res.payload.length !== 0) {
            let data: any = []
            let results: any = res.payload;
            results.map((result: any) => {
                const newData = { 'x': result?.state?.name || result['state.name'], 'y': Number(result?.count) }
                if (Number(result?.count) !== 0) {
                    data.push(newData);
                }
            })
            callBack(data);
            return;
        }
        callBack([]);
    }, (err: any) => {
        callBack([]);
    });
};

export const getLgaBreakdown = (callBack: Function, query?: string) => {
    let param = {
        ...filters,
    }
    if (query) {
        param[query] = true
    }
    sendRequest({
        url: 'facilitator/get-count-facilitator-by-lga' + stringifyFilter(param),
    }, (res: any) => {
        if (res.responseCode === 1 && res.payload.length !== 0) {
            let data: any = []
            let results: any = res.payload;
            results.map((result: any) => {
                const newData = { 'x': result?.lga?.name || result['lga.name'], 'y': Number(result?.count) }
                if (Number(result?.count) !== 0) {
                    data.push(newData);
                }
            })
            callBack(data);
            return;
        }
        callBack([]);
    }, (err: any) => {
        callBack([]);
    });
};

export const getGenderBreakdown = (callBack: Function, query?: string) => {
    let param = {
        ...filters,
    }
    if (query) {
        param[query] = true
    }
    sendRequest({
        url: 'facilitator/get-count-facilitator-by-gender' + stringifyFilter(param),
    }, (res: any) => {
        if (res.responseCode === 1 && res.payload.length !== 0) {
            let data: any = []
            let results: any = res.payload;
            results.map((result: any) => {
                const newData = { 'x': result?.gender, 'y': Number(result?.count) }
                if (Number(result?.count) !== 0) {
                    data.push(newData);
                }
            })
            callBack(data);
            return;
        }
        callBack([]);
    }, (err: any) => {
        callBack([]);
    });
};

export const getAgeBreakdown = (callBack: Function, query?: string) => {
    let param = {
        ...filters,
    }
    if (query) {
        param[query] = true
    }
    sendRequest({
        url: 'facilitator/get-count-facilitator-by-age' + stringifyFilter(param),
    }, (res: any) => {
        if (res.responseCode === 1 && res.payload.length !== 0) {
            let data: any = []
            let results: any = res.payload;
            results.map((result: any) => {
                const newData = { 'x': result?.category, 'y': Number(result?.count) }
                if (Number(result?.count) !== 0) {
                    data.push(newData);
                }
            })
            callBack(data);
            return;
        }
        callBack([]);
    }, (err: any) => {
        callBack([]);
    });
};

export const getEducationalLevelBreakdown = (callBack: Function, query?: string) => {
    let param = {
        ...filters,
    }
    if (query) {
        param[query] = true
    }
    sendRequest({
        url: 'facilitator/get-count-facilitator-by-education' + stringifyFilter(param),
    }, (res: any) => {
        if (res.responseCode === 1 && res.payload.length !== 0) {
            let data: any = []
            let results: any = res.payload;
            results.map((result: any) => {
                let name = result?.education?.name
                if (result.education === null) {
                    name = 'Others'
                }
                const newData = { 'x': name || result['education.name'], 'y': Number(result?.count) }
                if (Number(result?.count) !== 0) {
                    data.push(newData);
                }
            })
            callBack(data);
            return;
        }
        callBack([]);
    }, (err: any) => {
        callBack([]);
    });
};

export const getStateCoverageTable = (callBack: Function) => {
    const param = {
        ...filters,
    }
    sendRequest({
        url: 'facilitatorssss' + stringifyFilter(param),
    }, (res: any) => {
        if (res.responseCode === 1 && res.payload.rows.length !== 0) {
            callBack(res.payload.rows);
            return;
        }
        callBack([]);
    }, (err: any) => {
        callBack([]);
    });
};