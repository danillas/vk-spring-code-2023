import { Button, ModalCard } from '@vkontakte/vkui';
import { CommonModalProps } from 'src/types/common';
import { Icon56ErrorOutline } from '@vkontakte/icons';

export function NotImplementedModal(props: CommonModalProps) {
  const { id, onClose } = props;
  return (
    <ModalCard
      id={id}
      onClose={onClose}
      header="Функционал не доступен"
      icon={<Icon56ErrorOutline />}
      actions={
        <Button mode="primary" size="l" stretched onClick={onClose}>
          Закрыть
        </Button>
      }
    />
  );
}
