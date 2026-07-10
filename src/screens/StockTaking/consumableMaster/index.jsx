import React ,{useEffect} from 'react';
import {useNavigate} from 'react-router';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
import {getConsumableMaster} from '../../../@app/subMaster/subMasterSlice';
 import {useDispatch, useSelector } from 'react-redux';

export default function ConsumableMaster({setTopTitle}) {
  setTopTitle('Consumable Master Details');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClickAdd = () => {
    navigate('/consumableMaster/addForm', {
      state: {}
    });
  };

  const handleDownload = () => {
    window.open(
      process.env.REACT_APP_API_BASE_URL + "download-consumable-master-upload",
      "_blank"
    );
  };

  const onClickUpdateCsv = () => {
    navigate("/consumableMaster/csvUpdate", {
      state: {}
    });
  };

   const handleEditClick = async (data) => {    
      navigate("/consumableMaster/editForm", {
            state: { data, ...data }
        });   
  };

  const { type, userData } = useSelector((state) => state.auth);
  useEffect(() => {
    if (type === 1)
      dispatch(getConsumableMaster({ path: "get-Consumable-Master", data: {} }));
    else
      dispatch(
        getConsumableMaster({
          path: "get-Consumable-Master",
          data: { employee: userData.data?.id }
        })
      );
  }, []);
 

  const {
    gettingConsumableMaster,
    getConsumableMasterResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.subMaster;
  });

  return (
    <CustomTable
      loading={gettingConsumableMaster}
      dataSource={dataSource}
      column={column}    
      handleEditClick={handleEditClick}
      onClickAdd={onClickAdd}
      title={"Consumable Master Details"}       
    //  hideActionBtn={true}    
      handleDownload={handleDownload}
      onClickUpdateCsv={onClickUpdateCsv}  
    />
  );
}
