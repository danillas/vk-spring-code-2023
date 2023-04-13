import React from 'react';
import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';

import persik from '../img/persik.png';
import { CommonPanelProps } from 'src/types/common';
import './Persik.css';

export function Persik(props: CommonPanelProps) {
  return (
    <Panel id={props.id}>
      <PanelHeader before={<PanelHeaderBack onClick={props.onBack} data-to="home" />}>Persik</PanelHeader>
      <img className="Persik" src={persik} alt="Persik The Cat" />
    </Panel>
  );
}
