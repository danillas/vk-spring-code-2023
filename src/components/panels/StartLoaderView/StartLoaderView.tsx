import { View } from '@vkontakte/vkui';
import { SpinnerPanel } from '../SpinnerPanel/SpinnerPanel';
import './styles.scss';

const SINGLE_PANEL_ID = 'app-loading';

export function StartLoaderView() {
  return (
    <View activePanel={SINGLE_PANEL_ID}>
      <SpinnerPanel id={SINGLE_PANEL_ID} />
    </View>
  );
}
