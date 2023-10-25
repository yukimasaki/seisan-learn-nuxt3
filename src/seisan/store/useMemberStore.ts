import { MemberInfo } from "../types/member";

export const useMemberStore = () => {
  return new MemberStore();
}

class MemberStore {
  _state: Ref<MemberInfo[]>;
  constructor() {
    this._state = useState('member', () => []);
  }

  get state() {
    return readonly(this._state);
  }

  setMember(member: MemberInfo[]) {
    this._state.value = member;
  }
}
