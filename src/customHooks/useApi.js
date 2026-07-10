import React, { useState, useEffect } from "react";

export default function useApi( apiFunc ) {
  const reqProblem = React.useRef();
  const error = React.useRef( false );
  const data = React.useRef( [] );
  const loading = React.useRef( true );
  const statusCode = React.useRef( 200 );

  const request = async ( ...args ) => {
    loading.current = true;
    const response = await apiFunc( ...args );
    if ( !response.ok ) {
      data.current = response.data;
      reqProblem.current = response.problem;
      statusCode.current = response.status;
      return ( error.current = true );
    }
    data.current = response.data;
    error.current = false;
    reqProblem.current = response.problem;
    statusCode.current = response.status;
    loading.current = false;
  };

  return { data, error, request, loading, reqProblem, statusCode };
}
