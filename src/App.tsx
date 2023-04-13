import { useState, useEffect } from 'react';
import { UserInfo, VKBridge } from '@vkontakte/vk-bridge';
import {
  View,
  ScreenSpinner,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import { Home } from './panels/Home';
import { Persik } from './panels/Persik';
import { LaunchParams } from './tools/launchParams';
import { getPlatformByLaunchPlatform } from './tools/platform';

interface AppProps {
  bridge: VKBridge;
  launchParams: LaunchParams;
}

export function App(props: AppProps) {
  const { bridge, launchParams } = props;

  const [activePanel, setActivePanel] = useState('home');
  const [fetchedUser, setUser] = useState<UserInfo | undefined>(undefined);
  const [popout, setPopout] = useState<JSX.Element | null>(<ScreenSpinner size="large" />);

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, [bridge]);

  const onBack = () => {
    setActivePanel('home');
  };

  return (
    <ConfigProvider platform={getPlatformByLaunchPlatform(launchParams.platform)}>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout popout={popout}>
            <SplitCol>
              <View activePanel={activePanel}>
                <Home id="home" fetchedUser={fetchedUser} onBack={onBack} />
                <Persik id="persik" onBack={onBack} />
              </View>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
}
