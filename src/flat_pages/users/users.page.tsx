import { userModel } from "@/src/entities/user";
import { useSelector } from "react-redux";
import { Pagination } from "./ui/pagination";
import { EditForm, editUserThunk } from "@/src/features/manage-user";
import { UserItem } from "@/src/entities/user/ui/user-item";
import { useAction } from "@/src/shared/lib/redux";
import { Modal } from "@/src/shared/ui/modal";
import { EditSvg } from "./assets/edit.svg";

const tableCols = ["Name", "Email", "Birthday", "Phone", "Address"];
export const UsersPage = () => {
  const users = useSelector(userModel.selectors.users);
  const usersCount = useSelector(userModel.selectors.count);
  const editableUserId = useSelector(userModel.selectors.editableUserId);
  const totalPages = Math.ceil(usersCount / 10) - 1;

  const editUser = useAction(editUserThunk);
  const setEditableUser = useAction(userModel.actions.setEditableUserId);
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
      <Pagination totalPages={totalPages} />
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
