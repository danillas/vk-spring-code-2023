export interface CommonPanelProps {
  id: string;
  onBack?: VoidFunction;
}
export interface CommonModalProps {
  id: string;
  onClose: VoidFunction;
  settlingHeight?: number;
  dynamicContentHeight?: boolean;
}
