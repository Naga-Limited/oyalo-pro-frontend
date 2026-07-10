import React, {useEffect} from 'react';
import {useNavigate} from 'react-router';
import CustomTable from '../../../components/CustomTable';
import {getOutletMaster} from '../../../@app/master/masterSlice';
import {useDispatch, useSelector} from 'react-redux';

function OutletMaster({setTopTitle}) {
  setTopTitle('Outlet Master');
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate('/outletMaster/addForm');
  };

  const {
    gettingOutletMaster,
    getOutletMasterResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.master;
  });

  const handleEditClick = (data) => {
    navigate('/outletMaster/addForm', {
      state: {data, isEdit: true}
    });
  };
  const onClickUpdateCsv = (data) => {
    navigate("/outletMaster/csvUpdate", {
      state: { data },
    });
  };

  useEffect(() => {
    dispatch(getOutletMaster());
  }, [dispatch]);
  let column = [
    {key: '1', headerName: 'S.No', field: 'S.No', hide: false, width: 70},
    {key: '8', headerName: 'Name', field: 'name', hide: false, width: 180},
    {key: '2', headerName: 'outlet Code', field: 'outlet_code', hide: false, width: 120},
    {key: '4', headerName: 'State', field: 'state_name', hide: false, width: 180},
    {key: '5', headerName: 'Zone', field: 'zone_name', hide: false, width: 180},
    {key: '6', headerName: 'Sub Zone Name', field: 'subzone_name', hide: false, width: 150},
    {key: '7', headerName: 'City Name', field: 'city_name', hide: false, width: 180},
    {key: '9', headerName: 'Email', field: 'email', hide: false, width: 300},
    {key: '11', headerName: 'Zomoato ID', field: 'zomoatoID', hide: false, width: 130},
    {key: '12', headerName: 'Zomoato Date', field: 'zomoato_date', hide: false, width: 130},
    {key: '13', headerName: 'Swiggy ID', field: 'swiggyID', hide: false, width: 130},
    {key: '14', headerName: 'Swiggy Date', field: 'swiggy_date', hide: false, width: 130},
    {key: '15', headerName: 'Dotpe ID', field: 'dotpeID', hide: false, width: 130},
    {key: '16', headerName: 'Dotpe Date', field: 'dotpe_date', hide: false, width: 130},
    {key: '17', headerName: 'Contact', field: 'contact', hide: false, width: 140},
    {key: '18', headerName: 'Address', field: 'address', hide: false, width: 500},
    {key: '19', headerName: 'Latitude', field: 'latitude', hide: false, width: 130},
    {key: '20', headerName: 'Longitude', field: 'longitude', hide: false, width: 130},
    {key: '21', headerName: 'Cost Center', field: 'cost_center', hide: false, width: 130},
    {key: '22', headerName: 'Open Time', field: 'open_time', hide: false, width: 120},
    {key: '23', headerName: 'Close Time', field: 'close_time', hide: false, width: 120},
    {key: '24', headerName: 'Opening Date', field: 'opening_date', hide: false, width: 130},
    {key: '25', headerName: 'Order Placing No', field: 'order_placing_no', hide: false, width: 130},
    {key: '26', headerName: 'fire Extinguisher License No', field: 'fire_extinguisher_license_no', hide: false, width: 180},
    {key: '27', headerName: 'fire License No', field: 'fire_license_no', hide: false, width: 180},
    {key: '28', headerName: 'fssai_license_no', field: 'fssai_license_no', hide: false, width: 180},
    {key: '29', headerName: 'labour_license_no', field: 'labour_license_no', hide: false, width: 180},
    {key: '30', headerName: 'Status', field: 'status', hide: false, width: 120}
  ];

  const handleDownload = () => {
    window.open(
      process.env.REACT_APP_API_BASE_URL + "download-outlet-master",
      "_blank"
    );
  };

  ///
  return (
    <div className="h-screen">
      <CustomTable
        loading={gettingOutletMaster}
        dataSource={dataSource}
        column={column}
        handleEditClick={handleEditClick}
        onClickUpdateCsv={onClickUpdateCsv}
        onClickAdd={onClickAdd}
        title={"Outlet Master List"}
        handleDownload={handleDownload}
      />
    </div>
  );
}

export default OutletMaster;
