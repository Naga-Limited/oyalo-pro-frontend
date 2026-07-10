import React from "react";
export const column = [
  { key: '1', headerName: 'S.No',  field: 'S.No', hide: false, width: 70 },
  { key: '2', headerName: 'Outlet Code', field: 'outlet_code', hide: false, width: 100},
  { key: '3', headerName: 'Outlet Name', field: 'outlet_name', hide: false, width: 250},
  { key: '4', headerName: 'Event Name', field: 'event_name', hide: false, width: 120 },
  { key: '5', headerName: 'Event Date From', field: 'event_date_from', hide: false, width: 120 },
  { key: '6', headerName: 'Event Date To', field: 'event_date_to', hide: false, width: 120 },
  { key: '7', headerName: 'Event Type', field: 'event_type_name', hide: false, width: 120 },
  { key: '8', headerName: 'Day Type', field: 'day_type', hide: false, width: 120 },
  { key: '9', headerName: 'Budget Expenses Food Truck', field: 'budget_expenses_food_truck', hide: false, width: 120 },
  { key: '10', headerName: 'Rent Food Truck', field: 'rent_food_truck', hide: false, width: 120 },
  { key: '11', headerName: 'Man Power Food Truck', field: 'man_power_food_truck', hide: false, width: 120 },
  { key: '12', headerName: 'Cost Food Truck', field: 'cost_food_truck', hide: false, width: 120 },
  { key: '13', headerName: 'Driver Food Truck', field: 'driver_food_truck', hide: false, width: 120 },
  { key: '14', headerName: 'Petrol Food Truck', field: 'petrol_food_truck', hide: false, width: 120 },
  { key: '15', headerName: 'Mem Food Truck', field: 'mem_food_truck', hide: false, width: 120 },
  { key: '16', headerName: 'Transport Cost FG Equipements Food Truck', field: 'transport_cost_FG_equipements_food_truck', hide: false, width: 120 },
  { key: '17', headerName: 'MP Travel Expenses Food Truck', field: 'mp_travel_expenses_food_truck', hide: false, width: 120 },
  { key: '18', headerName: 'Budget Expenses ODC', field: 'budget_expenses_ODC', hide: false, width: 120 },
  { key: '19', headerName: 'Transport Cost ODC', field: 'transport_cost_ODC', hide: false, width: 120 },
  { key: '20', headerName: 'Rent ODC', field: 'rent_ODC', hide: false, width: 120 },
  { key: '21', headerName: 'MEM ODC', field: 'mem_ODC', hide: false, width: 120 },
  { key: '22', headerName: 'EB Petrol ODC', field: 'eb_petrol_ODC', hide: false, width: 120 },
  { key: '23', headerName: 'Food Expenses ODC', field: 'food_expenses_ODC', hide: false, width: 120 },
  { key: '24', headerName: 'Budget Expenses InStore', field: 'budget_expenses_InStore', hide: false, width: 120 },
  { key: '25', headerName: 'Whatsapp Campaign InStore', field: 'whatsapp_campaign_InStore', hide: false, width: 120 },
  { key: '26', headerName: 'Budgeted AOV', field: 'budgeted_AOV', hide: false, width: 120 },
  { key: '27', headerName: 'Expected AOV', field: 'expected_AOV', hide: false, width: 120 },
  { key: '28', headerName: 'Expected Sales', field: 'expected_sales', hide: false, width: 120 },
  { key: '29', headerName: 'Reason For Event', field: 'reason_for_event_name', hide: false, width: 120 },
  { key: '30', headerName: 'Physical Marketing Name', field: 'physical_marketing_name', hide: false, width: 120 },
  { key: '31', headerName: 'Physical Marketing Budget', field: 'physical_marketing_budget', hide: false, width: 120 },
  { key: '32', headerName: 'Digital Marketing Name', field: 'digital_marketing_name', hide: false, width: 120 },
  { key: '33', headerName: 'Digital Marketing Budget', field: 'digital_marketing_budget', hide: false, width: 120 },  
  { key: '34', headerName: 'Monitoring Name', field: 'monitoring_name', hide: false, width: 120 },
  { key: '35', headerName: 'Monitoring Budget', field: 'monitoring_budget', hide: false, width: 120 },
  { key: '36', headerName: 'Product Discount Name', field: 'product_discount_name', hide: false, width: 120 },
  { key: '37', headerName: 'Product Discount Budget', field: 'product_discount_budget', hide: false, width: 120 },
  { key: '38', headerName: 'Initiator Name', field: 'initiator_name', hide: false, width: 120 },
  { key: '39', headerName: 'Initiator Phoneno', field: 'initiator_phone_no', hide: false, width: 120 },
  { key: '40', headerName: 'Organizer Name', field: 'organizer_name', hide: false, width: 120 },
  { key: '41', headerName: 'Organizer Phoneno', field: 'organizer_phone_no', hide: false, width: 120 },
  { key: '42', headerName: 'Targeted Audience', field: 'targeted_audience', hide: false, width: 120 },
  { key: '43', headerName: 'No.of.Audience', field: 'no_of_audience', hide: false, width: 120 },
  { key: '44', headerName: 'Execution Plan', field: 'execution_plan_name', hide: false, width: 120 },
  { key: '45', headerName: 'Offer Details', field: 'offer_details', hide: false, width: 120 },
  { key: '46', headerName: 'Budgeted ROI', field: 'budgeted_ROI', hide: false, width: 120 },
  { key: '47', headerName: 'Budgeted Sales', field: 'budgeted_sales', hide: false, width: 120 },
  { key: '48', headerName: 'Event Nature', field: 'event_nature_name', hide: false, width: 120 },
  { key: '49', headerName: 'Recurring Period', field: 'recurring_period_name', hide: false, width: 120 },
  { key: '50', headerName: 'Expected Convertion Ratio', field: 'expected_convertion_ratio', hide: false, width: 120 },
  { key: '51', headerName: 'Status', field: 'event_status', hide: false, width: 120,
    renderCell: (params) => {
      const statusText = params.row.event_status === 1 ? 'Active' : 'In Active';
      const color = params.row.event_status === 1 ? 'green' : 'red';
      return (
        <span style={{ color, fontWeight: 'bold' }}>
          {statusText}
        </span>
      );
    }
  },
  ];
