import { userModel } from "@/src/entities/user";
import { useSelector } from "react-redux";
import { Pagination } from "./ui/pagination";
import { EditForm, editUserThunk } from "@/src/features/manage-user";
import { UserItem } from "@/src/entities/user/ui/user-item";
import { useAction } from "@/src/shared/lib/redux";
import { Modal } from "@/src/shared/ui/modal";
import { EditSvg } from "./assets/edit.svg";
import { useEffect } from "react";
import { sessionModel } from "@/src/entities/session";
import { useRouter } from "next/router";

const tableCols = ["Name", "Email", "Birthday", "Phone", "Address"];
export const UsersPage = () => {
  const users = useSelector(userModel.selectors.users);
  const sessionUser = useSelector(sessionModel.selectors.user);
  const usersCount = useSelector(userModel.selectors.count);
  const editableUserId = useSelector(userModel.selectors.editableUserId);

  const editUser = useAction(editUserThunk);
  const setEditableUser = useAction(userModel.actions.setEditableUserId);
  const router = useRouter()
  // should not check it in component
  useEffect(() => {
    if(!sessionUser.username) {
      router.push('/login')
    }
  }, [sessionUser])
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="grid bg-[#d0d0d0] grid-cols-5 text-black px-5 max-w-[75%] w-full">
        {tableCols.map((colName, id) => {
          return (
            <span className="py-2 font-bold max-w-[217px]" key={id}>
              {colName}
            </span>
          );
        })}
      </div>
      <div className="flex bg-white flex-col max-w-[75%]">
        {users?.map((user) => {
          return (
            <UserItem
              key={user.id}
              user={user}
              editSlot={<Edit onClick={() => setEditableUser(user.id)} />}
            />
          );
        })}
      </div>
      <Pagination count={usersCount} />
      <Modal
        isOpened={Boolean(editableUserId)}
        onClose={() => setEditableUser(null)}
      >
        <EditForm user={users[editableUserId!]} edit={editUser} />
      </Modal>
    </div>
  );
};

const Edit = ({ onClick }: { onClick: () => void }) => {
  return (
    <button onClick={onClick}>
      <EditSvg />
    </button>
  );
};
