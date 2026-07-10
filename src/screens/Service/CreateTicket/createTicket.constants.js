export const CREATE_TICKET_FORM_DATA = {
    priority: ['low', 'medium', 'high'],
    service: ['Equipement', 'IT', 'POS'],
    service_type: ['Prevention', 'Breakdown'],
    IT: ['CCTV', "LED TV"],
    Equipement: ['Air cont', 'Freezer'],
    CCTV: ['CCTV1', 'CCTV2'],
    'LED TV': ['LED TV1', 'LED TV2'],
    Freezer: ['Freezer1', 'Freezer2'],
    'Air cont' : ['Air cont items', 'Air cont items2'],
    emptySelect: ['Master', 'Product', 'Indent', 'Transfer In', 'Billing Issue', 'Rate Issue', 'Combo Issue',]
}

export const getFormData = (value) => {
    switch(value){
        case 'Master':
        return [];
        default:
            return ['Not Working', 'No Cooling'];
    }
}