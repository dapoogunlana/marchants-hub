
export let userImage = null;

export const assignUserImage = (image: any) => {
    userImage = image;
}

export const prepareFacilitatorRegForm = (form: any) => {
    const pillarIds = form.biodata?.pillar?.map((item: any) => item.value) || [];
    const registerForm = {
        first_name: form.biodata?.firstName, 
        middle_name: form.biodata?.middleName, 
        last_name: form.biodata?.lastName, 
        email: form.biodata?.email,
        gender: form.biodata?.gender, 
        dob: form.biodata?.dob.split('T')[0], 
        phone_number: form.biodata?.bvn_phone, 
        contact_phone_number: form.biodata?.contact_phone,
        occupation_id: form.biodata?.current_oucupation ? parseFloat(form.biodata?.current_oucupation) : undefined, 
        pillars: pillarIds, 
        state_id: form.locationData?.state ? parseFloat(form.locationData?.state) : undefined, 
        lga_id: form.locationData?.lga ? parseFloat(form.locationData?.lga) : undefined,
        ward_id: form.locationData?.ward ? parseFloat(form.locationData?.ward) : undefined, 
        home_address: form.locationData ? sortAddress(form.locationData) : '', 
        gps: form.biodata?.location, 
        bank_id: form.financialInformation?.bank ? parseFloat(form.financialInformation?.bank) : undefined,
        account_number: form.financialInformation?.account, 
        picture_url: form.guarantorDetails?.image, 
        highest_education_level: form.biodata?.highest_educational_level ? parseFloat(form.biodata?.highest_educational_level) : undefined, 
        no_of_dependant: form.biodata?.number_of_depandents ? parseFloat(form.biodata?.number_of_depandents) : undefined,
        otp: form.otp?.otp,
        guarantors_highest_educational_level: 
            form.guarantorDetails?.guarantors_highest_educational_level ?
            parseFloat(form.guarantorDetails?.guarantors_highest_educational_level) : undefined,
        guarantors_name: form.guarantorDetails?.guarantors_name,
        guarantors_occupation_id: form.guarantorDetails?.guarantors_occupation ? parseFloat(form.guarantorDetails?.guarantors_occupation): undefined,
        guarantors_office_address: form.guarantorDetails?.guarantors_office_address,
        guarantors_phone_number: form.guarantorDetails?.guarantors_phone_number,
        guarantors_relationship: form.guarantorDetails?.guarantors_relationship ? parseFloat(form.guarantorDetails?.guarantors_relationship) : undefined,
        number_of_depandents: form.guarantorDetails?.number_of_depandents ? parseFloat(form.guarantorDetails?.number_of_depandents) : undefined,
    }
    return registerForm;
}

const sortAddress = (data: any) => {
    const house = data.houseNo ? (data.houseNo + ', ') : '' ;
    const street = data.streetName ? (data.streetName + ', ') : '' ;
    return house + street + (data.city || '');
}