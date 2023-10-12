import { MemberInfo } from "../types/member";

export const useMemberStore = () => {
  return new MemberStore();
}

class MemberStore {
  _state: Ref<MemberInfo[]>;
  constructor() {
    this._state = useState('member', () => []);
  }

  get state(): Readonly<Ref<readonly MemberInfo[]>> {
    return readonly(this._state);
  }

  setMember(member: MemberInfo[]) {
    this._state.value = member;
  }
}
