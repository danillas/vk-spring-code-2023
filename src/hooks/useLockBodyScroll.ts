import { isIOS, isScrollBasedViewport } from '@vkontakte/vkjs';
import { useLayoutEffect } from 'react';

/**
 * Названия body-аттрибутов, блокирующих скролл страницы.
 * Реализация обработки аттрибутов находится в файле  src/style/main.scss
 *
 * useScrollLock из vkui нам не подошёл. Не везде блокирует скролл. Сделан для блокирования скролла под модалкой
 */
const LOCK_BODY_SCROLL_ATTRIBUTE = 'lock-scroll';
const LOCK_BODY_SCROLL_OLD_IOS_ATTRIBUTE = 'lock-scroll-old-ios';

let stack = 0;

export function useLockBodyScroll(locked: boolean) {
  useLayoutEffect(() => {
    if (!locked) {
      return;
    }

    stack += 1;
    document.body.setAttribute(LOCK_BODY_SCROLL_ATTRIBUTE, '');
    isIOS && isScrollBasedViewport && document.body.setAttribute(LOCK_BODY_SCROLL_OLD_IOS_ATTRIBUTE, '');

    return () => {
      stack -= 1;
      if (stack === 0) {
        document.body.removeAttribute(LOCK_BODY_SCROLL_ATTRIBUTE);
        isIOS && isScrollBasedViewport && document.body.removeAttribute(LOCK_BODY_SCROLL_OLD_IOS_ATTRIBUTE);
      }
    };
  }, [locked]);
}
