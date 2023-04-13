import React from 'react';
import { ReactComponent as Logo } from '../../../assets/logo.svg';
import { Button, Cell, Div, FixedLayout, Panel, Placeholder } from '@vkontakte/vkui';
import { CommonPanelProps } from 'src/types/common';
import { Icon28CoinsOutline, Icon28WalletOutline, Icon28StatisticsOutline } from '@vkontakte/icons';

export function OnboardPanel(props: CommonPanelProps) {
  const { id } = props;
  return (
    <Panel id={id}>
      <Placeholder icon={<Logo />} header="Добро пожаловать!"></Placeholder>
      <Cell before={<Icon28CoinsOutline />}>Возможность продать, отдать вещи на благотворительность</Cell>
      <Cell before={<Icon28WalletOutline />}>Храним ваши вещи</Cell>
      <Cell before={<Icon28StatisticsOutline />}>Эксклюзивные товары</Cell>
      <FixedLayout vertical="bottom">
        <Div>
          <Button mode="primary" size="l" onClick={() => console.log('CLICK')}>
            Начать
          </Button>
        </Div>
      </FixedLayout>
    </Panel>
  );
}
