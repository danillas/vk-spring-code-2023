import React from 'react';
import { VKBridge } from '@vkontakte/vk-bridge';
import { initVKStorage } from 'src/tools/vkStorage';
import { PageId, createAppRouter, createRouterMoves } from 'src/routing';
import { RouterContext } from '@happysanta/router';
import AppContext from '../AppContext/appContext';
import { LaunchParams } from 'src/tools';
import { VKApi } from '../../lib/vkapi/vkapi';
import { Root } from '../root/Root';

interface AppContainerProps {
  bridge: VKBridge;
  launchParams: LaunchParams;
}

interface AppContainerState {
  loading: boolean;
  error: Error | null;
}

export class AppContainer extends React.Component<AppContainerProps, AppContainerState> {
  readonly state: Readonly<AppContainerState> = {
    loading: true,
    error: null,
  };
  private readonly vkStorage = initVKStorage(this.props.bridge);

  private readonly router = createAppRouter({
    enableLogging: true,
  });

  private readonly routerMoves = createRouterMoves({
    router: this.router,
  });

  private readonly vkApi = new VKApi(
    this.props.launchParams.appId,
    '5.130',
    this.props.launchParams.language,
    'https://api.vk.com/method',
    this.props.bridge,
  );

  componentDidMount() {
    this.router.start();

    this.initApp();
  }

  initApp = async () => {
    this.setState({ loading: true, error: null });

    try {
      await this.vkStorage.sync().then((resp) => {
        if (resp.onboardEnabled) {
          this.router.replacePage(PageId.Onboard);
        }
        console.log('[VKStorage] Sync success', resp);
      });
    } catch (error) {
      this.setState({ error: error as Error | null, loading: false });

      throw new Error('VKStorage load failed');
    }
  };

  render() {
    return (
      <RouterContext.Provider value={this.router}>
        <AppContext.Provider
          value={{
            vkApi: this.vkApi,
            vkStorage: this.vkStorage,
            launchParams: this.props.launchParams,
            moves: this.routerMoves,
          }}
        >
          <Root loading={this.state.loading} />
        </AppContext.Provider>
      </RouterContext.Provider>
    );
  }
}
