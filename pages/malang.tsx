import axios from "axios";
import React, { useEffect, useState } from "react";
import AutoComplete from "../components/AutoComplete";

const Malang: React.VFC = () => {
  const [autoCompleteList, setAutoCompleteList] = useState<any>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/items").then((e) =>
      setAutoCompleteList(
        e.data.map((item: any) => ({
          searchName: item.name,
          displayName: `${item.id} - ${item.name}`,
        }))
      )
    );
  }, []);

  return (
    <>
      <AutoComplete
        autoCompleteList={autoCompleteList}
        commonAutoCompleteListBackgroundColor={"yellow"}
        focusedAutoCompleteListBackgroundColor={"blue"}
      />
    </>
  );
};
export default Malang;
