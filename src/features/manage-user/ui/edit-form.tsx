import { User } from "@/src/entities/user";
import { UserId } from "@/src/shared/api/user";
import { useState, FormEvent, InputHTMLAttributes } from "react";
import { EditUserProps } from "../model/edit";

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
      <div>
        <EditInput
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <EditInput
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <EditInput
          type="text"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          placeholder="Birthday"
        />
        <EditInput
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
        />
        <EditInput
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
      </div>
      <button className="text-white">Submit</button>
    </form>
  );
};

type InputProps = InputHTMLAttributes<HTMLInputElement>;
export const EditInput = (props: InputProps) => {
  return (
    <label className="relative flex w-full flex-col">
      <input type="text" {...props} className="p-2 w-full outline-none" />
    </label>
  );
};
