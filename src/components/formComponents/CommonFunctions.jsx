export function colorName(params) {
  if (params == 'Active') {
    return `${'#52c41a'}`;
  }
  else if (params == 'Renewal Rejected' || params == 'Rejected') {
    return `${'#f71111'}`;
  }
  else if (params == 'Inactive') {
    return `${'#f54266'}`;
  }
  else if (params == 'New License Waiting for Approval' || params == 'Renewal License Waiting for Approval' || params == '') {
    return `${'#f5a442'}`;
  }
  else if (params == 'User Discarded') {
    return `${'#c71053'}`;
  }
  else if (params == 'Waiting for Approval' || params == 'Waiting for Renewal Approve') {
    return `${'#635cad'}`;
  }
  else if ((params == 'Renewed') || (params == 'License Renewed')) {
    return `${'#302b2b'}`;
  }
  else if (params == 'Yet To Renew') {
    return `${'#f7ce36'}`;
  }

  else if (params == 'Expired') {
    return `${'#331113'}`;
  }
  else if (params == 'Renewal Not Required') {
    return `${'#557da1'}`
  }

  else {
    return `${'#5979f0'}`;
  }
}

export function auditStatus(params) {
  if ((params == 'QM Approved') || (params == 'QM-CAPA Approved')) {
    return `${'#ab114c'}`;
  }
  else if (params == 'Rejected' ) {
    return `${'#f71111'}`;
  }
  else if (params == 'Inactive') {
    return `${'#f5a442'}`;
  }
  
  else if (params == 'Waiting for Approval') {
    return `${'#ada113'}`;
  }
  else if ((params == 'CAPA Raised')) {
    return `${'#de2c18'}`;
  }
  else if ((params == 'Both Capa Raised')  ) {
    return `${'#f01805'}`;
  }
  else if ((params == 'CAPA submitted') || (params == 'Department Capa Resubmited') || (params == 'Capa Resubmitted')) {
    return `${'#6aba7f'}`;
  }

  else if (params == 'Recheck - QM Approved') {
    return `${'#557da1'}`
  }

  else if (params == 'Recheck - CAPA Submitted') {
    return `${'#557da1'}`
  }

  else if (params == 'Recheck') {
    return `${'#9756c4'}`
  }

  else if (params == 'Audit Approved') {
    return `${'#ab114c'}`
  }

  else if (params == 'Waiting @ OH Approval') {
    return `${'#3a9925'}`
  }

  else if (params == 'Waiting @ AH Approval') {
    return `${'#ab114c'}`
  }

  // else if (params == 'HR Incentive Initiated') {
  //   return `${'#40cc08'}`
  // }
  else if(params == 'Process Not Started'){
    return `${'#F5A60B'}`
  }

  else if(params == 'Incentive Not Applicable'){
    return `${'#a3a2a2'}`
  }
  
  else if(params == 'Incentive Hold'){
    return `${'#fa0202'}`
  }
 else if(params=='Waiting @ BH Approval')
 {
  return `${'#801975'}`
 }

 else if(params=='Waiting @ AM Approval')
 {
  return `${'#7b37b3'}`
 }

 else if(params=='OH Rejected')
 {
  return `${'#fc0303'}`
 }

 else if(params=='BH Rejected')
 {
  return `${'#801975'}`
 }

 else if(params=='Incentive Hold Release')
 {
  return `${'#1119f5'}`;
 }


 else if(params=='Rejected Incentive Release')
 {
  return `${'#801975'}`;
 }

 else if(params=='Removed Incentive Release')
 {
  return `${'#5923de'}`;
 }

 else if(params=='AC Rejected')
 {
  return `${'#033dfc'}`
 }

 else if(params=='Payment Initiated')
 {
  return `${'#5923de'}`
 }
 else if(params=='Bank Initiation')
 {
  return `${'#ab114c'}`
 }
 else if(params=='Payment Done')
 {
  return `${'#5923de'}`
 }

 else if(params=='Incentive Removed')
 {
  return `${'#801975'}`
 }
 else if(params=='Ticket Removed')
 {
  return `${'#85518c'}`
 }
  else {
    return `${'#5979f0'}`;
  }
}

export function CashHandlingStatus(params) {
  if ((params == '1')) {
    return `${'blue'}`;
  }
  if ((params == '2')) {
    return `${'#d70ddd'}`;
  }
  if ((params == '3')) {
    return `${'red'}`;
  }
  if ((params == '4')) {
    return `${'blue'}`;
  }
  if ((params == '5')) {
    return `${'#d70ddd'}`;
  }
  if ((params == '6')) {
    return `${'red'}`;
  }
  if ((params == '7')) {
    return `${'green'}`;
  }
  if ((params == '8')) {
    return `${'red'}`;
  } 
  if ((params == '9')) {
    return `${'green'}`;
  }
  if ((params == '10')) {
    return `${'green'}`;
  }
}
export function callStatus(params) {
  if ((params == 'Call Not Started')) {
    return `${'#de2c18'}`;
  }
  else{
    return `${'#f71111'}`;
  }
}

export function callEntryStatus(params) {
  if ((params == 'Waiting @ Approval')) {
    return `${'#801975'}`;
  }
  else if((params == 'Customer Not Responded')){
    return `${'#de2c18'}`;
  }
  else if((params == 'Answered'))
  {
    return `${'#5923de'}`;
  }
  else if((params == 'Call Completed'))
  {
    return `${'#3a9925'}`;
  }
  else if((params == 'Call Entry Approved'))
  {
    return `${'#5923de'}`;
  }
  else if((params == 'Do Not Disturb'))
  {
    return `${'#801975'}`;
  }
  else if((params == 'Customer Number Invalid'))
  {
    return `${'#ab114c'}`
  }
  // else if((params == 'Call Completed'))
  // {
  //   return `${'#85518c'}`
  // }
else if((params =='Purchase Details'))
{
  return `${'#85518c'}`
}

  else{
    return `${'#f71111'}`;
  }
}

export function deepCleanStatus(params) {
  if ((params == 'Cleaned & Verification Pending')) {
    return `${'#1ea80f'}`;
  }
  else if((params == 'Not Started')){
    return `${'#6e04b3'}`
  }
  else if((params == 'Partially Cleaned')){
    return `${'#3d099c'}`
  } 
  else if((params == 'Not Completed')){
    return `${'#8a0c8a'}`
  } 
  else if((params == 'Approved')){
    return `${'#ab075e'}`
  }  else if((params == 'Pending')){
    return `${'#ab075e'}`
  }
  else{
    return `${'#f71111'}`;
  }
}
  export function ebReadingStatus(params) {
    if ((params == 'Lean')) {
      return `${'#9EAD0E'}`;
    }
    else if((params == 'Lean Pending')){
      return `${'#EE620C'}`
    }
    else if((params == 'Peak')){
      return `${'#3d099c'}`
    } 
    else if((params == 'Peak Pending')){
      return `${'#089DC2'}`
    } 
    else if((params == 'Close')){
      return `${'#F2096C'}`
    }  
    else if((params == 'Close Pending')){
      return `${'#600CA6'}`
    }
    else if((params == 'Completed')){
      return `${'#008000'}`
    }
    else if((params == 'Approved')){
      return `${'#4B0C8D'}`
    }
    else{
      return `${'#f71111'}`;
    }
}


export function stockStatus(params) {
  if ((params == '1')) {
    return `${'#1ea80f'}`;
  }
  else if((params == '0')){
    return `${'#f71111'}`
  }
  else{
    return `${'#6e04b3'}`;
  }
}

export function consumableStatus(params) { 
  if ((params ==='Need to Enter')) {
    return `${'#ff7518'}`;
  }
  else if((params ==='Entry Done')){
    return `${'#f71111'}`
  }
  else if((params == 'Low Consumable'))
  {
    return `${'#8a0c8a'}`
  }
  else if((params == 'Pending'))
  {
    return `${'#1ea80f'}`
  }
  else{
    return `${'#6e04b3'}`;
  }
}