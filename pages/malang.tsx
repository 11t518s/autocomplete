import axios from "axios";
import React, { useEffect, useState } from "react";
import AutoComplete from "../components/AutoComplete";

type autoCompleteType = {
  searchName: string;
  displayName: string;
};

type malangType = {
  expiredAt: string;
  id: number;
  imagePath: string;
  isRobot: boolean;
  name: string;
  orderIndex: number;
  startedAt: string;
  status: number;
  story: string;
};

const Malang: React.VFC = () => {
  const [autoCompleteList, setAutoCompleteList] = useState<autoCompleteType[]>(
    []
  );

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
