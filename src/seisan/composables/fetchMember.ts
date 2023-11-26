import { useMemberStore } from "../store/useMemberStore";
import { MemberInfo } from "../types/member";

export const fetchMember = async (
  groupId: number,
) => {
  const apiUrl = `http://seisan.local:3001`;
  const { data: member }: { data: Ref<MemberInfo[]> } = await useFetch(
    `${apiUrl}/members?groupId=${groupId.toString()}`
  );

  const memberStore = useMemberStore();
  memberStore.setMember(member.value);
}
