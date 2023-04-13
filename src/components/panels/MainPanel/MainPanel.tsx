import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  Div,
  Search,
  Cell,
  Separator,
  Spacing,
  Link,
  HorizontalScroll,
} from '@vkontakte/vkui';
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

const CATEGROIES = [
  { key: 'wardrobe', text: 'Гардероб', counter: 10, Icon: Icon28TshirtOutline },
  { key: 'child', text: 'Детские вещи', counter: 8, Icon: Icon28HorseToyOutline },
  { key: 'computer', text: 'Компьютерная техника', counter: 4, Icon: Icon28ComputerOutline },
  { key: 'electronics', text: 'Электроника', counter: 4, Icon: Icon28SmartphoneOutline },
  { key: 'transport', text: 'Транспорт', counter: 2, Icon: Icon28HomeOutline },
  { key: 'realty', text: 'Недвижимость', counter: 1, Icon: Icon28HomeOutline },
];

interface MainPanelProps extends CommonPanelProps {}

export function MainPanel(props: MainPanelProps) {
  const { id, onBack } = props;

  const { moves } = useAppContext();

  return (
    <Panel id={id} className="MainPanel">
      <PanelHeader separator={false}>VK Вещи</PanelHeader>
      <Search placeholder="Поиск вещи"></Search>

      <Group header={<Header mode="secondary">Категории вещей</Header>} mode="card">
        {CATEGROIES.map(({ key, text, counter, Icon }) => (
          <Cell key={key} before={<Icon />} indicator={counter} onClick={moves.openNotAvailable}>
            {text}
          </Cell>
        ))}

        <Spacing size={8} />
        <Separator />
        <Spacing size={8} />
        <Div>
          <Button stretched size="l" mode="tertiary" onClick={onBack} data-to="persik">
            Показать все
          </Button>
        </Div>
      </Group>
      <Group
        header={
          <Header mode="primary" aside={<Link>Показать все</Link>}>
            Мои вещи
          </Header>
        }
        mode="card"
        separator="hide"
      >
        <HorizontalScroll>
          <div style={{ display: 'flex' }}></div>
        </HorizontalScroll>
      </Group>
    </Panel>
  );
}
