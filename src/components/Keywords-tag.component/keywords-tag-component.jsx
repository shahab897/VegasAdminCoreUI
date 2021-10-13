import React, { useEffect } from "react";
import "./styles.css";
import { WithContext as ReactTags } from "react-tag-input";
import { CLabel } from "@coreui/react";

function KeywordsTagsComponent(props) {
  const { tags, setTags } = props;
  const suggestions = [
    { id: "USA", text: "USA" },
    { id: "Germany", text: "Germany" },
    { id: "Austria", text: "Austria" },
    { id: "Costa Rica", text: "Costa Rica" },
    { id: "Sri Lanka", text: "Sri Lanka" },
    { id: "Thailand", text: "Thailand" },
  ];

  const KeyCodes = {
    comma: 188,
    enter: [10, 13],
  };

  useEffect(() => {
    console.log(tags, "ummhhhhmmm");
  }, [tags]);

  const handleDelete = (i) => {
    const filteredTag = tags.filter((tag, index) => index !== i);
    setTags(filteredTag);
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const tagss = [...tags];
    const newTags = tagss.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const delimiters = [...KeyCodes.enter, KeyCodes.comma];
  return (
    <>
      <CLabel htmlFor="CategoryKeywords">Keywords</CLabel>
      <ReactTags
        type="text"
        id="CategoryKeywords"
        classNames={{
          tagInputField: "form-control",
        }}
        aria-describedby="category-keywords"
        tags={tags}
        suggestions={suggestions}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        delimiters={delimiters}
      />
    </>
  );
}

export default KeywordsTagsComponent;
