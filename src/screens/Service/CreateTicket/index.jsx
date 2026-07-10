import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import CustomTable from '../../../components/CustomTable';
import { useDispatch, useSelector } from 'react-redux';
import { getTickets } from '../../../@app/service/serviceSlice';
import { column } from './column';

export default function CreateTicket(props) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate('/createTicket/addEditForm', {
      state: { isEdit: false }
    });
  };

  const {
    gettingTickets,
    getTicketsResponse: { data: dataSource }
  } = useSelector((state) => {
    return state.service;
  });

  const handleEditClick = (data) => {
    navigate('/createTicket/addEditForm', {
      state: { data, isEdit: true }
    });
  };

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);



  useEffect(() => {
    props.setTopTitle("Tickets")
    // eslint-disable-next-line
  }, [])

  return (
    <div className='h-screen'>
      <CustomTable loading={gettingTickets} dataSource={dataSource} column={column} handleEditClick={handleEditClick} onClickAdd={onClickAdd} title={'Create Ticket List'} />
    </div>
  );
}

