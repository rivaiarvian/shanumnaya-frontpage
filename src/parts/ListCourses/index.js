import React from "react";

import Link from "next/link";
import RenderItem from "./RenderItem";

function ListCourses({ data }) {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="w-auto">
          <h2 className="text-lg text-gray-600">New Classes</h2>
          <h3 className="text-xl text-gray-900">
            Summer <span className="text-teal-400">Productive</span>
          </h3>
        </div>
        <div className="w-auto">
          <Link href="/courses">
            <a className="text-gray-600 hover:underline text-sm">
              View all course
            </a>
          </Link>
        </div>
      </div>
      <div className="flex justify-start items-center -mx-4 mt-6">
        {data?.length > 0 ? (
          data?.map((item, i) => (
            <RenderItem item={item} key={`listitem-${i}`}></RenderItem>
          ))
        ) : (
          <div className="w-full text-center py-12">No item found</div>
        )}
      </div>
    </>
  );
}

export default ListCourses;
