import React from 'react';

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';
import { CommonPanelProps } from 'src/types/common';
import { UserInfo } from '@vkontakte/vk-bridge';

interface HomeProps extends CommonPanelProps {
  fetchedUser?: UserInfo;
}

export function Home(props: HomeProps) {
  const { id, onBack, fetchedUser } = props;

  return (
    <Panel id={id}>
      <PanelHeader>Example</PanelHeader>
      {fetchedUser && (
        <Group header={<Header mode="secondary">User Data Fetched with VK Bridge</Header>}>
          <Cell
            before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200} /> : null}
            subtitle={fetchedUser.city.title}
          >
            {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
          </Cell>
        </Group>
      )}

      <Group header={<Header mode="secondary">Navigation Example</Header>}>
        <Div>
          <Button stretched size="l" mode="secondary" onClick={onBack} data-to="persik">
            Show me the Persik, please
          </Button>
        </Div>
      </Group>
    </Panel>
  );
}
