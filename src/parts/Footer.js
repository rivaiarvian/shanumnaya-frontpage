import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="container mx-auto">
      <div className="flex justify-between">
        <div className="w-1/6">
          <div className="text-white">Company</div>
          <ul className="mt-4">
            <li className="mt-2">
              <Link href="">
                <a className="text-indigo-300 hover:text-teal-500 hover:underlive">
                  API Developer
                </a>
              </Link>
            </li>
            <li className="mt-2">
              <Link href="">
                <a className="text-indigo-300 hover:text-teal-500 hover:underlive">
                  Career
                </a>
              </Link>
            </li>
            <li className="mt-2">
              <Link href="">
                <a className="text-indigo-300 hover:text-teal-500 hover:underlive">
                  Our Story
                </a>
              </Link>
            </li>
            <li className="mt-2">
              <Link href="">
                <a className="text-indigo-300 hover:text-teal-500 hover:underlive">
                  New Soon
                </a>
              </Link>
            </li>
          </ul>
        </div>

        <div className="w-1/6">
          <div className="text-white">Student</div>
          <ul className="mt-4">
            <li className="mt-2">
              <Link href="">
                <a className="text-indigo-300 hover:text-teal-500 hover:underlive">
                  Get Scholarship
                </a>
              </Link>
            </li>
            <li className="mt-2">
              <Link href="">
                <a className="text-indigo-300 hover:text-teal-500 hover:underlive">
                  Our Pathskills
                </a>
              </Link>
            </li>
            <li className="mt-2">
              <Link href="">
                <a className="text-indigo-300 hover:text-teal-500 hover:underlive">
                  All Features
                </a>
              </Link>
            </li>
            <li className="mt-2">
              <Link href="">
                <a className="text-indigo-300 hover:text-teal-500 hover:underlive">
                  Refund Policy
                </a>
              </Link>
            </li>
          </ul>
        </div>

        <div className="w-1/6">
          <h6 className="text-white">Touch Us</h6>
          <p className="mt-4 text-indigo-300 leading-loose">
            Micro Centre <br />
            Sllrydi Block X No. 12 <br />
            Jakarta Selatan, Indonesia <br />
            +21 2020 5555
          </p>
        </div>

        <div className="w-2/6">
          <h6 className="text-white">Promotions</h6>
          <p className="mt-4 text-indigo-300">
            Submit your email for new updates
          </p>
          <form>
            <input
              type="text"
              className="bg-white focus:outline-none border-0 px-6 py-3 mt-6"
              placeholder="Your email addres"
            />
            <button className="bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3">
              Daftar Now
            </button>
          </form>
        </div>
      </div>
      <div className="border-t pt-8 mt-8 border-gray-800 text-center">
        <p className="text-indigo-300">
          2020 Copyright Micro by rivaiarvian. All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
