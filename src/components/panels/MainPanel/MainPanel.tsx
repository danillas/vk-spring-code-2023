import { Panel, PanelHeader, Header, Button, Group, Div, Search, Cell, Separator, Spacing } from '@vkontakte/vkui';
import { CommonPanelProps } from 'src/types/common';
import {
  Icon28TshirtOutline,
  Icon28ComputerOutline,
  Icon28SmartphoneOutline,
  Icon28CarOutline,
  Icon28HomeOutline,
  Icon28HorseToyOutline,
} from '@vkontakte/icons';
import './styles.scss';
import { useAppContext } from 'src/components/AppContext/useAppContext';

interface MainPanelProps extends CommonPanelProps {}

export function MainPanel(props: MainPanelProps) {
  const { id, onBack } = props;

  const { moves } = useAppContext();

  return (
    <Panel id={id} className="MainPanel">
      <PanelHeader separator={false}>VK Вещи</PanelHeader>
      <Search placeholder="Поиск вещи"></Search>

      <Group header={<Header mode="secondary">Категории вещей</Header>} mode="card">
        <Cell before={<Icon28TshirtOutline />} indicator="10">
          Гардероб
        </Cell>
        <Cell before={<Icon28HorseToyOutline />} indicator="8">
          Детские вещи
        </Cell>
        <Cell before={<Icon28ComputerOutline />} indicator="4">
          Компьютерная техника
        </Cell>
        <Cell before={<Icon28SmartphoneOutline />} indicator="2">
          Электроника
        </Cell>
        <Cell before={<Icon28CarOutline />} indicator="6">
          Транспорт
        </Cell>
        <Cell before={<Icon28HomeOutline />} indicator="1">
          Недвижимость
        </Cell>
        <Spacing size={8} />
        <Separator />
        <Spacing size={8} />
        <Div>
          <Button stretched size="l" mode="tertiary" onClick={onBack} data-to="persik">
            Показать все
          </Button>
        </Div>
      </Group>
    </Panel>
  );
}
