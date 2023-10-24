import { User } from "@/src/entities/user";
import { UserId } from "@/src/shared/api/user";
import { useState, FormEvent } from "react";
import { ManageInput } from "@/src/shared/ui/data-entry/manage-input";
import { checkError } from "../lib";

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
  const [isPhoneInvalid, setIsPhoneInvalid] = useState<string>('')
  const [isEmailInvalid, setIsEmailInvalid] = useState<string>('')
  const [isDateInvalid, setIsDateInvalid] = useState<string>('')
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const {errors} = checkError({phone, email, date: birthday})
    if (errors.isInvalid) {
      setIsPhoneInvalid(errors.invalidPhoneMessage)
      setIsEmailInvalid(errors.invalidEmailMessage)
      setIsDateInvalid(errors.invalidDateMessage)
      return
    }
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
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <ManageInput
          type="text"
          value={email}
          error={isEmailInvalid}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <ManageInput
          type="text"
          value={birthday}
          error={isDateInvalid}
          onChange={(e) => setBirthday(e.target.value)}
          placeholder="Birthday"
        />
        <ManageInput
          type="text"
          value={phone}
          error={isPhoneInvalid}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
        />
        <ManageInput
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
      </div>
      <div className="flex justify-end">
        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Submit</button>
      </div>
    </form>
  );
};

