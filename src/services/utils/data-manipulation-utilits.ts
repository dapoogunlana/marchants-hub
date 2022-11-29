

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