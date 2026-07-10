import React from 'react';
import { Image } from "antd";
import { isEmpty } from "ramda";
//import { Player } from "video-react";
export const column = [
  { key: '1', headerName: 'S.No', field: 'S.No', hide: false, width: 80 },
  { key: '2', headerName: 'Category', field: 'auditcategory_name', hide: false, width: 200 },
  { key: '3', headerName: 'Audit Sub Category', field: 'auditsubcategory_name', hide: false, width: 200 },
  { key: '4', headerName: 'Audit Point', field: 'auditpoint_name', hide: false, width: 400 },
  { key: '5', headerName: 'Image', field: 'image', hide: false, width: 180, renderCell: ( params ) => (
  <Image style={{ paddingLeft: "10px" }} width={50} src={params?.row?.image ?? ''} /> 
  )}, 
  // { key: '6', headerName: 'Video', field: 'video', hide: false, width: 400 },
  { key: '6', headerName: 'Video', field: 'video', hide: false, width: 180, renderCell: ( params ) => (
    !isEmpty( params?.row?.video ) ? <video
    className="VideoInput_video"
    width="50px"
    height={'100px'}
    controls
    src={params?.row?.video}
  /> : 'No Video'
    )}, 
  { key: '7', headerName: 'Status', field: 'status', hide: false, width: 100 },
];
