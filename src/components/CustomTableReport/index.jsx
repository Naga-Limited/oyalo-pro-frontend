import React, {useEffect, useState} from 'react';
import {Card, Modal,
  //Form,Col
} from 'antd';
import Container from 'react-bootstrap/Container';
import InputAdornment from '@mui/material/InputAdornment';
import {SearchOutlined} from '@ant-design/icons/lib/icons';
import {OutlinedInput, Stack, Tooltip} from '@mui/material';
import {BsPlusLg} from 'react-icons/bs';
import {AiOutlineDownload, AiOutlineImport} from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import {DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton} from '@mui/x-data-grid';
import {FaEye, FaUserEdit} from 'react-icons/fa';
import ViewCard from '../viewCard/ViewCard';
import {useNavigate} from 'react-router';
import {useDebounce} from '../../customHooks/useDebouce';
import CustomPagination from './customPagination';
import {isEmpty} from 'ramda';

const customHeaderDesign = {
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#494b4d',
    color: '#F4A50D'
  },
  '.MuiDataGrid-sortIcon': {
    fill: 'white'
  },
  '.MuiIconButton-sizeSmall': {
    color: 'white'
  },
 ' .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked, .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.MuiCheckbox-indeterminate ':
 {
    color: '#F4A50D'
  },
  '.PrivateSwitchBase-input css-1m9pwf3':
  {    
    color: '#F4A50D',
    backgroundColor: '#F4A50D'
  }
};

const customMobileFilterDesign = {
  '& .MuiDataGrid-filterForm': {
    flexDirection: {
      xs: 'column',
      sm: 'row'
    }
  },
  '& .MuiDataGrid-paper': {
    minWidth: {
      xs: '0'
    }
  }
};




export default function CustomTable({dataSource, column, onClickAdd, title, loading = false, handleEditClick, handleViewClick, addButtonStatus = false,
  //setMonth = {},
  //month = "",
  //handleSubmit = {}
  }) {
  const data = (dataSource ?? []).map((data, index) => {
    return {'S.No': index + 1, id: index + 1, ...data, status: Number(data.status) ? 'Active' : 'In Active'};
  });
  // const handleFormSubmit = () => {
  //   if (!month) {
  //      messageToast({
  //        message: "Please Choose Month",
  //        status: 400,
  //        title: "",
  //      });
  //      return false;
  //    }
  //    handleSubmit();
  //  };
  // <Row gutter={[45, 0]}>
  // <Col md={{span: 10}} xs={{span: 24}}></Col>
  //     <Col md={{span: 4}} xs={{span: 24}} >
  //     <Form.Item name='month' label='Month' >                     
  //     <Select
  //         className="col-md-12"
  //         onChange={(e) => setMonth(e?.target.value)}>
  //         <option value={""}>Select Month</option>
  //         <option value={"01"}>01</option>
  //         <option value={"02"}>02</option>
  //         <option value={"03"}>03</option>
  //         <option value={"04"}>04</option>
  //         <option value={"05"}>05</option>
  //         <option value={"06"}>06</option>
  //         <option value={"07"}>07</option>
  //         <option value={"08"}>08</option>
  //         <option value={"09"}>09</option>
  //         <option value={"10"}>10</option>
  //         <option value={"11"}>11</option>
  //         <option value={"12"}>12</option>
  //       </Select>
         
  //     </Form.Item>
  //       </Col>
  //       <Col md={{span: 5}} xs={{span: 24}} >
  //       <Form.Item name='submit'>     
  //       <button
  //       onClick={handleFormSubmit}
  //       style={{background:'#34b1aa',color: "#ffffff"}}
  //       className="btn btn col-lg-2 col-m-2 col-sm-2 h-100 w-auto align-items-center">
  //       {" "}
  //       Submit
  //     </button>
  //     </Form.Item>
  //         </Col>
  //       </Row>

  const [searchText, setSearchText] = useState('');
  const [tableData, setTableData] = useState(data);
  const navigate = useNavigate();
  const query = useDebounce(searchText, 600);

  useEffect(() => {
    const text = query.replace(/^\s+/g, '');
    const newData = data.filter((obj) =>
      Object.keys(obj)
        .map((o) => String(obj[o]).toLowerCase())
        .some((v) => v.includes(text.toLowerCase()))
    );
    setTableData(newData);
  }, [query, title, searchText]);


 

  const columns = [
    ...column,
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const view = () => {
          if (title === 'CAPA Submission List') {
            navigate('/capaView', {
              state: params.row
            });
          } else if (title === 'Entry List') {
            navigate('/auditEntry/auditView', {
              state: params.row
            });
          }
          // else if (title === 'Audit Incentive HR') {
          //   navigate('/auditIncentiveHRSubmitView', {
          //     state: params.row.id
          //   });
          // }
          else if (title !== 'Approval List') {
            Modal.info({
              title: <div className='align-self-center'>{title}</div>,
              width: '50%',
              content: <ViewCard data={params.row} column={column} />,
              icon: <></>,
              onOk() {}
            });
          } else {
            navigate('/approvalView', {
              state: params.row
            });
          }
        };

        return (
          <Stack direction='row' spacing={3}>
            <Tooltip placement='bottom' title={'View'}>
              <Button
                variant='outlined'
                onClick={handleViewClick ? () => handleViewClick(params.row) : view}
                color='warning'
                style={{backgroundColor: '#1f3bb3', width: '50px'}}
                size='sm'>
                <FaEye color='#fff' />
              </Button>
            </Tooltip>
            {title !== 'Role Master' && title !== 'Audit Report' && title !== 'CAPA Submission List' 
            && title !== 'Approval List' && title !== 'License Report'
            && title !== 'Audit Entry List' && title !== 'Audit Outlet CAPA List' 
            && title !== 'Audit Outlet Approval List' && title !== 'Audit Department CAPA' 
            && title !== 'Audit 2.0 Report' && title!== 'Incentive OH View Outlet List'
            && title !== 'Incentive Account View Outlet List'
            && title !== 'Customer Master' 
            ? (
              <Tooltip placement='bottom' title={'Edit'}>
                <Button variant='outlined' onClick={() => handleEditClick(params.row)} color='error' style={{backgroundColor: '#ffaf00', width: '50px'}} size='sm'>
                  <FaUserEdit color='#fff' />
                </Button>
              </Tooltip>
            ) : (
              <></>
            )}
          </Stack>
        );
      }
    }
  ].filter((e) => !e.hide);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport
          csvOptions={{
            fileName: title.replace(/ +/g, ''),
            // delimiter: ';',
            utf8WithBom: true
          }}
          printOptions={{
            hideToolbar: true
          }}
        />
      
      </GridToolbarContainer>
    );
  }
  //const [selectedRows, setSelectedRows] = React.useState([]);

  return (
    <Container style={{width: '100%'}}>         
      {/* title={<h3>{title}</h3>} */}
      <Card style={{height: '100%'}} bordered={true}>     
        <div className='row align-items-center' style={{paddingLeft: '11px', paddingTop: '4px'}}>
         <div className='col-lg-4 col-md-3 col-sm-12 mt-2 pb-4 row align-items-center'>
       
           <OutlinedInput
              className='align-items-center ml-sm-2 mr-sm-2 shadow-sm'
              id='input-with-icon-adornment'
              placeholder='Search Here'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              size='small'
              startAdornment={
                <InputAdornment position='start'>
                  <SearchOutlined />
                </InputAdornment>                
              }
            />             
            </div>
          
           
          {title !== 'Approval List' && title !== 'Audit Report' 
          && title !== 'CAPA Submission List' && title !== 'License Report' 
          && title !== 'License Renewal' && title !== 'Approve License' 
          && title !== 'Edit License Details'&& title !== 'Audit Outlet CAPA List' 
          && title !== 'Audit Outlet Approval List' && title !== 'Audit Department CAPA' 
          && title !== 'Audit 2.0 Report' && title!== 'Incentive OH View Outlet List'
          && title !== 'Incentive Account View Outlet List' && title !== 'Incentive HR Initiate'
          && title !== 'Call Back Entry List'
          && title !== 'Customer Master' 
           ? (
            <div className='col-lg-8 mt-2 col-md-9 col-sm-12 text-md-end text-lg-end text-center  mt-sm-2'>
              <div className='btn-group pb-2'>
                <Tooltip placement='bottom' title={'Add'}>
                  <Button
                    disabled={addButtonStatus}
                    onClick={() => {
                      onClickAdd();
                    }}
                    className='btn btn-primary me-2 px-md-3 px-sm-4'>
                    <BsPlusLg size={12} />
                  </Button>
                </Tooltip>

                {title !== 'Entry List' ? (
                  <>
                    <Tooltip placement='bottom' title={'Upload'}>
                      <div className='btn btn-primary me-2 px-md-3 px-sm-4'>
                        <AiOutlineImport size={20} />
                      </div>
                    </Tooltip>
                    <Tooltip placement='bottom' title={'Download'}>
                      <div className='btn btn-primary me-2 px-md-3 px-sm-4'>
                        <AiOutlineDownload size={20} />
                      </div>
                    </Tooltip>
                
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div>
          <div style={{height: 650, width: '100%'}}>
            <div style={{display: 'flex', height: '100%'}}>
              <div style={{flexGrow: 1, fontSize: '25px'}}>
                <DataGrid
                  rowSelection='multiple'
                  density='compact'
                  loading={loading}
                  columns={columns}                
                  rows={isEmpty(searchText) ? data : tableData}
                  hideFooterSelectedRowCount
                  components={{
                    Toolbar: CustomToolbar
                  }}
                  componentsProps={{
                    pagination: {
                      ActionsComponent: CustomPagination
                    },
                    panel: {
                      sx: customMobileFilterDesign
                    }
                  }}
                  sx={customHeaderDesign}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Container>
  );
}
