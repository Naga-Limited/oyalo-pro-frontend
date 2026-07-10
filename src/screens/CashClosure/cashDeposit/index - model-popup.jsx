import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { get_Audit_Entry } from '../../../@app/master/masterSlice';
import CustomTable from '../../../components/CustomTable';
import { column } from './column';
import { Modal, Input, Button } from 'antd'; // Import Input from 'antd'

export default function AccountClosing({ setTopTitle }) {
  setTopTitle('Cash Deposit Details');
  const navigate = useNavigate();
  const {
    gettingAuditNewEntryMark,
    getAuditNewEntryMarkResponse: { data: dataSource }
  } = useSelector((state) => state.master);

  const { type, userData } = useSelector((state) => state.auth);
  const empId = userData.data?.id;

  const gridData = (dataSource ?? []).map((e) => {
    // ... (your gridData mapping logic)
  });

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(''); // State to store the input value

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const onClickAdd = () => {
    navigate('/accountClosing/addForm');
  };

  const handleViewClick = (data) => {
    navigate('/accountClosing/view', {
      state: { ...data }
    });
  };

  const handleEditClick = (data) => {
    navigate('/accountClosing/addForm', {
      state: { ...data, edit: true }
    });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    // ... (your useEffect logic)
  }, []);

  return (
    <>
      <div style={{ display: 'block', padding: 30,textAlign:'center' }}>
        <Button type="button" onClick={handleOpen}  style={{ backgroundColor: "#f5a60b" }} >
          Enter Deposit Amount
        </Button>
        <Modal
          onCancel={handleClose} // Use onCancel instead of onClose
          visible={open} // Use visible to control modal visibility
          centered // Center the modal on the screen
          style={{
            border: '2px solid #000',
            backgroundColor: 'gray',
            boxShadow: '2px solid black',
            width: 240,
            margin: 'auto'
          }}
        >
          {/* Input fields inside the Modal */}
          <h2>Modal Content with Input Fields:</h2>
          <Input
            placeholder="Enter something..."
            // value={inputValue}
            // onChange={(e) => setInputValue(e.target.value)}
          />
          <Input
            placeholder="Another input..."
            // value={inputValue} // You can bind the value to a state variable
            // onChange={(e) => setInputValue(e.target.value)} // Handle input changes
          />
        </Modal>
      </div>

      <CustomTable
        dataSource={gridData}
        loading={gettingAuditNewEntryMark}
        column={column}
        onClickAdd={onClickAdd}
        handleEditClick={handleEditClick}
        handleViewClick={handleViewClick}
        title={'Cash Deposit Details'}
      />
    </>
  );
}
