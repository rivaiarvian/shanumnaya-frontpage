import React, { useState, useEffect } from "react";

import Circle from "public/images/circle-accent-1.svg";
import axios from "src/config/axios";
import Clients from "src/parts/Clients";
import Header from "src/parts/Header";
import Hero from "src/parts/Hero";
import ListCourses from "src/parts/ListCourses";
import ListCategories from "src/parts/ListCategories";
import Footer from "src/parts/Footer";

function Home() {
  const [data, setData] = useState();
  useEffect(() => {
    async function fetchMyAPI() {
      try {
        const courses = await axios.get(`/courses`);
        setData(courses.data.data.data);
      } catch (error) {
        console.log("error", error);
      }
    }

    fetchMyAPI();
  }, []);
  return (
    <>
      <main>
        <section className="header-clipping pt-10">
          <Circle className="absolute left-0 bottom-0"></Circle>
          <div className="sushine"></div>
          <div className="container mx-auto">
            <Header />
            <Hero />
          </div>
        </section>
        <section className="container mx-auto pt-24">
          <Clients />
        </section>
        <section className="container mx-auto pt-24">
          <ListCourses data={data} />
        </section>
        <section className="container mx-auto pt-24">
          <ListCategories />
        </section>
        <section className="mt-24 bg-indigo-1000 py-12">
          <Footer />
        </section>
      </main>
    </>
  );
}

export default Home;
