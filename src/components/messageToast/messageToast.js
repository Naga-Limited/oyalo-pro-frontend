import { notification } from 'antd';

const messageToast = ( { message, status, title } ) => {
  if ( message ) {
    let fnToCall = null;
    switch ( status ) {
      case 200:
        fnToCall = notification.success;
        break;
      case 400:
        fnToCall = notification.error;
        break;
      default:
        fnToCall = notification.success;
        break;
    }
    if ( fnToCall )
      fnToCall( {
        message: title,
        description: message
      } );
  }
};

export default messageToast;
