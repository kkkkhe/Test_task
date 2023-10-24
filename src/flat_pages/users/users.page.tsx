import { userModel } from "@/src/entities/user";
import { useSelector } from "react-redux";
import { Pagination } from "./ui/pagination";
import {
  CreateForm,
  EditForm,
  createUserThunk,
  editUserThunk,
} from "@/src/features/manage-user";
import { UserItem } from "@/src/entities/user/ui/user-item";
import { useAction } from "@/src/shared/lib/redux";
import { Modal } from "@/src/shared/ui/modal";
import { deleteUserThunk } from "@/src/features/manage-user/model/delete";

const tableCols = ["Name", "Email", "Birthday", "Phone", "Address"];
export const UsersPage = () => {
  const users = useSelector(userModel.selectors.users);
  const usersCount = useSelector(userModel.selectors.count);
  const editableUserId = useSelector(userModel.selectors.editableUserId);
  const isUserCreatingModalOpened = useSelector(
    userModel.selectors.isUserCreatingModalOpened,
  );
  const deleteUser = useAction(deleteUserThunk);
  const editUser = useAction(editUserThunk);
  const createUser = useAction(createUserThunk);
  const setEditableUser = useAction(userModel.actions.setEditableUserId);
  const setCreateUserModalOpened = useAction(
    userModel.actions.setUserCreatingState,
  );
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="flex flex-col max-w-[75%] w-full">
        <div className="grid bg-[#d0d0d0] grid-cols-5 text-black px-5 pr-20 w-full">
          {tableCols.map((colName, id) => {
            return (
              <span className="py-2 font-bold max-w-[217px]" key={id}>
                {colName}
              </span>
            );
          })}
        </div>
        <div className="flex bg-white flex-col w-full">
          {users?.map((user, id) => {
            return (
              <UserItem
                key={user.id}
                user={user}
                onEdit={() => setEditableUser(id)}
                onDelete={() => {
                  alert(
                    "There is an endpoint for that, but it is not working eventually",
                  );
                  deleteUser(user.id);
                }}
              />
            );
          })}
        </div>
        <div className="flex justify-end pt-5 w-full">
          <div className="w-[60%] flex justify-between items-center ">
            <Pagination count={usersCount} />
            <button
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={() => setCreateUserModalOpened(true)}
            >
              Create User
            </button>
          </div>
        </div>
        <Modal
          isOpened={isUserCreatingModalOpened}
          onClose={() => setCreateUserModalOpened(false)}
        >
          <CreateForm create={createUser} />
        </Modal>
        <Modal
          isOpened={editableUserId != null}
          onClose={() => setEditableUser(null)}
        >
          <EditForm user={users[editableUserId!]} edit={editUser} />
        </Modal>
      </div>
    </div>
  );
};
