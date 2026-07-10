import React from "react";
import { Image } from "antd";
import { isEmpty } from "ramda";
//import { Player } from "video-react";
import {FaFilePdf} from 'react-icons/fa';
export const column = [
  { key: "1", headerName: "S.No", field: "S.No", hide: false, width: 50 },
  {
    key: "2",
    headerName: "Category",
    field: "type_name",
    hide: false,
    width: 250
  },
  {
    key: "3",
    headerName: "Description",
    field: "description",
    hide: false,
    width: 200
  },
  {
    key: "4",
    headerName: "Image",
    field: "file_name",
    hide: false,
    width: 180,
    renderCell: (params) => (
      <Image
        style={{ paddingLeft: "10px" }}
        width={50}
        src={params?.row?.file_name ?? ""}
        alt="No Image"
      />
    )
  },
  {
    key: "5",
    headerName: "Video",
    field: "video",
    hide: false,
    width: 180,
    renderCell: (params) =>
      !isEmpty(params?.row?.video) ? (
        <iframe
          className="VideoInput_video"
          alt="No Video"
          width="50px"
          height={"100px"}
          src={params?.row?.video}
        />
      ) : (
        "No Video"
      )
  },
  // {
  //   key: "6",
  //   headerName: "Document",
  //   field: "file_doc",
  //   hide: false,
  //   width: 180,
  //   renderCell: (params) =>
  //     !isEmpty(params?.row?.file_doc) ? (
  //       <iframe
  //         style={{ padding: "12px", border: "2px" }}
  //         width={150}
  //         height={150}
  //         allowfullscreen="allowfullscreen"
  //         // controls
  //         alt="No Document"
  //         src={params?.row?.file_doc}
  //       ></iframe>
  //     ) : (
  //       "No Doc"
  //     )
  // },
  {
    key: "6",
    headerName: "Document",
    field: "file_doc",
    hide: false,
    width: 180,
    renderCell: (params) =>
      !isEmpty(params?.row?.document) ? (
       <a href={params?.row?.document} target="_blank"  rel="noopener noreferrer"><FaFilePdf size={27}/></a>
      ) : (
        "No Doc"
      )
  },

  { key: "7", headerName: "Status", field: "status", hide: false, width: 300 }
];
