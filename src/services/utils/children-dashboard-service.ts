import { useSelector } from "react-redux";
import { barchartData, pieAgeData, pieGenderData, userData } from "../constants/dashboard-dummy-constants";
import { stringifyFilter } from "./data-manipulation-utilits";
import { sendRequest } from "./request";

export let filters: any = {};

export const updateFilters = (filter: any) => {
    filters = {...filter};
};

export const getRegisteredCount = (callBack: Function) => {
    const param = {
        ...filters,
    }
    sendRequest({
        url: 'children/count' + stringifyFilter(param),
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
export const getOnTrackCount = (callBack: Function) => {
    const param = {
        on_track: true,
        ...filters,
    }
    sendRequest({
        url: 'children/count' + stringifyFilter(param),
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
export const getPercentageOnTrackCount = (callBack: Function) => {
    const param = {
        ...filters,
    }
    sendRequest({
        url: 'children/count' + stringifyFilter(param),
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
        active:true
    }
    sendRequest({
        url: 'children/count' + stringifyFilter(param),
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

export const getPillarBreakdown = (callBack: Function) => {
    const param = {
        ...filters,
    }
    sendRequest({
        url: 'children/get-count-children-by-pillar' + stringifyFilter(param),
    }, (res: any) => {
        if (res.responseCode === 1 && res.payload.length !== 0) {
            let data: any = []
            let results: any = res.payload;
            results.map((result: any) => {
                const newData = { 'x': result?.name, 'y': Number(result?.count) }
                if (Number(result?.count) !== 0) {
                    if (Number(result?.count) !== 0) {
                    data.push(newData);
                }
                }
            })
            callBack(data);
            return;
        }
        callBack(barchartData);
    }, (err: any) => {
        callBack(barchartData);
    });
};

export const getStateBreakdown = (callBack: Function) => {
    const param = {
        ...filters,
    }
    sendRequest({
        url: 'children/get-count-children-by-state' + stringifyFilter(param),
    }, (res: any) => {
        if (res.responseCode === 1 && res.payload.length !== 0) {
            let data: any = []
            let results: any = res.payload;
            results.map((result: any) => {
                const newData = { 'x': result?.state?.name, 'y': Number(result?.count) }
                if (Number(result?.count) !== 0) {
                    data.push(newData);
                }
            })
            callBack(data);
            return;
        }
        callBack(barchartData);
    }, (err: any) => {
        callBack(barchartData);
    });
};

export const getLgaBreakdown = (callBack: Function) => {
    const param = {
        ...filters,
    }
    sendRequest({
        url: 'children/get-count-children-by-lga' + stringifyFilter(param),
    }, (res: any) => {
        if (res.responseCode === 1 && res.payload.length !== 0) {
            let data: any = []
            let results: any = res.payload;
            results.map((result: any) => {
                const newData = { 'x': result?.lga?.name, 'y': Number(result?.count) }
                if (Number(result?.count) !== 0) {
                    data.push(newData);
                }
            })
            callBack(data);
            return;
        }
        callBack(barchartData);
    }, (err: any) => {
        callBack(barchartData);
    });
};

export const getGenderBreakdown = (callBack: Function) => {
    const param = {
        ...filters,
    }
    sendRequest({
        url: 'children/get-count-children-by-gender' + stringifyFilter(param),
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
        callBack(pieGenderData);
    }, (err: any) => {
        callBack(pieGenderData);
    });
};

export const getAgeBreakdown = (callBack: Function) => {
    const param = {
        ...filters,
    }
    sendRequest({
        url: 'children//get-count-children-by-age' + stringifyFilter(param),
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
        callBack(pieAgeData);
    }, (err: any) => {
        callBack(pieAgeData);
    });
};

export const getStateCoverageTable = (callBack: Function) => {
    const param = {
        ...filters,
    }
    sendRequest({
        url: 'childrensss' + stringifyFilter(param),
    }, (res: any) => {
        if (res.responseCode === 1 && res.payload.rows.length !== 0) {
            callBack(res.payload.rows);
            return;
        }
        callBack(userData);
    }, (err: any) => {
        callBack(userData);
    });
};