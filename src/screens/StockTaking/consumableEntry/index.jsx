import React ,{useEffect} from 'react';
import {useNavigate} from 'react-router';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
import {getConsumableEntry} from '../../../@app/subMaster/subMasterSlice';
 import {useDispatch, useSelector } from 'react-redux';

export default function ConsumableMaster({setTopTitle}) {
  setTopTitle('Consumable Entry Details');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleEditClick = (data) => {
     navigate('/consumableEntry/addForm', {
      state: {...data,outlet_id:data?.outlet_id
      },      
    });
  };

  const { type, userData } = useSelector((state) => state.auth);
  useEffect(() => {
    if (type === 1)
      dispatch(getConsumableEntry({ path: "get-Consumable-Entry", data: {} }));
    else
      dispatch(
        getConsumableEntry({
          path: "get-Consumable-Entry",
          data: { employee: userData.data?.id }
        })
      );
  }, []); 

  const {
    gettingConsumableEntry,
    getConsumableEntryResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.subMaster;
  });

  return (
    <CustomTable
      loading={gettingConsumableEntry}
      dataSource={dataSource}
      column={column}    
      handleEditClick={handleEditClick}
     // onClickAdd={onClickAdd}
      title={"Consumable Entry Details"}         
    />
  );
}
