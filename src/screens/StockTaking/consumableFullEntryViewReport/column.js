import React from "react";
import { format } from 'date-fns';
import { consumableStatus } from "../../../components/formComponents/CommonFunctions";
import { Badge } from "antd";

function getEntryDate(params) {
  return `${format(new Date(params.row.created_at), 'dd-MMM-yy')}`;
}

// Base columns
const baseColumns = [
  { key: "1", headerName: "S.No", field: "S.No", hide: false, width: 80 },
  {
    key: "2",
    headerName: "Outlet Code",
    field: "outlet_code",
    hide: false,
    width: 120,
  },
  {
    key: "3",
    headerName: "Outlet Name",
    field: "outlet_name",
    hide: false,
    width: 250,
  },
  {
    key: "4",
    headerName: "Date",
    field: "created_at",
    hide: false,
    width: 100,
    valueGetter: getEntryDate,
  },
  {
    key: "5",
    headerName: "Status",
    field: "consumstatus",
    hide: false,
    width: 150,
    renderCell: (params) => {
      return (
        <Badge
          style={{ backgroundColor: consumableStatus(params.row.consumstatus) }}
          count={params.row.consumstatus}
        />
      );
    },
  },
];

// Function to generate dynamic columns based on material descriptions
export const generateColumns = (data) => {
  
  if (!data) {
    return baseColumns;
  }
  const materialDescriptions = new Set();
  // Extract all unique material descriptions
  data.forEach(row => {
    row.material_group.forEach(group => {
      if (group.description) {
        group.description.forEach(desc => {
          materialDescriptions.add(desc.material_description);
        });
      }
    });
  });

  // Generate columns for each material description
  const materialColumns = [];
  let columnIndex = 6; // Starting index for material columns

  materialDescriptions.forEach(description => {
    materialColumns.push({
      key: `${columnIndex}`,
      headerName: description,
      field: description,
      hide: false,
      width: 150,
      valueGetter: (params) => {
        for (const matGroup of params.row.material_group) {
          if (matGroup.description) {
            for (const desc of matGroup.description) {
              if (desc.material_description === description) {
                return desc.stock_qty;
              }
            }
          }
        }
        return ''; // Default value if not found
      }
    });
    columnIndex++;
  });

  return [...baseColumns, ...materialColumns];
};
