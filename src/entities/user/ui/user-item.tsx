import { User } from "../types";
import { EditSvg } from "../assets/edit.svg";
import { DeleteSvg } from "../assets/delete.svg";

export const UserItem = ({
  user,
  onEdit,
  onDelete,
}: {
  user: User;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  return (
    <div
      className="p-2 border text-md border-b-grey  px-5 flex w-full"
      key={user.id}
    >
      <div className="grid w-full grid-cols-5">
        <span>{user.name}</span>
        <span>{user.email}</span>
        <span>{user.birthday_date}</span>
        <span>{user.phone_number}</span>
        <span>{user.address || "Address is not set"}</span>
      </div>
      <Edit onClick={onEdit} />
      <Delete onClick={onDelete} />
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

const Delete = ({ onClick }: { onClick: () => void }) => {
  return (
    <button onClick={onClick}>
      <DeleteSvg />
    </button>
  );
};
