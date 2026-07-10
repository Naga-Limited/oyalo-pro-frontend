import React from 'react';
import {AiOutlineCopyright} from 'react-icons/ai';

export default function Footer() {
  return (
    <div
      style={{
        backgroundColor: 'black',
        position: 'static',
        height: '5%',
        color: 'white'
      }}>
      <div>
        <AiOutlineCopyright color='#fff' />
        <span style={{paddingLeft: '3px', paddingTop: '3px'}}> @2024 Naga Limited</span>
      </div>
    </div>
  );
}
