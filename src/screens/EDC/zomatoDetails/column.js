
import { format } from 'date-fns';

function getEntryDate(params) {
  return `${format(new Date(params.row.tran_date), 'dd-MM-yyyy')}`;
}	

function getSettlementDate(params) {
  return `${format(new Date(params.row.settlement_date), 'dd-MM-yyyy')}`;
}	

export const column = [
  { key: '1', headerName: 'S.No', field: 'id', hide: false, width: 100 },
  { key: '2', headerName: 'Outlet Code', field: 'outlet_code', hide: false, width: 100 },
  { key: '3', headerName: 'Outlet Name', field: 'outlet_name', hide: false, width: 270}, 
  { key: '4', headerName: 'Trans Date', field: 'tran_date', hide: false, width: 140,
    valueGetter: getEntryDate },
  { key: '5', headerName: 'Settlement Date', field: 'settlement_date', hide: false, width: 140,
    valueGetter: getSettlementDate },
  { key: '6', headerName: 'Zomato Id', field: 'zomato_id', hide: false, width: 180 }, 
  { key: '7', headerName: 'Order Id', field: 'order_id', hide: false, width: 180 },
  { key: '8', headerName: 'UTR', field: 'utr', hide: false, width: 180 },
  { key: '9', headerName: 'Service Fees', field: 'service_fees', hide: false, width: 180 },
  { key: '10', headerName: 'Taxes on Service Payment_mechanisum_fees', field: 'taxes_on_service_payment_mechanisum_fees', hide: false, width: 180 },
  { key: '11', headerName: 'TCS Amt', field: 'tcs_amt', hide: false, width: 90 },
  { key: '12', headerName: 'TDS Amt', field: 'tds_amt', hide: false, width: 90 },
  { key: '13', headerName: 'Order Status', field: 'order_status', hide: false, width: 180 },
  { key: '14', headerName: 'Gross Amt', field: 'gross_amt', hide: false, width: 150 },  
  { key: '15', headerName: 'Res Name', field: 'res_name', hide: false, width: 150 },  
  { key: '16', headerName: 'Discount Construct', field: 'discount_construct', hide: false, width: 150 },  
  { key: '17', headerName: 'Cancellation Policy', field: 'cancellation_policy', hide: false, width: 150 },  
  { key: '18', headerName: 'Cancellation Rejection Reason', field: 'cancellation_rejection_reason', hide: false, width: 150 },  
  { key: '19', headerName: 'Cancelled Rejected State', field: 'cancelled_rejected_state', hide: false, width: 150 },  
  { key: '20', headerName: 'Order Type', field: 'order_type', hide: false, width: 150 },  
  { key: '21', headerName: 'Delivery State Code', field: 'delivery_state_code', hide: false, width: 150 },  
  { key: '22', headerName: 'Subtotal', field: 'subtotal', hide: false, width: 150 },
  { key: '23', headerName: 'Packaging Charge', field: 'packaging_charge', hide: false, width: 150 },
  { key: '24', headerName: 'Delivery Charge_for_restaurants_on_self_logistics', field: 'delivery_charge_for_restaurants_on_self_logistics', hide: false, width: 150 },
  { key: '25', headerName: 'Restaurant_discount_promo', field: 'restaurant_discount_promo', hide: false, width: 150 },
  { key: '26', headerName: 'Restaurant_discount_bogo_freebies_gold_brand_pack_others', field: 'restaurant_discount_bogo_freebies_gold_brand_pack_others', hide: false, width: 150 },  
  { key: '27', headerName: 'Brand_pack_subscription_fee', field: 'brand_pack_subscription_fee', hide: false, width: 150 },  
  { key: '28', headerName: 'Delivery_charge_discount_relisting_discount', field: 'delivery_charge_discount_relisting_discount', hide: false, width: 150 },  
  { key: '29', headerName: 'Total_gst_collected_from_customers', field: 'total_gst_collected_from_customers', hide: false, width: 150 },  
  { key: '30', headerName: 'Commissionable_value', field: 'commissionable_value', hide: false, width: 150 },  
  { key: '31', headerName: 'Service_fee_value', field: 'service_fee_value', hide: false, width: 150 },  
  { key: '32', headerName: 'Payment_mechanism_fee', field: 'payment_mechanism_fee', hide: false, width: 150 },  
  { key: '33', headerName: 'Service_fee_payment_mechanism_fees', field: 'service_fee_payment_mechanism_fees', hide: false, width: 150 },  
  { key: '34', headerName: 'Applicable_amount_for_TCS', field: 'applicable_amount_for_TCS', hide: false, width: 150 },  
  { key: '35', headerName: 'Applicable_amount_for_9', field: 'applicable_amount_for_9', hide: false, width: 150 },  
  { key: '36', headerName: 'Tax_collected_at_source', field: 'tax_collected_at_source', hide: false, width: 150 },  
  { key: '37', headerName: 'GST_paid_by_zomato_on_behalf_of_restaurant', field: 'gst_paid_by_zomato_on_behalf_of_restaurant', hide: false, width: 150 },  
  { key: '38', headerName: 'GST_to_be_paid_by_restaurant_partner_to_govt', field: 'gst_to_be_paid_by_restaurant_partner_to_govt', hide: false, width: 150 },  
  { key: '39', headerName: 'Government_charges', field: 'government_charges', hide: false, width: 150 },  
  { key: '40', headerName: 'Customer_compensation_recoupment', field: 'customer_compensation_recoupment', hide: false, width: 150 },  
  { key: '41', headerName: 'Delivery_charges_recovery', field: 'delivery_charges_recovery', hide: false, width: 150 },  
  { key: '42', headerName: 'Amount_received_in_cash_on_self_delivery_orders', field: 'amount_received_in_cash_on_self_delivery_orders', hide: false, width: 150 },  
  { key: '43', headerName: 'Credit_note_debit_note_adjustment', field: 'credit_note_debit_note_adjustment', hide: false, width: 150 },  
  { key: '44', headerName: 'Promo_recovery_adjustment', field: 'promo_recovery_adjustment', hide: false, width: 150 },  
  { key: '45', headerName: 'Extra_inventory_ads_and_misc_order_level_deduction', field: 'extra_inventory_ads_and_misc_order_level_deduction', hide: false, width: 150 },  
  { key: '46', headerName: 'Brand_loyalty_points_redemption', field: 'brand_loyalty_points_redemption', hide: false, width: 150 },  
  { key: '47', headerName: 'Other_order_level_deductions', field: 'other_order_level_deductions', hide: false, width: 150 },  
  { key: '48', headerName: 'Net_deductions', field: 'net_deductions', hide: false, width: 150 },  
  { key: '49', headerName: 'Net_additions', field: 'net_additions', hide: false, width: 150 },  
  { key: '50', headerName: 'Order_level_payout', field: 'order_level_payout', hide: false, width: 150 },  
  { key: '51', headerName: 'Settlement_status', field: 'settlement_status', hide: false, width: 150 },  
  { key: '52', headerName: 'Unsettled_amount', field: 'unsettled_amount', hide: false, width: 150 },  
  { key: '53', headerName: 'Customer_id', field: 'customer_id', hide: false, width: 150 },    
];
