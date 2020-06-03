import React, { useState } from 'react';
import { useReCaptcha } from 'react-use-recaptcha-v3';

const UncontrolledGoogleReCaptcha = () => {
  const siteKey = '[SET UP YOU SITE KEY HERE!!!]';
  const { token } = useReCaptcha(siteKey);

  return (
    token ? <input name="g-recaptcha" value={token} /> : null
  );
};

/**
 * @RECOMMENDED
 */
const ControlledGoogleReCaptcha = () => {
  const [myToken, setMyToken] = useState();

  const handleToken = (token) => {
    console.log('fresh token is appear here, each time actionName is changed', { token });
    setMyToken(token);
  };

  const siteKey = '[SET UP YOU SITE KEY HERE!!!]';
  const actionName = 'submit'; // you can change actionName here if you need

  useReCaptcha(siteKey, handleToken, actionName);

  return (
    myToken ? <input name="g-recaptcha" value={myToken} /> : null
  );
};
