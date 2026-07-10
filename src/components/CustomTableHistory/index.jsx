import React from 'react';
import {Card, Modal} from 'antd';
import Container from 'react-bootstrap/Container';
import { Stack, Tooltip} from '@mui/material';
import Button from 'react-bootstrap/Button';
import {DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton} from '@mui/x-data-grid';
import {FaEye, FaUserEdit} from 'react-icons/fa';
import ViewCard from '../viewCard/ViewCard';
import {useNavigate} from 'react-router';
import CustomPagination from './customPagination';

const customHeaderDesign = {
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#51524e',
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

export default function CustomTable({dataSource, column,  title, loading = false, handleEditClick, handleViewClick}) {
  const data = (dataSource ?? []).map((data, index) => {
    return {'S.No': index + 1, id: index + 1, ...data, status: Number(data.status) ? 'Active' : 'In Active'};
  });

  const navigate = useNavigate();
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
          } else if (title !== 'Approval List') {
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
            {title !== 'Role Master' && title !== 'Audit Report' && title !== 'CAPA Submission List' && title !== 'Approval List' && title !== 'License Report'&& title !== 'Audit Entry List' && title !== 'Audit Outlet CAPA List' && title !== 'Audit Outlet Approval List' && title !== 'Audit Department CAPA' && title !== 'Audit 2.0 Report' && title!== 'Customer Call Back History List'? (
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

  return (
    <Container style={{width: '100%'}}>
      {/* title={<h3>{title}</h3>} */}
      <Card style={{height: '100%'}} bordered={true}>
        <div>
          <div style={{flexGrow: 1,height: 520, width: '100%'}}>
            <div style={{display: 'flex', height: '100%'}}>
              <div style={{flexGrow: 1, fontSize: '25px'}}>
                <DataGrid
                  density='compact'
                  loading={loading}
                  columns={columns}
                  rows={data}
                  //hideFooterSelectedRowCount   
                   autoPageSize
                  disableExtendRowFullWidth  
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
