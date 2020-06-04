import React from 'react';
import { useReCaptcha } from 'react-use-recaptcha-v3';

/**
 * @RECOMMENDED
 */
const ControlledGoogleReCaptcha = () => {
  const siteKey = '[SET UP YOU SITE KEY HERE!!!]';
  const actionName = 'submit'; // you can change actionName here if you need

  const { execute } = useReCaptcha(siteKey, actionName);

  const submitForm = async () => {
    const token = await execute();
    // submit you form with token
  };

  return <form>[ANY FORM HERE]</form>;
};

/**
 * @ALTERNATIVE with redux-form
 */
const GReCaptchaReduxFormField = ({ input: { onChange } }) => {
  const siteKey = '[SET UP YOU SITE KEY HERE!!!]';
  const actionName = 'submit'; // you can change actionName here if you need

  useReCaptcha(siteKey, actionName, onChange);

  return null;
};
