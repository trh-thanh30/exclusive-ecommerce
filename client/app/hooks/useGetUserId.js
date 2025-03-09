import { useSelector } from "react-redux";

export default function useGetUserId() {
  const { user } = useSelector((state) => state.user.user);
  return { user };
}
