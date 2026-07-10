/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import CustomTable from '../../../components/CustomTable';
import { column } from './column';
import { useDispatch, useSelector } from 'react-redux';
import { getTicketForHadling } from '../../../@app/service/serviceSlice';


function Poprocessappoh() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    gettingTicketHandling,
    getTicketHandlingResponse: { data },
  } = useSelector((state) => {
    return state.service;
  });

  useEffect(() => {
    dispatch(getTicketForHadling({ type: "Waiting @ OH Approval" }));
  }, [dispatch]);


  const handleUpdate = (rowInfo) => {
    navigate('/poprocessappohForm', {
      state: rowInfo
    });
  };

  return (
    <div className='h-screen apphide'>
      <CustomTable
        loading={gettingTicketHandling}
        dataSource={data}
        column={column(handleUpdate)}
        handleViewClick={handleUpdate}
        hideActionBtn={true}
        onClickAdd={() => false}
        title={'Create List'}
      />
    </div>
  );
}

export default Poprocessappoh;
