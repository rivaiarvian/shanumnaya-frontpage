import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";

import courses from "src/constants/api/courses";

import Header from "src/parts/Header";
import Footer from "src/parts/Footer";
import ListCourses from "src/parts/ListCourses";

function Random({ data }) {
  const [Search, setSearch] = useState(() => "");
  const [SearchFocus, setSearchFocus] = useState(() => false);
  const [SearchRespon, setSearchRespon] = useState(() => ({
    isLoading: false,
    isError: false,
    data: [],
  }));

  const selectWrapper = useRef(null);

  function clickOutside(event) {
    if (selectWrapper && !selectWrapper.current.contains(event.target)) {
      setSearch("");
    }
  }

  let timeoutSearch = useRef(null);
  function handleSearch(e) {
    e.persist();
    setSearch(e.target.value);
    clearTimeout(timeoutSearch.current);
    timeoutSearch.current = setTimeout(() => {
      setSearchRespon({
        isLoading: true,
        isError: false,
        data: null,
      });
      courses
        .all({ params: { q: e.target.value } })
        .then((res) => {
          setSearchRespon({
            isLoading: false,
            isError: false,
            data: res.data,
          });
        })
        .catch((err) => {
          setSearchRespon({
            isLoading: false,
            isError: true,
            data: null,
          });
        });
    }, 1000);
  }

  useEffect(() => {
    window.addEventListener("mousedown", clickOutside);
    return () => {
      window.removeEventListener("mousedown", clickOutside);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Micro | Courses</title>
      </Head>

      <section className="pt-10 z-30 relative" style={{ height: 360 }}>
        <div className="absolute inset-0 z-0 w-full h-full bg-black opacity-75"></div>
        <div
          className="meta-title absolute bottom-0 object-fill z-0 w-full flex justify-center item-center"
          style={{ marginBottom: "-25px" }}
        >
          <div className="">
            <h3 className="text-6xl text-center text-teal-500 font-semibold">
              Library
            </h3>
            <h4 className="text-lg text-center text-white">
              Jangan mau kalah dengan yang lainya. <br /> Yuk ikuti perkembangan
              teknologi
            </h4>
            <div className="flex flex-col relative" ref={selectWrapper}>
              <input
                id="q"
                type="text"
                onChange={handleSearch}
                onFocus={() => setSearchFocus(!SearchFocus)}
                onBlur={() => setSearchFocus(!SearchFocus)}
                value={Search}
                placeholder={
                  SearchFocus
                    ? "Ketik minimal 3 karakter untuk mencari"
                    : "Lagi cari kelas apa ?"
                }
                className="bg-white focus:outline-none transition-all duration-200 focus:border-teal-500 border border-gray-600 px-4 py-3 w-full mt-6"
              />
              {Search.length >= 3 && (
                <div
                  className="flex flex-col absolute py-2 px-4 bg-white border border-gray-600 w-full"
                  style={{ top: 75 }}
                >
                  {SearchRespon.isLoading ? (
                    "Loading..."
                  ) : (
                    <>
                      {SearchRespon.isError && "Something is technicall wrong"}
                      {SearchRespon.data?.length > 0
                        ? SearchRespon.data?.map((item, index) => {
                            return (
                              <div
                                key={index}
                                className="flex items-center -mx-4 py-2 cursor-pointer hover:bg-gray-200 relative"
                              >
                                <div
                                  className="w-auto px-4"
                                  style={{ width: 150 }}
                                >
                                  <img
                                    src={`/images/${item?.thumbnail ?? ""}`}
                                    alt={item?.name ?? "Course name"}
                                  />
                                </div>
                                <div className="w-full px-4">
                                  <h6 className="text-gray-900 text-lg">
                                    {item?.name ?? "Course name"}
                                  </h6>
                                  <p className="text-gray-600">
                                    {item?.level ?? "Level"}
                                  </p>
                                  <Link
                                    href="/courses/[id]"
                                    as={`/courses/${item.id}`}
                                  >
                                    <a className="link-wrapped"></a>
                                  </Link>
                                </div>
                              </div>
                            );
                          })
                        : "No course found"}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto z-10 relative">
          <Header />
        </div>
      </section>

      <section className="container mx-auto pt-24">
        <ListCourses data={data} />
      </section>

      <section className="mt-24 bg-indigo-1000 py-12">
        <Footer />
      </section>
    </>
  );
}

Random.getInitialProps = async () => {
  try {
    const data = await courses.all();
    return { data: data.data };
  } catch (error) {}
};

export default Random;