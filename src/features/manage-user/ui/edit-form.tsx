import { User } from "@/src/entities/user";
import { UserId } from "@/src/shared/api/user";
import { useState, FormEvent } from "react";
import { ManageInput } from "@/src/shared/ui/data-entry/manage-input";
import { checkValidation } from "../lib";
import { Button } from "@/src/shared/ui/buttons/main";
import { PHONE_REGEXP, EMAIL_REGEXP, BIRTHDATE_REGEXP } from "../config";
import { useSelector } from "react-redux";
import { selectors } from "../model/core";

type EditUserProps = {
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
  address: string;
};
export const EditForm = ({
  user,
  edit,
}: {
  user: User;
  edit: ({ id, data }: { id: UserId; data: EditUserProps }) => void;
}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday_date);
  const [phone, setPhone] = useState(user.phone_number.toString());
  const [address, setAddress] = useState(user.address);
  const nameError = useSelector(selectors.nameError);
  const addressError = useSelector(selectors.addressError);
  const emailError = useSelector(selectors.emailError);
  const phoneError = useSelector(selectors.phoneError);
  const dateError = useSelector(selectors.dateError);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    edit({
      id: user.id,
      data: {
        name,
        email,
        birthday_date: birthday,
        phone_number: phone,
        address,
      },
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="p-2 border text-md border-b-grey w-[700px]"
      key={user.id}
    >
      <div className="mb-4">
        <ManageInput
          type="text"
          value={name}
          error={nameError}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <ManageInput
          type="text"
          value={email}
          error={emailError}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <ManageInput
          type="text"
          value={birthday}
          error={dateError}
          onChange={(e) => setBirthday(e.target.value)}
          placeholder="Birthday"
        />
        <ManageInput
          type="text"
          value={phone}
          error={phoneError}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
        />
        <ManageInput
          type="text"
          error={addressError}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
      </div>
      <div className="flex justify-end">
        <Button>Submit</Button>
      </div>
    </form>
  );
};
