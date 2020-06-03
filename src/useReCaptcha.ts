import { useCallback, useEffect, useState } from 'react'

const SCRIPT_ID = 'g-recaptcha-script';

const checkIsReady = () => window && (window as any).grecaptcha && typeof (window as any).grecaptcha.execute !== 'undefined';

let interval: number | null = null;

export const useReCaptcha = (siteKey: string, verifyCallback?: (token: string) => any, actionName: string = 'submit', throwError: boolean = true) => {
  const [isReady, setIsReady] = useState(false);

  const [token, setToken] = useState();

  const testIsReady = useCallback(() => {
    setIsReady(() => {
      if (checkIsReady()) {
        if (interval) {
          clearInterval(interval);
        }
        return true
      }

      return false
    })
  }, [setIsReady]);

  useEffect(() => {
    if (typeof siteKey !== 'string') {
      if (throwError) {
        throw new Error('siteKey MUST be valid google reCaptcha siteKey. @see https://developers.google.com/recaptcha/docs/v3')
      } else {
        return;
      }
    }
    // 1. try to find existing script
    const existingScript = document.getElementById(SCRIPT_ID);
    if (!existingScript) {
      // 2. add the script to the dome if not exists
      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.type = 'text/javascript';
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
      document.body.appendChild(script);
    }
    interval = setInterval(testIsReady, 1000) as any;
    return () => {
      if (interval) {
        clearInterval(interval)
      }
      const el = document.getElementById(SCRIPT_ID);
      if (el && el.remove) {
        el.remove()
      }
    }
  }, [siteKey, testIsReady]);

  useEffect(() => {
    if (typeof actionName !== 'string') {
      throw new Error('actionName MUST be a string [a-z_]')
    }
    if (typeof verifyCallback !== 'function') {
      throw new Error('verifyCallback MUST be valid callback function (token) {}')
    }
    if (isReady) {
      (window as any).grecaptcha.execute(siteKey, { action: actionName })
        .then(verifyCallback || setToken);
    }
  }, [actionName, isReady, setToken, siteKey, verifyCallback])

  return { token, isReady };
}
