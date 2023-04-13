import React, { useCallback } from 'react';
import { ReactComponent as Logo } from '../../../assets/logo.svg';
import { Button, Cell, Div, FixedLayout, Panel, Placeholder } from '@vkontakte/vkui';
import { CommonPanelProps } from 'src/types/common';
import { Icon28CoinsOutline, Icon28WalletOutline, Icon28StatisticsOutline } from '@vkontakte/icons';
import { useAppContext } from 'src/components/AppContext/useAppContext';
import './styles.scss';

export function OnboardPanel(props: CommonPanelProps) {
  const { id } = props;

  const { vkStorage, moves } = useAppContext();

  const onClickHandler = useCallback(() => {
    vkStorage.set('onboardEnabled', false).then(moves.resetToMainPanel);
  }, [vkStorage, moves.resetToMainPanel]);

  return (
    <Panel id={id} className="OnboardPanel">
      <div className="OnboardPanel__in">
        <Placeholder icon={<Logo />} header="Добро пожаловать!"></Placeholder>
        <Cell before={<Icon28CoinsOutline />} multiline>
          Продаём вещи или отдаём их на благотворительность
        </Cell>
        <Cell before={<Icon28WalletOutline />} multiline>
          Храним ваши вещи
        </Cell>
        <Cell before={<Icon28StatisticsOutline />} multiline>
          Предлагаем эксклюзивные товары
        </Cell>
      </div>
      <FixedLayout vertical="bottom">
        <Div>
          <Button mode="primary" size="l" onClick={onClickHandler} stretched>
            Начать
          </Button>
        </Div>
      </FixedLayout>
    </Panel>
  );
}
