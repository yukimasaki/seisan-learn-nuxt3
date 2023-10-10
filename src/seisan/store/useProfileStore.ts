import { UserOmitPassword } from "../types/user-omit-password";

export const useProfileStore = () => {
  return new ProfileStore();
}

class ProfileStore {
  _state: Ref<UserOmitPassword>;
  constructor() {
    this._state = useState('profile', () => ({
      email: '',
      displayName: '',
      membership: '',
    }));
  }

  get state(): Readonly<Ref<UserOmitPassword>> {
    return readonly(this._state);
  }

  setProfile(profile: UserOmitPassword) {
    this._state.value = profile;
  }
}
