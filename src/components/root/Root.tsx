import React, { useCallback, useMemo } from 'react';
import { useAppContext } from '../AppContext/useAppContext';
import { useLocation, useRouter } from '@happysanta/router';
import { ModalRoot, SplitCol, SplitLayout, View, Root as VKUIRoot } from '@vkontakte/vkui';
import { ModalId, PanelId, ViewId } from 'src/routing';
import { cutArrayTail } from 'src/tools/misc';
import { CommonModalProps } from 'src/types/common';
import { NotImplementedModal } from '../modals/NotImplementedModal/NotImplementedModal';
import { MainPanel } from '../panels/MainPanel/MainPanel';
import { OnboardPanel } from '../panels/Onboard/OnboardPanel';
import { CategoriesListPanel } from '../panels/CategoriesListPanel/CategoriesListPanel';
import { GoodsListPanel } from '../panels/GoodsListPanel/GoodsListPanel';
import { CreateGoodModal } from '../modals/CreateGoodModal/CreateGoodModal';
import { SingleGoodPanel } from '../panels/SingleGoodPanel/SingleGoodPanel';

const MODALS: {
  [key in ModalId]?:
    | [React.ComponentType<CommonModalProps>]
    | [React.ComponentType<CommonModalProps>, { settlingHeight?: number; dynamicContentHeight?: boolean }];
} = {
  [ModalId.NotAvailable]: [NotImplementedModal],
  [ModalId.CreateGood]: [CreateGoodModal],
};

interface RootProps {
  loading: boolean;
  error?: Error | null;
}

export function Root(props: RootProps) {
  const { moves } = useAppContext();
  const location = useLocation();
  const router = useRouter();

  console.log(router.history);

  /* Модалки */

  const activeModal = location.getModalId();
  const activeView = location.getViewId();

  const onCloseModal = useCallback(() => router.popPageIfModal(), [router]);

  const modalItems = useMemo(
    () =>
      Object.entries(MODALS).map(([id, [ModalComponent, options]]) => (
        <ModalComponent key={id} id={id} onClose={onCloseModal} {...options} />
      )),
    [onCloseModal],
  );

  const modal = (
    <ModalRoot activeModal={activeModal} onClose={onCloseModal}>
      {modalItems}
    </ModalRoot>
  );

  const getViewProps = (viewId: ViewId, fallbackActivePanel: PanelId) => {
    const history = location.getViewHistory(viewId);
    const cuttedTailHistory = cutArrayTail(history);
    const moveBackSteps = history.length - cuttedTailHistory.length + 1;

    console.log({ viewId: viewId, activePanel: location.getViewActivePanel(viewId) });

    return {
      id: viewId,
      /* Свайп бек идет на предыдущую страницу, отличную от текущей */
      onSwipeBack: () => router.popPageTo(-moveBackSteps),
      history: cuttedTailHistory,
      activePanel: location.getViewActivePanel(viewId) || fallbackActivePanel,
    };
  };

  const backHandler = () => {
    moves.moveBack();
  };

  return (
    <SplitLayout modal={modal}>
      <SplitCol animate>
        <VKUIRoot activeView={activeView}>
          <View {...getViewProps(ViewId.Main, PanelId.Main)}>
            <MainPanel id={PanelId.Main} />
            <CategoriesListPanel id={PanelId.CategoriesList} onBack={backHandler} />
            <GoodsListPanel id={PanelId.GoodsList} onBack={backHandler} />
            <SingleGoodPanel id={PanelId.SingleGood} onBack={backHandler} />
          </View>
          <View {...getViewProps(ViewId.Onboard, PanelId.Onboard)}>
            <OnboardPanel id={PanelId.Onboard} />
          </View>
        </VKUIRoot>
      </SplitCol>
    </SplitLayout>
  );
}
