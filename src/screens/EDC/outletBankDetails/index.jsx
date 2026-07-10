import React ,{useEffect} from 'react';
import {useNavigate} from 'react-router';
import CustomTable from '../../../components/CustomTable';
import {column} from './columnnew';
import {getOutletBankDetails} from '../../../@app/master/masterSlice';
 import {useDispatch, useSelector } from 'react-redux';

export default function outletBankDetails({setTopTitle}) {
  setTopTitle('Outlet Bank Details');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClickAdd = () => {
    navigate('/outletBankDetails/addForm', {
      state: {}
    });
  };
  const handleEditClick = async (data) => {
      navigate("/outletBankDetails/addForm", {
            state: { data, ...data }
        });   
  };

  const { type, userData } = useSelector((state) => state.auth);
  useEffect(() => {
    if (type === 1)
      dispatch(getOutletBankDetails({ path: "get-deep-cleaning", data: {} }));
    else
      dispatch(
        getOutletBankDetails({
          path: "get-deep-cleaning",
          data: { employee: userData.data?.id }
        })
      );
  }, []);
 

  const {
    gettingOutletBankDetails,
    getOutletBankDetailsResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.master;
  });

  return (
    <CustomTable
      loading={gettingOutletBankDetails}
      dataSource={dataSource}
      column={column}    
      handleEditClick={handleEditClick}
      onClickAdd={onClickAdd}
      title={"Outlet Bank Details"}         
    />
  );
}
