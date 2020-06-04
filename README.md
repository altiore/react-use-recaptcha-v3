# react-use-recaptcha-v3

Integration [Google reCaptcha](https://developers.google.com/recaptcha/docs/v3) with [React hooks](https://reactjs.org/docs/hooks-intro.html).

# ![](https://www.gstatic.com/images/icons/material/product/2x/recaptcha_48dp.png) Google ReCaptcha V3 with React Hooks

## Installation

`npm install react-use-recaptcha-v3 --save`

## Usage

#### 1. Get your [site key for ReCaptcha V3](https://www.google.com/recaptcha/admin#v3signup)

#### 2. Implement [Back End side](https://developers.google.com/recaptcha/docs/verify)

#### 3. Use this package to send google re-captcha token to you Back End verifier

##### RECOMMENDED:
```js
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

```

##### @ALTERNATIVE with redux-form:
```js
const GReCaptchaReduxFormField = ({ input: { onChange } }) => {
  const siteKey = '[SET UP YOU SITE KEY HERE!!!]';
  const actionName = 'submit'; // you can change actionName here if you need

  useReCaptcha(siteKey, actionName, onChange);

  return null;
};
```
