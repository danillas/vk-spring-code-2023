import { createContext } from 'react';
import { RouterMoves } from '../../routing';
import { LaunchParams } from '../../tools/launchParams';
import { VKStorage } from 'src/tools/vkStorage';
import { VKApi } from '../../lib/vkapi/vkapi';

export interface AppContext {
  vkApi: VKApi;
  vkStorage: VKStorage;
  launchParams: LaunchParams;
  moves: RouterMoves;
}

// Понимаем, что AppContext.Provider расположен в самом верху иерархии,
// и контекст будет содержать корректное значение
export default createContext<AppContext>({} as AppContext);
