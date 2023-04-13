import { useLocation } from '@happysanta/router';
import { ModalId, ViewId } from 'src/routing';
import { useAppContext } from 'src/components/AppContext/useAppContext';

/** Возвращает активныe ViewId ModalId PopoutId с учётом форс-вьюх */
export function useForcedRoute() {
  const { vkStorage } = useAppContext();
  const location = useLocation();

  const onboardEnabled = vkStorage.get('onboardEnabled');
  const modalId = location.getModalId() as ModalId | null;

  // const modalId = forced ? null : (location.getModalId() as ModalId);
  // const popoutId = forced ? null : (location.getPopupId() as PopoutId);

  console.log({ viewId: onboardEnabled ? ViewId.Onboard : (location.getViewId() as ViewId), modalId });

  return {
    viewId: onboardEnabled ? ViewId.Onboard : (location.getViewId() as ViewId),
    modalId,
  };
}
