import { Page, Router } from '@happysanta/router';
import { USE_DESKTOP_SAFARI_BACK_BUG } from '@happysanta/router/dist/lib/entities/HotFixers';

export enum ViewId {
  Main = 'main',
  Onboard = 'onboard',
}

export enum PageId {
  Main = '/',
  Onboard = '/onboard',
  CategoriesList = '/categories_list',
  GoodsList = '/goods_list',
}

export enum PanelId {
  Main = 'main',
  Onboard = 'onboard',
  CategoriesList = 'categories_list',
  GoodsList = 'goods_list',
}

export enum ModalId {
  NotAvailable = 'not_available',
  CreateGood = 'create',
}

export enum PopoutId {}

const routes: Record<PageId, Page> = {
  [PageId.Main]: new Page(PanelId.Main, ViewId.Main),
  [PageId.CategoriesList]: new Page(PanelId.CategoriesList, ViewId.Main),
  [PageId.GoodsList]: new Page(PanelId.GoodsList, ViewId.Main),
  [PageId.Onboard]: new Page(PanelId.Onboard, ViewId.Onboard),
};

interface CreateAppRouterOptions {
  enableLogging?: boolean;
  fixDesktopSafariBug?: boolean;
}

export function createAppRouter(options: CreateAppRouterOptions) {
  const { enableLogging, fixDesktopSafariBug } = options;

  return new Router(routes, {
    enableLogging,
    noSlash: true,
    hotFixes: fixDesktopSafariBug ? [USE_DESKTOP_SAFARI_BACK_BUG] : [],
  });
}
