import {
  Button,
  ButtonGroup,
  Div,
  FixedLayout,
  Group,
  Header,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Separator,
  Spacing,
  Subhead,
  Title,
} from '@vkontakte/vkui';
import { CommonPanelProps } from 'src/types/common';
import { useParams } from '@happysanta/router';
import './styles.scss';
import { useAppContext } from 'src/components/AppContext/useAppContext';

interface SingleGoodPanelProps extends CommonPanelProps {}

export function SingleGoodPanel(props: SingleGoodPanelProps) {
  const { id, onBack } = props;

  const { name, src, category } = useParams();

  const { moves } = useAppContext();

  return (
    <Panel id={id} className="SingleGoodPanel">
      <PanelHeader separator={false} before={<PanelHeaderBack onClick={onBack} label="Назад" />} />

      <img className="SingleGoodPanel__img" alt="" src={src} />
      <Group
        header={
          <Title level="2" style={{ paddingLeft: '8px' }}>
            {name}
          </Title>
        }
        description={<Subhead>{category}</Subhead>}
        mode="card"
        separator="hide"
      ></Group>
      <Spacing size={8} />
      <Div>
        <Group header={<Title level="3">О вещи</Title>} separator="hide">
          <Spacing size={8} />
          Какая-то дополнительная информация
          <br />
          1. Преимущество
          <br />
          2. Характеристика
        </Group>
      </Div>

      <FixedLayout filled vertical="bottom">
        <Div>
          <ButtonGroup align="center" mode="vertical" stretched>
            <Button mode="primary" size="l" stretched onClick={moves.openNotAvailable}>
              Отдать на благотворительность
            </Button>
            <Button mode="secondary" size="l" stretched onClick={moves.openNotAvailable}>
              Продать
            </Button>
          </ButtonGroup>
        </Div>
      </FixedLayout>
    </Panel>
  );
}
