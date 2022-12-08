"use client";
import React, { useState } from "react";

import NotionView from "./NotionView";
import NotionUpdate from "./NotionUpdate";

const page = ({ params: { notionDatabaseId, lessonName } }) => {
  return (
    <div>
      <h1>
        {lessonName}/{notionDatabaseId}
      </h1>
      <hr />

      <NotionView lessonName={lessonName} notionDatabaseId={notionDatabaseId} />
      <hr />
      <NotionUpdate
        lessonName={lessonName}
        notionDatabaseId={notionDatabaseId}
      />
    </div>
  );
};

export default page;
