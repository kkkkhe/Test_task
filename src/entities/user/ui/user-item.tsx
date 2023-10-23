import { ReactNode, useState } from "react";
import { User } from "../types";

export const UserItem = ({
  user,
  editSlot,
}: {
  user: User;
  editSlot: ReactNode;
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
      {editSlot}
    </div>
  );
};
