import { toast } from "react-toastify";
import { routeConstants } from "../constants/route-constants";


  export const clipToLength = (item: string, length: number) => {
    if (!item) {
      return '';
    }
    if(item.length > length) {
      const trimedItem = item.substring(0, (length - 2));
      return trimedItem + '..';
    } else {
      return item;
    }
  }
  
  export const stringifyFilter = (filter: any): string => {
    let filterString = '';
    if(!filter || (typeof(filter) !== 'object')) {
      return '';
    }
    for(const item in filter) {
      if(item && (filter[item] !== undefined) && (filter[item] !== '')) {
        filterString = filterString ? `${filterString}&` : filterString; 
        filterString += `${item}=${filter[item]}`;
      }
    }
    filterString = filterString ? `?${filterString}` : filterString; 
    return filterString;
  }

  export const copyStoreLink = (link: string) => {
    const textarea = document.createElement('textarea');
    // console.log(window.location.origin, window.location.protocol, window.location.host);
    textarea.value = `${window.location.origin}/store/${link}`;
    textarea.id = 'textId';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    toast.success('Store link copied to clipboard!');
  }

  export const formatNumber = (input: any, decimal?: number) => {
    if(isNaN(parseFloat(input))) {
      return '. .';
    }
    const number = parseFloat(input);
    return number.toLocaleString(undefined, { maximumFractionDigits: decimal || 0 });
  }

  export function calculateAge(dob: any) {
    if (dob) {
      const timeGap = new Date().getTime() - new Date(dob).getTime();
      const age = Math.floor(timeGap / (1000 * 60 * 60 * 24 * 365.25));
      if (age > 0) {
        return age;
      } else {
        return 0;
      }
    } else {
      return '';
    }
  }

export function formatDate(date: any) {
  try{
    if (date) {
      const convertedDate =  new Date(date).toDateString();
      
      if (convertedDate) {
        return convertedDate;
      } else {
        return '-';
      }
    } else {
      return '-';
    }
  } catch(e) {
    return '-';
  }
}



export function acceptOnlyNumbers(event: any) {
  event.target.value = event.target.value.replace(/[^0-9]/g, '');
  if (/[^0-9]/.test(event.key)) {
    event.preventDefault()
    return false;
  }
}
export function acceptOnlyUppercase(event: any) {
  event.target.value = event.target.value.replace(/[^A-Z]/g, '');
  if (/[^A-Z]/.test(event.key)) {
    event.preventDefault()
    return false;
  }
}
export function convertToUppercase(event: any) {
  event.target.value = event.target.value.toLocaleUpperCase();
}

export function acceptOnlyLowercase(event: any) {
  event.target.value = event.target.value.replace(/[^a-z]/g, '');
  if (/[^a-z]/.test(event.key)) {
    event.preventDefault()
    return false;
  }
}
export function convertToLowercase(event: any) {
  event.target.value = event.target.value.toLocaleLowerCase();
}

export function acceptOnlyAlphabets(event: any) {
  event.target.value = event.target.value.replace(/[^a-zA-Z]/g, '');
  if (/[^a-zA-Z]/.test(event.key)) {
    event.preventDefault()
    return false;
  }
}

export function acceptNumbersAndAlphabets(event: any) {
  event.target.value = event.target.value.replace(/[^a-zA-Z0-9]/g, '');
  if (/[^a-zA-Z0-9]/.test(event.key)) {
    event.preventDefault()
    return false;
  }
}

export function clearSpaces(event: any) {
  event.target.value = event.target.value.replace(/ /g, '');
  if (/ /.test(event.key)) {
    event.preventDefault()
    return false;
  }
}


export function numberUserMode(userRole: string) {

  let userMode: number;
  switch(userRole){
    case routeConstants.userLevels.vendor:
      userMode = 1;
      break;
    case routeConstants.userLevels.dispatcher:
      userMode = 2;
      break;
    case routeConstants.userLevels.systemAdmin:
      userMode = 3;
      break;
    default:
      userMode = 0;
      break;
  }
  return userMode;
}