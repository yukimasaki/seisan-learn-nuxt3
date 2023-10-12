export const useActiveGroupStore = () => {
  return new ActiveGroupStore();
}

class ActiveGroupStore {
  _state: Ref<string | null>;
  constructor() {
    this._state = useState('activeGroup', () => null);
  }

  get state(): Readonly<Ref<string | null>> {
    return readonly(this._state);
  }

  setActiveGroup(activeGroup: string | null) {
    this._state.value = activeGroup;
  }
}
