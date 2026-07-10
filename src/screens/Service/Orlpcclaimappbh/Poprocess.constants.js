export const CREATE_TICKET_FORM_DATA = {
  priority: ['low', 'medium', 'high'],
  serviceFor: ['Equipement', 'IT', 'POS'],
  emptySelect: ['Master', 'Product', 'Indent', 'Transfer In', 'Billing Issue', 'Rate Issue', 'Combo Issue',]
}

export const ticketHandlingDropDownData = (val) => {
  switch (val) {
    case 'vendorType':
      return ['External', 'Internal']
    case 'selectWorkDone':
      return ['Service with spare', 'Service without spare']
    case 'employeeName':
      return ['karthick', 'kumar']
    case 'karthick':
      return '5453454353'
    case 'kumar':
      return '5453454353'
    case 'selectSpare':
      return ['compressor', 'Fan motor']
    case 'costInvolved':
      return ['yes', 'no']
    case 'paymentMode':
      return ['Petty cash', 'Online']
    case 'quotation':       
    case 'advance': 
    return ['yes', 'no'];
    default:
      return []
  }
}