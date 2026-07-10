import React, { useEffect, useState } from 'react';
import { Card, } from 'antd';
import Container from 'react-bootstrap/Container';
import InputAdornment from '@mui/material/InputAdornment';
import { SearchOutlined } from '@ant-design/icons/lib/icons';
import { OutlinedInput, Stack, Tooltip } from '@mui/material';
import { BsPlusLg } from 'react-icons/bs';
import Button from 'react-bootstrap/Button';
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { FaEye, FaUserEdit } from 'react-icons/fa';
import { useDebounce } from '../../customHooks/useDebouce';
import CustomPagination from './customPagination';
import { isEmpty } from 'ramda';

const customHeaderDesign = {
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#080808',
    color: '#F4A50D'
  },
  '.MuiDataGrid-sortIcon': {
    fill: 'white'
  },
  '.MuiIconButton-sizeSmall': {
    color: 'white'
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

export default function CustomTable({ dataSource, column, title, loading = false, onClickAdd, handleEditClick, handleViewClick, addButtonStatus = false }) {
  const data = (dataSource ?? []).map((data, index) => {
    return { 'S.No': index + 1, id: index + 1, ...data,};
  });


  const [searchText, setSearchText] = useState('');
  const [tableData, setTableData] = useState(data);
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


        return (
          <Stack direction='row' spacing={3}>
            {title !== 'Cash Handling Report' && title !== 'Sales Report' && title !== 'CASH HANDLING' && title !== 'CASH HANDLING CONFIRMATION' ? (
              <Tooltip placement='bottom' title={'View'}>
                <Button
                  variant='outlined'
                  onClick={handleViewClick ? () => handleViewClick(params.row) : ''}
                  color='warning'
                  style={{ backgroundColor: '#1f3bb3', width: '50px' }}
                  size='sm'>
                  <FaEye color='#fff' />
                </Button>
              </Tooltip>
            ) : (
              <></>
            )}
            {title !== 'Cash Handling Report' && title !== 'Sales Report' && title !== 'Definitions Master' && title !== 'Definitions List' ? (
              <Tooltip placement='bottom' title={'Edit'}>
                <Button variant='outlined' onClick={() => handleEditClick(params.row)} color='error' style={{ backgroundColor: '#ffaf00', width: '50px' }} size='sm'>
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

  return (
    <Container style={{ width: '100%' }}>
      {/* title={<h3>{title}</h3>} */}
      <Card style={{ height: '100%' }} bordered={true}>
        <div className='row align-items-center' style={{ paddingLeft: '11px', paddingTop: '4px' }}>
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
          {title !== 'Cash Handling Report' && title !== 'Sales Report' && title !== 'CASH HANDLING CONFIRMATION' && title !== 'CASH HANDLING' ? (
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

              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div>
          <div style={{ height: 520, width: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ flexGrow: 1, fontSize: '25px' }}>
                <DataGrid
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
