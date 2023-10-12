import { UserOmitPassword } from "../types/user";

export const useProfileStore = () => {
  return new ProfileStore();
}

class ProfileStore {
  _state: Ref<UserOmitPassword | null>;
  constructor() {
    this._state = useState('profile', () => null);
  }

  get state(): Readonly<Ref<UserOmitPassword | null>> {
    return readonly(this._state);
  }

  setProfile(profile: UserOmitPassword | null) {
    this._state.value = profile;
  }
}
