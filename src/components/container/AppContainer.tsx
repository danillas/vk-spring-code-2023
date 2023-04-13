import React from 'react';
import { VKBridge } from '@vkontakte/vk-bridge';
import { initVKStorage } from 'src/tools/vkStorage';
import { createAppRouter, createRouterMoves } from 'src/routing';
import { RouterContext } from '@happysanta/router';
import AppContext from '../AppContext/appContext';
import { LaunchParams } from 'src/tools';
import { VKApi } from '../../lib/vkapi/vkapi';
import { Root } from '../root/Root';

interface AppContainerProps {
  bridge: VKBridge;
  launchParams: LaunchParams;
}

export class AppContainer extends React.Component<AppContainerProps> {
  private readonly vkStorage = initVKStorage(this.props.bridge);

  private readonly router = createAppRouter({
    enableLogging: false,
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
          <Root />
        </AppContext.Provider>
      </RouterContext.Provider>
    );
  }
}
