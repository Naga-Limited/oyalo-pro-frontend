import * as React from 'react';
import history from '../@app/history';


export function useBlocker( blocker, when = true ) {

  React.useEffect( () => {
    if ( !when ) return;

    const unblock = history?.block( ( tx ) => {

      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };

      blocker( autoUnblockingTx );
    } );

    return unblock;
  }, [blocker, when] );
}