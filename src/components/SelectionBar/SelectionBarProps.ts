export default interface SelectionProps {
  label: string;
  items: string[];
  type: string;
  onDeleteItem: (id: string) => void;
  onClear: () => void;
}
