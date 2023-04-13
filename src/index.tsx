import React from 'react';
import ReactDOM from 'react-dom';
import bridge from '@vkontakte/vk-bridge';
import { App } from './App';
import { waitForUpdateConfig, delay, Taptic, getLaunchParams } from './tools';

/* Параметры запуска */

const launchParams = getLaunchParams({
  query: window.location.search,
});

Taptic.init(bridge);

(function main() {
  bridge.send('VKWebAppInit');

  Promise.all([
    Promise.race([bridge.send('VKWebAppGetConfig').catch(() => delay(1500)), waitForUpdateConfig(bridge)]),

    // Всегда резолвится успехом, проверено логированием в сентри, но на всякий случай делаем  catch
    bridge.send('VKWebAppGetClientVersion').catch(() => ({ platform: 'mobile-web', version: '0.0' })),
  ]).then(() => {
    ReactDOM.render(
      <React.StrictMode>
        <App bridge={bridge} launchParams={launchParams} />
      </React.StrictMode>,
      document.getElementById('root'),
    );
  });
})();
