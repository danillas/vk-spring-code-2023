import { Button, Cell, FixedLayout, Group, Panel, PanelHeader, PanelHeaderBack, Search, Div } from '@vkontakte/vkui';
import React, { useEffect, useState } from 'react';
import { useAppContext } from 'src/components/AppContext/useAppContext';
import { CATEGROIES } from 'src/const';
import { useLockBodyScroll } from 'src/hooks/useLockBodyScroll';
import { CommonPanelProps } from 'src/types/common';

export function CategoriesListPanel(props: CommonPanelProps) {
  const { id, onBack } = props;
  const { moves } = useAppContext();
  const [categoriesList, updateCategoriesList] = useState(CATEGROIES);
  const [isDragging, setIsDraggin] = useState(false);

  const reorderList = (
    { from, to }: { from: number; to: number },
    list: typeof CATEGROIES,
    updateListFn: typeof updateCategoriesList,
  ) => {
    const _list = [...list];
    _list.splice(from, 1);
    _list.splice(to, 0, list[from]);
    updateListFn(_list);
  };

  useLockBodyScroll(isDragging);

  return (
    <Panel id={id}>
      <PanelHeader separator={false} before={<PanelHeaderBack onClick={onBack} label="Назад" />}>
        Категории
      </PanelHeader>
      <Search placeholder="Поиск категории"></Search>
      <Group>
        {categoriesList.map(({ key, text, Icon, counter }) => (
          <Cell
            draggable
            key={key}
            before={<Icon />}
            indicator={counter}
            onDrag={() => setIsDraggin(true)}
            onDragFinish={({ from, to }) => {
              reorderList({ from, to }, categoriesList, updateCategoriesList);
              setIsDraggin(false);
            }}
          >
            {text}
          </Cell>
        ))}
      </Group>
      <FixedLayout vertical="bottom">
        <Div>
          <Button size="l" stretched onClick={moves.openNotAvailable}>
            Добавить категорию
          </Button>
        </Div>
      </FixedLayout>
    </Panel>
  );
}
