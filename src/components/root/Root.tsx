import React, { useCallback, useMemo } from 'react';
import { useAppContext } from '../AppContext/useAppContext';
import { useLocation, useRouter } from '@happysanta/router';
import { useForcedRoute } from 'src/hooks/useForcedRoute';
import { ModalRoot, SplitCol, SplitLayout, View, Root as VKUIRoot } from '@vkontakte/vkui';
import { ModalId, PanelId, ViewId } from 'src/routing';
import { cutArrayTail } from 'src/tools/misc';
import { CommonModalProps } from 'src/types/common';
import { NotImplementedModal } from '../modals/NotImplementedModal/NotImplementedModal';
import { Home } from '../panels/Home';
import { OnboardPanel } from '../panels/Onboard/OnboardPanel';

const MODALS: {
  [key in ModalId]?:
    | [React.ComponentType<CommonModalProps>]
    | [React.ComponentType<CommonModalProps>, { settlingHeight?: number; dynamicContentHeight?: boolean }];
} = {
  [ModalId.NotAvailable]: [NotImplementedModal],
};

export function Root() {
  const { moves } = useAppContext();
  const location = useLocation();
  const router = useRouter();

  const { viewId, modalId } = useForcedRoute();

  /* Модалки */

  const activeModal = modalId && modalId in MODALS ? modalId : null;
  const activeView = viewId;
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

    return {
      id: viewId,
      /* Свайп бек идет на предыдущую страницу, отличную от текущей */
      onSwipeBack: () => router.popPageTo(-moveBackSteps),
      history: cuttedTailHistory,
      activePanel: location.getViewActivePanel(viewId) || fallbackActivePanel,
    };
  };

  const backHandler = moves.moveBack;

  return (
    <SplitLayout modal={modal}>
      <SplitCol animate>
        <VKUIRoot activeView={activeView}>
          <View {...getViewProps(ViewId.Main, PanelId.Main)}>
            <Home id={PanelId.Main} />
          </View>
          <View {...getViewProps(ViewId.Onboard, PanelId.Onboard)}>
            <OnboardPanel id={PanelId.Onboard} onBack={backHandler} />
          </View>
        </VKUIRoot>
      </SplitCol>
    </SplitLayout>
  );
}
