import { Div, Panel, PanelHeader, PanelHeaderBack, Search } from '@vkontakte/vkui';
import { Item } from 'src/components/atomic/Item/Item';
import { GOODS } from 'src/const';
import { CommonPanelProps } from 'src/types/common';
import './styles.scss';

export function GoodsListPanel(props: CommonPanelProps) {
  const { id, onBack } = props;
  return (
    <Panel id={id} className="GoodsListPanel">
      <PanelHeader separator={false} before={<PanelHeaderBack onClick={onBack} label="Назад" />}>
        Мои вещи
      </PanelHeader>
      <Search placeholder="Поиск вещи"></Search>
      <Div className="GoodsListPanel__list">
        {GOODS.map((good) => (
          <Item
            className="GoodsListPanel__item"
            key={`${good.name}_${good.category}`}
            src={good.src}
            header={good.name}
            top={good.category}
          />
        ))}
      </Div>
    </Panel>
  );
}
