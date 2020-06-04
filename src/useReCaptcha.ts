import { useCallback, useEffect, useState } from 'react'

const SCRIPT_ID = 'g-recaptcha-script';

const checkIsReady = () => window && (window as any).grecaptcha && typeof (window as any).grecaptcha.execute !== 'undefined';

let interval: number | null = null;

export const useReCaptcha = (siteKey: string, actionName: string = 'submit', verifyCallback?: (token: string) => any,  throwError: boolean = true): { execute: Promise<string>; isReady: boolean; } => {
  const [isReady, setIsReady] = useState(false);

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

  const execute = useCallback(async () => {
    if (isReady) {
      return (window as any).grecaptcha.execute(siteKey, { action: actionName });
    } else {
      throw new Error('You trying to execute grecaptcha.execute before script initialize');
    }
  }, [actionName, isReady, siteKey]);

  useEffect(() => {
    if (typeof actionName !== 'string') {
      throw new Error('actionName MUST be a string [a-z_]')
    }
    if (isReady && verifyCallback) {
      (async function() {
        try {
          const resToken = await execute();
          verifyCallback(resToken);
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, [actionName, execute, isReady, verifyCallback])

  return { execute, isReady };
}
