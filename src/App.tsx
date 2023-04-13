import { VKBridge } from '@vkontakte/vk-bridge';
import { AdaptivityProvider, AppRoot, ConfigProvider } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { LaunchParams } from './tools/launchParams';
import { getPlatformByLaunchPlatform } from './tools/platform';
import { AppContainer } from './components/container/AppContainer';

interface AppProps {
  bridge: VKBridge;
  launchParams: LaunchParams;
}

export function App(props: AppProps) {
  const { bridge, launchParams } = props;

  return (
    <ConfigProvider platform={getPlatformByLaunchPlatform(launchParams.platform)}>
      <AdaptivityProvider>
        <AppRoot>
          <AppContainer bridge={bridge} launchParams={launchParams} />
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
}
