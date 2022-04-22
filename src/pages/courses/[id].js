import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import { CSSTransition } from "react-transition-group";

import YouTube from "react-youtube";
import Header from "src/parts/Header";
import Feature from "src/parts/Details/Feature";
import formatThousand from "src/helpers/formatThousand";
import RenderPreview from "src/parts/Details/RenderPreview";
import HappyStudent from "src/parts/Details/HappyStudent";
import CoursePhoto from "src/parts/Details/CoursePhoto";

//public image file
import NameTag from "public/images/icon-nametag.svg";
import PlayBack from "public/images/icon-playback.svg";
import Certificate from "public/images/icon-certificate.svg";
import Footer from "src/parts/Footer";

function DetailCourse({ data }) {
  const item = data.data;
  const footer = useRef(null);

  const [isSticky, setIsStiky] = useState(true);

  useEffect(() => {
    const stickyOffsetTop = footer.current.getBoundingClientRect().top;

    const stickyMetaToggler = () => {
      setIsStiky(stickyOffsetTop >= window.pageYOffset * window.innerHeight);
    };

    window.addEventListener("scroll", stickyMetaToggler);
    return () => {
      window.removeEventListener("scroll", stickyMetaToggler);
    };
  }, []);

  return (
    <>
      <section
        className="pt-10 relative overflow-hidden"
        style={{ height: 660 }}
      >
        {item?.chapters?.[0]?.lessons?.[0]?.video && (
          <div className="video-wrapper">
            <YouTube
              videoId={item?.chapters?.[0]?.lessons?.[0]?.video}
              id={item?.chapters?.[0]?.lessons?.[0]?.video}
              opts={{
                playerVars: {
                  loop: 1,
                  mute: 1,
                  autoplay: 1,
                  controls: 0,
                  showinfo: 0,
                },
              }}
              onEnd={(e) => {
                e.target.playVideo();
              }}
            ></YouTube>
          </div>
        )}

        <div className="absolute inset-0 z-0 w-full h-full bg-black opacity-75"></div>
        <div className="meta-title absolute inset-0 object-fill z-0 w-full flex justify-center items-center">
          <div className="text-center">
            <h3 className="text-lg text-white">Kelas Online:</h3>
            <h4 className="text-6xl text-teal-500 font-semibold">
              {item?.name ?? "Nama Kelas"}
            </h4>
          </div>
        </div>
        <div className="container mx-auto z-10 relative">
          <Header />
        </div>
      </section>
      <section className="container mx-auto pt-24 relative">
        <div className="absolute top-0 w-full transform -translate-y-1/2">
          <div className="w-3/4 mx-auto">
            <div className="flex justify-between">
              <Feature
                data={{
                  icon: <NameTag className="fill-teal-500" />,
                  meta: "Student",
                  value: item?.total_student ?? 0,
                }}
              />
              <Feature
                data={{
                  icon: <PlayBack className="fill-teal-500" />,
                  meta: "Video",
                  value: item?.total_videos ?? 0,
                }}
              />
              <Feature
                data={{
                  icon: <Certificate className="fill-teal-500" />,
                  meta: "Certificate",
                  value: item?.certificate === 1 ? "Tersedia" : "Tidak ada",
                }}
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div>
          <CSSTransition
            in={isSticky}
            timeout={300}
            classNames="meta-price"
            unmountOnExit
          >
            <div className="meta-price w-full bg-white z-50 left-0 py-3">
              <div className="w-3/4 mx-auto">
                <div className="flex item-center">
                  <div className="w-full">
                    <h2 className="text-gray-600">Nama Kelas</h2>
                    <h3 className="text-2xl text-gray-900">
                      {item?.name ?? "Nama Kelas"}
                    </h3>
                  </div>
                  <h5 className="text-2xl text-teal-500 whitespace-no-wrap mr-4">
                    {item?.type === "free" ? (
                      "Free"
                    ) : (
                      <span>{formatThousand(item?.price ?? 0)}</span>
                    )}
                  </h5>
                  <a
                    href={`${process.env.NEXT_PUBLIC_MEMBERPAGE_URL}/joined/${item.id}`}
                    className="bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 whitespace-no-wrap"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item?.type === "free" ? "Enroll Now" : "Buy Now"}
                  </a>
                </div>
              </div>
            </div>
          </CSSTransition>
        </div>
        <div className="w-3/4 mx-auto mt-8">
          <div className="w-3/4">
            <section>
              <h6 className="font-medium text-gray-900 text-2xl mb-4">
                About <span className="text-teal-500">Course</span>
              </h6>
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                {item?.description ?? "No Description"}
              </p>
            </section>
            <section className="mt-10">
              <h6 className="font-medium text-gray-900 text-2xl mb-4">
                Course <span className="text-teal-500">Photos</span>
              </h6>
              <div className="flex justify-start items-center -mx-4 mt-6">
                {item?.images?.length > 0 ? (
                  item?.images?.map?.((photo, index) => (
                    <CoursePhoto data={photo.image} key={index} />
                  ))
                ) : (
                  <div className="w-full text-center py-12">No Item Photo</div>
                )}
              </div>
            </section>
            <section className="mt-10">
              <h6 className="font-medium text-gray-900 text-2xl mb-4">
                You Will <span className="text-teal-500">Learn</span>
              </h6>
              {item?.chapters?.length > 0 ? (
                <RenderPreview previews={item.chapters}></RenderPreview>
              ) : (
                <div className="w-full text-center py-12">No Chapter Found</div>
              )}
            </section>
            <section className="mt-10 w-2/3">
              <h6 className="font-medium text-gray-900 text-2xl mb-4">
                Our <span className="text-teal-500">Instructor</span>
              </h6>
              <div className="flex item-center">
                <img
                  src={item?.mentor?.profile ?? ""}
                  alt={item?.mentor?.name}
                  className="w-20 h-20 rounded-full overflow-hidden object-cover"
                />
                <div className="ml-4">
                  <h2 className="text-lg text-gray-900">
                    {item?.mentor?.name ?? "mentor's name"}
                  </h2>
                  <h3 className="text-sm text-gray-60">
                    {item?.mentor?.profession}
                  </h3>
                </div>
              </div>
            </section>
            <section className="mt-10 w-6/12">
              <h6 className="font-medium text-gray-900 text-2xl mb-4">
                Happy <span className="text-teal-500">Students</span>
              </h6>
              {item?.reviews?.map?.((testimonial, index) => {
                return <HappyStudent key={index} data={testimonial} />;
              })}
            </section>
          </div>
        </div>
      </section>
      <section className="mt-24 bg-indigo-1000 py-12" ref={footer}>
        <Footer />
      </section>
    </>
  );
}

DetailCourse.getInitialProps = async (props) => {
  const { id } = props.query;

  try {
    const res = await axios.get(`http://localhost:3000/courses/${id}`);
    const data = res.data;
    return data;
  } catch (error) {}
};

export default DetailCourse;
