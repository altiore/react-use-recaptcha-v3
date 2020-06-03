# react-use-recaptcha-v3

Integration [Google reCaptcha](https://developers.google.com/recaptcha/docs/v3) with [React hooks](https://reactjs.org/docs/hooks-intro.html).

# ![](https://www.gstatic.com/images/icons/material/product/2x/recaptcha_48dp.png) Google ReCaptcha V3 with React Hooks

## Installation

`npm install react-use-recaptcha-v3 --save`

## Usage

#### 1. Get your [site key for ReCaptcha V3](https://www.google.com/recaptcha/admin#v3signup)

#### 2. Implement [Back End side](https://developers.google.com/recaptcha/docs/verify)

#### 3. Use this package to send google re-captcha token to you Back End verifier

##### simplest way:
```js
import React from 'react'
import { useReCaptcha } from 'react-use-recaptcha-v3';

const UncontrolledGoogleReCaptcha = () => {
  const siteKey = '[SET UP YOU SITE KEY HERE!!!]';
  const { token } = useReCaptcha(siteKey);

  return (
    <form>
      {/* other fields here */}
      {token ? <input name="g-recaptcha" value={token} /> : null}
    </form>
  );
};

```

##### recommended way:
```js
import React, { useState } from 'react';
import { useReCaptcha } from 'react-use-recaptcha-v3';

const ControlledGoogleReCaptcha = () => {
  const [token, setToken] = useState();

  const handleToken = (tokenFromGoogleResponse) => {
    console.log('fresh token is appear here, each time actionName is changed', { tokenFromGoogleResponse });
    setToken(tokenFromGoogleResponse);
  };

  const siteKey = '[SET UP YOU SITE KEY HERE!!!]';
  const actionName = 'submit'; // you can change actionName here if you need

  useReCaptcha(siteKey, handleToken, actionName);

  return (
    <form>
      {/* other fields here */}
      {token ? <input name="g-recaptcha" value={token} /> : null}
    </form>
  );
};
```
