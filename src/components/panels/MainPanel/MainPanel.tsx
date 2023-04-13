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
  Image,
  HorizontalCell,
} from '@vkontakte/vkui';
import { CommonPanelProps } from 'src/types/common';
import { useAppContext } from 'src/components/AppContext/useAppContext';
import { CATEGROIES, IMAGES_SRCS } from 'src/const';
import './styles.scss';

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
          <Button stretched size="l" mode="tertiary" onClick={moves.moveCategoriesList}>
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
          <div style={{ display: 'flex' }}>
            {IMAGES_SRCS.map((src) => (
              <HorizontalCell key={src} size="l">
                <Image size={135} borderRadius="m" src={src} />
              </HorizontalCell>
            ))}
          </div>
        </HorizontalScroll>
      </Group>
    </Panel>
  );
}
