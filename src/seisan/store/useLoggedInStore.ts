export const useLoggedInStore = () => {
  return new LoggedInStore();
}

class LoggedInStore {
  _state: Ref<boolean>;
  constructor() {
    this._state = useState('loggedIn', () => false);
  }

  get state(): Readonly<Ref<boolean>> {
    return readonly(this._state);
  }

  setLoggedIn(loggedIn: boolean) {
    this._state.value = loggedIn;
  }
}
