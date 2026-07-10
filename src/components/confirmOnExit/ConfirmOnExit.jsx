import React from 'react';
import {Modal} from 'antd';
import {useCallbackPrompt} from '../../customHooks/useCallbackPrompt';

const ConfirmOnExit = ({showModel}) => {
  const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(showModel);
  return (
    <Modal
      open={showPrompt}
      width='40%'
      onOk={confirmNavigation}
      okButtonProps={{danger: 'danger'}}
      onCancel={cancelNavigation}
      title={<span className='text-2xl text-red-600'>Quit Editing?</span>}>
      <div className='text-lg text-gray-600'>Changes you made so far will not be saved!</div>
    </Modal>
  );
};
export default ConfirmOnExit;
