import { User } from "@/src/entities/user";
import { UserId } from "@/src/shared/api/user";
import { useState, FormEvent } from "react";
import { ManageInput } from "@/src/shared/ui/data-entry/manage-input";
import { checkValidation } from "../lib";
import { Button } from "@/src/shared/ui/buttons/main";
import { PHONE_REGEXP, EMAIL_REGEXP, BIRTHDATE_REGEXP } from "../config";

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
  const [isPhoneInvalid, setIsPhoneInvalid] = useState<string>("");
  const [isEmailInvalid, setIsEmailInvalid] = useState<string>("");
  const [isDateInvalid, setIsDateInvalid] = useState<string>("");
  const [isNameInvalid, setIsNameInvalid] = useState<string>("");
  const [isAddressInvalid, setIsAddressInvalid] = useState<string>("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nameError = checkValidation({
      value: name,
      max: 255,
      min: 1
    })
    const addressError = checkValidation({
      value: name,
      required: false,
      min: 1
    })
    const phoneError = checkValidation({
      value: phone,
      pattern: PHONE_REGEXP,
      max: 20,
      min: 1
    })
    const emailError = checkValidation({
      value: email,
      pattern: EMAIL_REGEXP,
      max: 254,
      min: 1
    })
    const birthdayDateError = checkValidation({
      value: birthday,
      pattern: BIRTHDATE_REGEXP,
      max: 254,
      min: 1
    })
    if(phoneError){
      setIsPhoneInvalid(phoneError)
    }
    if(emailError){
      setIsEmailInvalid(emailError)
    }
    if(birthdayDateError){
      setIsDateInvalid(birthdayDateError)
    }
    if(nameError){
      setIsNameInvalid(nameError)
    }
    if(addressError){
      setIsAddressInvalid(addressError)
    }
    if(isPhoneInvalid || isEmailInvalid || isDateInvalid || isNameInvalid || isAddressInvalid){
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
        <Button>
          Submit
        </Button>
      </div>
    </form>
  );
};
