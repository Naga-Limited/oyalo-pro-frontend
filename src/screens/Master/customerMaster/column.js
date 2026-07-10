import dayjs from "dayjs";
export const column = [
  { key: "1", headerName: "S.No", field: "S.No", hide: false, width: 100 },
  {
    key: "2",
    headerName: "Customer Name",
    field: "first_name",
    hide: false,
    width: 250,
    valueGetter: (params) => {
      return params.row.first_name + " - " + params.row.customer_code;
    }
  },
  {
    key: "3",
    headerName: "Phone No",
    field: "phone_number",
    hide: false,
    width: 100
  },
  {
    key: "4",
    headerName: "DOB",
    field: "dob",
    hide: false,
    width: 150,
    valueGetter: (params) => {
      if (params.row.dob !== "" && dayjs(params.row.dob).isValid()) {
        const shortdate = dayjs(params.row.dob).format("DD-MM-YYYY");
        return shortdate;
      } else {
        return ""; // Return an empty string for empty or invalid dates
      }
    }
  },
  {
    key: "4",
    headerName: "Anniversary",
    field: "anniversary",
    hide: false,
    width: 150,
    valueGetter: (params) => {
      if (params.row.anniversary !== "" && dayjs(params.row.anniversary).isValid()) {
        const shortdate = dayjs(params.row.anniversary).format("DD-MM-YYYY");
        return shortdate;
      } else {
        return ""; // Return an empty string for empty or invalid dates
      }
    }
  },
  {
    key: "5",
    headerName: "Created Date",
    field: "createdDate",
    hide: false,
    width: 150
  }
];
