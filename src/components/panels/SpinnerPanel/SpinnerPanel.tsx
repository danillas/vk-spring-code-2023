import { FixedLayout, Panel, Spinner, Group } from '@vkontakte/vkui';
import './styles.scss';

interface SpinnerPanelProps {
  id: string;
}

export function SpinnerPanel(props: SpinnerPanelProps) {
  const { id: panelId } = props;

  return (
    <Panel id={panelId} className="SpinnerPanel">
      {/* FixedLayout не позволяет двигать Spinner с помощью эластик-скролла на iOS */}
      <Group mode="plain" separator="hide" className="SpinnerPanel__group">
        <FixedLayout className="SpinnerPanel__layout">
          <Spinner size="large" />
        </FixedLayout>
      </Group>
    </Panel>
  );
}
