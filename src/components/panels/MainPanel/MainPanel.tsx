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
  FixedLayout,
} from '@vkontakte/vkui';
import { CommonPanelProps } from 'src/types/common';
import { useAppContext } from 'src/components/AppContext/useAppContext';
import { CATEGROIES, GOODS } from 'src/const';
import './styles.scss';

interface MainPanelProps extends CommonPanelProps {}

export function MainPanel(props: MainPanelProps) {
  const { id } = props;

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
          <Header mode="primary" aside={<Link onClick={moves.moveGoodsList}>Показать все</Link>}>
            Мои вещи
          </Header>
        }
        mode="card"
        separator="hide"
      >
        <HorizontalScroll>
          <div style={{ display: 'flex' }}>
            {GOODS.map((good) => (
              <HorizontalCell key={good.src} size="l">
                <Image size={135} borderRadius="m" src={good.src} onClick={() => moves.moveSingleGood({ ...good })} />
              </HorizontalCell>
            ))}
          </div>
        </HorizontalScroll>
      </Group>
      <Spacing size={70} />
      <FixedLayout vertical="bottom">
        <Div>
          <Button size="l" stretched onClick={moves.openNotAvailable}>
            Добавить Вещь
          </Button>
        </Div>
      </FixedLayout>
    </Panel>
  );
}
