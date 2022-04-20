import React from "react";
import Link from "next/link";
import formatThousand from "src/helpers/formatThousand";

function RenderItem({ item }) {
  return (
    <div className="w-1/6 px-4 h-100">
      <div className="card relative transition-all duration-300">
        {item.imageName}
        <div className="card-meta mt-10">
          <h4 className="text-lg text-gray-900 transition-all duration-200 w-1/2">
            {item.name}
          </h4>
          <h5 className="text-sm text-gray-600 transition-all mt-2 duration-500">
            {formatThousand(item.total)}
          </h5>
        </div>
        <Link href="#">
          <a className="link-wrapped"></a>
        </Link>
      </div>
    </div>
  );
}

export default RenderItem;
