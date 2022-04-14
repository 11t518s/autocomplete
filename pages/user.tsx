import React, { useEffect, useState } from "react";
import AutoComplete from "../components/AutoComplete";
import axios from "axios";

type autoCompleteType = {
  searchName: string;
  displayName: string;
};

type userType = {
  createdAt: string;
  deletedAt: string | null;
  previousUsername: string | null;
  regionCode: string | null;
  uid: number;
  updatedAt: string;
  userType: number;
  username: string;
};

const User: React.VFC = () => {
  const [autoCompleteList, setAutoCompleteList] = useState<autoCompleteType[]>(
    []
  );

  useEffect(() => {
    axios.get("http://localhost:3000/users/UserSearchUsername").then((e) =>
      setAutoCompleteList(
        e.data.map((item: userType) => ({
          searchName: item.username,
          displayName: `[${item.userType}] ${item.username} ${
            item.previousUsername ? `(${item.previousUsername})` : ""
          }`,
        }))
      )
    );
  }, []);

  return (
    <>
      <AutoComplete
        autoCompleteList={autoCompleteList}
        commonAutoCompleteListBackgroundColor={"blue"}
        focusedAutoCompleteListBackgroundColor={"white"}
      />
    </>
  );
};
export default User;
