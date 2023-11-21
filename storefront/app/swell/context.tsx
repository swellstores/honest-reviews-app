import { useState, useEffect } from 'react';
import { swell, SwellContext, APP_ID } from './index';

export function useAccount() {
  const [account, setAccount] = useState<any>(null);
  const [accountReady, setAccountReady] = useState(false);

  useEffect(() => {
    swell.account.get().then((account) => {
      setAccount(account);
      setAccountReady(true);
    });
  }, []);

  return { account, accountReady, setAccount };
}

export function useSwellSettings() {
  const [swellSettings, setSwellSettings] = useState<any>(null);
  const [swellSettingsReady, setSwellSettingsReady] = useState(false);

  useEffect(() => {
    swell.settings.get().then((swellSettings) => {
      setSwellSettings(swellSettings);
      setSwellSettingsReady(true);
    });
  }, []);

  return {
    swellSettings,
    swellSettingsReady,
  };
}

export function useAppSettings() {
  const [appSettings, setAppSettings] = useState<any>(null);
  const [appSettingsReady, setAppSettingsReady] = useState(false);

  useEffect(() => {
    swell.get(`/settings/${APP_ID}`).then((appSettings) => {
      setAppSettings(appSettings);
      setAppSettingsReady(true);
    });
  }, []);

  return {
    appSettings,
    appSettingsReady,
  };
}

export function SwellProvider({ children }: { children: any }) {
  const { account, accountReady, setAccount } = useAccount();
  const { swellSettings, swellSettingsReady } = useSwellSettings();
  const { appSettings, appSettingsReady } = useAppSettings();
  return (
    <SwellContext.Provider
      value={{
        account,
        accountReady,
        setAccount,
        swellSettings,
        swellSettingsReady,
        appSettings,
        appSettingsReady,
      }}
    >
      {children}
    </SwellContext.Provider>
  );
}
