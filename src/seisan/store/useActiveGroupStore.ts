import { ActiveGroup } from "../types/active-group";

export const useActiveGroupStore = () => {
  return new ActiveGroupStore();
}

class ActiveGroupStore {
  _state: Ref<ActiveGroup | null>;
  constructor() {
    this._state = useState('activeGroup', () => null);
  }

  get state(): Readonly<Ref<ActiveGroup | null>> {
    return readonly(this._state);
  }

  setActiveGroup(activeGroup: ActiveGroup | null) {
    this._state.value = activeGroup;
  }
}
