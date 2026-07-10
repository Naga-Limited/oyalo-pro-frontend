import React from 'react';
import {Card, Image} from 'antd';
import {eqBy, map, prop, toUpper, unionWith} from 'ramda';

const ViewCard = ({data, column}) => {
  const viewData = [];

  map((e) => {
    Object.keys(data)
      // eslint-disable-next-line array-callback-return
      .map((key) => {
        if (e.field === key) viewData.push({headerName: e.headerName, value: data[key]});
      });
  }, column).filter((e) => e);

  const finalData = unionWith(eqBy(prop('headerName')), viewData, column);

  return (
    <Card className='view-data' style={{width: '100%'}}>
      {map((e) => {
        return (
          <div key={e?.headerName} className='flex flex-row view-container' style={{fontFamily: 'sans-serif', padding: '2px'}}>
            <div style={{width: '50%'}}>
              <div className='pb-2'> {toUpper(e?.headerName ?? 'No Data').replace('_', ' ')} </div>
            </div>
            <div style={{display: 'flex', direction: 'row'}}>
              <div style={{paddingRight: '8px'}}> : </div>
              <div className='view-value' style={{color: '#f5a60b', alignSelf: 'center', flexWrap: 'wrap', wordWrap: 'break-word', wordBreak: 'break-all'}}>
                <span className='3' style={{flexWrap: 'wrap'}}>
                  {e?.headerName === 'Employee Image' || e?.headerName ==='License Attachement' || e?.headerName ==='Video' || e?.headerName ==='Document' || e?.headerName ==='Image' || e?.headerName == 'Lean Image' || e?.headerName == 'Peak Image' || e?.headerName == 'Close Image' ? (
                     (e?.headerName === 'Employee Image' || e?.headerName === 'Image'  ?  <Image style={{paddingRight: '10px'}} width={100} src={e?.value ?? ''} /> : <iframe style={{paddingRight: '2px'}} width={100} height={100} src={e?.value ?? ''} /> )
                   
                  ) : !Array.isArray(e?.value) ? (
                    e?.value
                  ) : (
                    (e?.value ?? []).map((e, index) => {
                      return (
                        <div key={index} style={{paddingBottom: '5px'}}>
                          {e},
                        </div>
                      );
                    })
                  )}
                </span>
              </div>
            </div>
          </div>
        );
      }, finalData)}
    </Card>
  );
};

export default ViewCard;
