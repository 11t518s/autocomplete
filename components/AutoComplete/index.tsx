import React, { useCallback, useEffect, useState } from "react";
import * as A from "./autoComplete.styles";

interface Props {
  autoCompleteList: { searchName: string; displayName: string }[];
  commonAutoCompleteListBackgroundColor: string;
  focusedAutoCompleteListBackgroundColor: string;
}

const AutoComplete: React.FC<Props> = ({
  autoCompleteList,
  commonAutoCompleteListBackgroundColor,
  focusedAutoCompleteListBackgroundColor,
}) => {
  const [onChangeInput, setOnChangeInput] = useState("");
  const [onFocusedItemIndex, setOnFocusedItemIndex] = useState(-1);
  const [isInputData, setIsInputData] = useState(false);
  const [filteredAutoCompleteList, setFilteredAutoCompleteList] =
    useState(autoCompleteList);

  const onInputChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setOnChangeInput(e.target.value);
      setOnFocusedItemIndex(-1);
    },
    [onChangeInput]
  );

  const onKeyDownHandler = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") {
        !e.nativeEvent.isComposing &&
          setOnFocusedItemIndex(onFocusedItemIndex + 1);
        if (
          onFocusedItemIndex >= filteredAutoCompleteList.length - 1 &&
          isInputData
        ) {
          setOnFocusedItemIndex(filteredAutoCompleteList.length - 1);
        }
      } else if (e.key === "ArrowUp") {
        setOnFocusedItemIndex(onFocusedItemIndex - 1);
        if (onFocusedItemIndex <= 0) {
          setOnFocusedItemIndex(0);
        }
      }
    },
    [onFocusedItemIndex]
  );

  useEffect(() => {
    if (onChangeInput.length === 0) {
      setIsInputData(false);
    } else {
      setIsInputData(true);
    }
    setFilteredAutoCompleteList(
      autoCompleteList.filter(
        (data) =>
          data.searchName.slice(0, onChangeInput.length) === onChangeInput
      )
    );
  }, [onChangeInput]);
  return (
    <>
      <A.autoCompleteInput
        value={onChangeInput}
        onChange={onInputChangeHandler}
        onKeyDown={onKeyDownHandler}
      />

      <A.autoCompleteListWrapper>
        {isInputData &&
          filteredAutoCompleteList.map((item, index) => (
            <A.autoCompleteList
              key={index}
              onMouseEnter={() => setOnFocusedItemIndex(index)}
              onMouseLeave={() => setOnFocusedItemIndex(-1)}
              color={
                onFocusedItemIndex === index
                  ? focusedAutoCompleteListBackgroundColor
                  : commonAutoCompleteListBackgroundColor
              }
            >
              {item.displayName}
            </A.autoCompleteList>
          ))}
      </A.autoCompleteListWrapper>
    </>
  );
};
export default AutoComplete;
