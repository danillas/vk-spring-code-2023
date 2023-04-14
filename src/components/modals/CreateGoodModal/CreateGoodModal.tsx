import { CommonModalProps } from 'src/types/common';
import {
  Button,
  DateInput,
  Div,
  FormField,
  Group,
  ModalPage,
  ModalPageHeader,
  Select,
  Spacing,
  Subhead,
} from '@vkontakte/vkui';
import { Icon24CameraOutline } from '@vkontakte/icons';
import './styles.scss';

export function CreateGoodModal(props: CommonModalProps) {
  const { id: modalId, onClose, settlingHeight } = props;

  return (
    <ModalPage
      className="CreateGoodModal"
      id={modalId}
      onClose={onClose}
      header={<ModalPageHeader>Новая вещь</ModalPageHeader>}
      settlingHeight={settlingHeight}
    >
      <Div>
        <div className="CreateGoodModal__photo">
          <Button size="l" mode="tertiary" before={<Icon24CameraOutline />} disabled>
            Загрузить фотографию
          </Button>
        </div>
        <Group
          separator="hide"
          header={
            <>
              <Subhead weight="2" style={{ paddingLeft: 0, color: '#6D7885' }}>
                Название
              </Subhead>
              <Spacing size={8} />
            </>
          }
        >
          <FormField>
            <input
              type="text"
              className="UserArtistsGroup__placeholder vkuiInput__el"
              placeholder="Укажите название"
              value=""
              readOnly
            />
          </FormField>
        </Group>
        <Group
          separator="hide"
          header={
            <>
              <Subhead weight="2" style={{ paddingLeft: 0, color: '#6D7885' }}>
                Категория
              </Subhead>
              <Spacing size={8} />
            </>
          }
        >
          <Select
            placeholder="Не выбрана"
            options={[
              { value: '11', label: 'Категория 1' },
              { value: '11', label: 'Категория 2' },
            ]}
          ></Select>
        </Group>
        <Group
          separator="hide"
          header={
            <>
              <Subhead weight="2" style={{ paddingLeft: 0, color: '#6D7885' }}>
                Дата покупки
              </Subhead>
              <Spacing size={8} />
            </>
          }
        >
          <DateInput />
        </Group>
        <Group
          separator="hide"
          header={
            <>
              <Subhead weight="2" style={{ paddingLeft: 0, color: '#6D7885' }}>
                Место хранения
              </Subhead>
              <Spacing size={8} />
            </>
          }
        >
          <FormField>
            <input
              type="text"
              className="UserArtistsGroup__placeholder vkuiInput__el"
              placeholder="Гараж"
              value=""
              readOnly
            />
          </FormField>
        </Group>
      </Div>
    </ModalPage>
  );
}
