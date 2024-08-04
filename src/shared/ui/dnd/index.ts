import Provider from '@/shared/ui/dnd/part/provider';
import Dragable from '@/shared/ui/dnd/part/dragable';
import Dropable from '@/shared/ui/dnd/part/dropable';
import Boundary from '@/shared/ui/dnd/part/boundary';
import VerticalList from '@/shared/ui/dnd/part/list';
import PointerContent from '@/shared/ui/dnd/part/pointerContent';

import type { DragableFC } from '@/shared/ui/dnd/part/dragable/dragable.ui';
import type { DropableFC } from '@/shared/ui/dnd/part/dropable/dropable.ui';
import type { DnDProviderFC } from '@/shared/ui/dnd/part/provider/provider.ui';
import type { BoundaryFC } from '@/shared/ui/dnd/part/boundary/boundary.ui';
import type { VerticalListFC } from '@/shared/ui/dnd/part/list/list.ui';
import type { PointerContentFC } from '@/shared/ui/dnd/part/pointerContent/pointerContent.ui';

export interface IDnD {
  Dragable: DragableFC;
  Dropable: DropableFC;
  Provider: DnDProviderFC;
  Boundary: BoundaryFC;
  VerticalList: VerticalListFC;
  PointerContent: PointerContentFC;
}

const DnD: IDnD = Object.assign(
  {},
  {
    Dragable,
    Dropable,
    Provider,
    Boundary,
    VerticalList,
    PointerContent,
  },
);

export default DnD;
