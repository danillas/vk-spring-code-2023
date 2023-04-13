import { PageParams, Router } from '@happysanta/router';
import { PageId } from './index';
import { ModalId, PopoutId, ViewId } from './router';
import { getMaxTailRepeatLength } from './helpers';

interface CreateRouterMovesOptions {
  router: Router;
}

export const createRouterMoves = (options: CreateRouterMovesOptions) => {
  const { router } = options;

  const moves = {
    router,
    openExternalUrl: (url: string, newTab: boolean) => {
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('target', newTab ? '_blank' : '_parent');
      link.click();
    },

    moveTo: (page: PageId, params?: PageParams) => {
      router.pushPage(page, params);
    },

    moveBack: () => {
      if (router.getCurrentLocation().isFirstPage()) {
        router.replacePage(PageId.Main);
      } else {
        router.popPage();
      }
    },

    moveBackTo: (pageId: PageId) => {
      if (router.history.getPageOffset(pageId) === 0) {
        moves.resetTo(pageId);
      } else {
        router.popPageTo(pageId);
      }
    },

    /* Перенаправляет на pageId, очищая history и делая ее первой страницей */
    resetTo: (pageId: PageId, params?: PageParams) => {
      const currentIndex = router.history.getCurrentIndex();

      router.popPageToAndReplace(-currentIndex, pageId, params);
    },

    resetToMainPanel: () => {
      moves.resetTo(PageId.Main);
    },

    replaceMainPanel: () => {
      router.replacePage(PageId.Main);
    },

    moveBackFromPanel: (pageId: PageId, fallbackPageId: PageId) => {
      const currentIndex = router.history.getCurrentIndex();

      if (currentIndex === 0) {
        moves.resetTo(fallbackPageId);
      } else {
        router.popPageTo(router.history.getPageOffset(pageId) - 1);
      }
    },

    openNotAvailable: () => {
      router.pushModal(ModalId.NotAvailable);
    },

    smartPushPage: (pageId: string, params?: PageParams) => {
      const history = router.history
        .getHistoryFromStartToCurrent()
        .map(([route]) => route.pageId)
        .concat(pageId);

      const repeatLength = getMaxTailRepeatLength(history);

      if (repeatLength === 1) {
        // пытаются запушить тот же роут еще раз, ничего не делаем
      } else if (repeatLength > 0) {
        // есть повторяющийся роут-паттерн, схлопываем его
        router.popPageTo(1 - repeatLength);
      } else {
        router.pushPage(pageId, params);
      }
    },

    mobileTabs: {
      openCards: () => {
        moves.moveBackTo(PageId.Main);
      },
      openIncomingLikes: () => {
        moves.smartPushPage(PageId.Main); /** TODO check  */
      },
      openChats: () => {
        moves.smartPushPage(PageId.Main); /** TODO check */
      },
    },
  };

  return moves;
};

export type RouterMoves = ReturnType<typeof createRouterMoves>;
