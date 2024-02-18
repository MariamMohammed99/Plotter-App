import { Column } from '../../types/rootState';

export default interface SidebarProps {
  columns: Column[];
  onDragEndCallback?: (draggableId: string, droppableId: string) => void;
}
