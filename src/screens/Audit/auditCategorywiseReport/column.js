const categories = [
  {
    "category_name": "Legal Requirements",
    "category_mark": 2
  },
  {
    "category_name": "Receiving and Purchase",
    "category_mark": 5
  },
  {
    "category_name": "Storage",
    "category_mark": 18
  },
  {
    "category_name": "Pre Preparation and Preparation",
    "category_mark": 18
  },
 
  {
    "category_name": "Pest control , Cleaning and Sanitation",
    "category_mark": 18
  },
  {
    "category_name": "Customer Service",
    "category_mark": 18
  },
  {
    "category_name": "Personal Hygiene",
    "category_mark": 18
  },
  {
    "category_name": "Customer Complaint Handling, Audit , Training and Documents and Records",
    "category_mark": 18
  },
  // Add more categories here
];

export const column = [
  { key: '1', headerName: 'S.No', field: 'S.No', hide: false, width: 30 },
  {
    key: '2', headerName: 'Outlet Name', field: 'outletname', hide: false, width: 250
  },
  {
    key: '3', headerName: 'Audit Number', field: 'audit_id', hide: false, width: 150
  },
  { key: '4', headerName: 'Audit Date', field: 'audit_date', hide: false, width: 100 },
  {
    key: '5', headerName: 'Audit Score', field: 'total_marks', hide: false, width: 100,
    valueGetter: (params) => {
      return (params.row.total_marks +' / '+  100);
    }
  },
  { headerName: 'CAPA Date', field: 'updated_at', hide: false, width: 120 },
  
    ...categories.map((category, index) => ({
    headerName: category.category_name,
    field: `category_${index}`,
    hide: false,
    width: 100,
    valueGetter: (params) => {
      if (Array.isArray(params.row.category)) {
        const categoryIndex = params.row.category.findIndex(cat => cat.category_name === category.category_name);
        if (categoryIndex !== -1) {
          return params.row.category[categoryIndex].category_mark;
        }
      }
      return ''; // Or another default value
    },
  })), 
];


