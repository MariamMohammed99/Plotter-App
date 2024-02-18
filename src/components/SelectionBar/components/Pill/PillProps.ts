export default interface PillProps {
  text: string;
  color: string;
  textColor: string;
  borderColor: string;
  onDelete: (id: string) => void;
}
