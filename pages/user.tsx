import React, { useEffect, useState } from "react";
import AutoComplete from "../components/AutoComplete";
import axios from "axios";

const User: React.VFC = () => {
  const [autoCompleteList, setAutoCompleteList] = useState<any>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/users/UserSearchUsername").then((e) =>
      setAutoCompleteList(
        e.data.map((item: any) => ({
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
