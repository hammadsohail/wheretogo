import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useRouter } from "next/dist/client/router";
import MapGL from "../../components/MapGL";
import { client, urlFor } from '../../lib/client';


import { ShareIcon,  SparklesIcon } from "@heroicons/react/24/outline";
import {  HeartIcon } from "@heroicons/react/24/solid";


const Product = ({searchResults, locations}) => {
  const router = useRouter();
  console.log(locations);


  const { location, title, img, description, address, area, slug } = router.query;


  return (
    <div className="h-screen">
      <Header />

      <main className="flex">
        <section className="flex flex-col pl-10 pr-10">
          <div>
            <div>
              <h1 className="text-2xl mt-5 font-semibold">{address}</h1>
            </div>
            <div className="relative flex flex-cols-3">
                 <div className="grow">
                     <p className="mt-2 underline decoration-1">
                       {area}
                 </p>
                </div>
                 <div className="flex flex-rows space-x-2 justify-items-end">
                   <ShareIcon className="mt-2 h-5 " />
                   <p className="hidden sm:inline-flex mt-1 underline font-semibold">Share</p>
                   <HeartIcon className="mt-2 h-5 text-red-400  hover:text-red-500 hover:animate-bounce " />
                   <p className="hidden sm:inline-flex mt-1 underline font-semibold">Save</p>
                 </div>
            </div>

          <div className="flex-grow flex-col items-center rounded-lg">
            <div className="flex mt-10 rounded-lg ">

              <img
                className=" h-80 w-full rounded-lg"
                src={img}
                object-fit="contain"
                layout="fill"
              />
            </div>
          </div>
        </div>
        <section className="flex flex-col mt-10">
          <h1 className="text-4xl font-semibold item-center">{title.toUpperCase()}</h1>
          <p className="text-xl mt-7 mb-10 ">{description}</p>
          <p className=" border-b-2 "></p>
        </section>


        {/* Description Div */}
        <section className="mt-6">
          <div>
            <div className="flex flex-rows space-x-2">
                <SparklesIcon className="h-7 text-yellow-400" />
                <p className="pr-2 text-lg font-bold">Project By</p>
            </div>
            <p className="mb-5 ml-9 text-gray-600">{searchResults.projectby}</p>
            <p className=" border-b-2 "></p>
            <p className="mt-7 pb-5">{searchResults.longdesc}</p>
          </div>
        </section>

        {/* what to do */}

        <section className="mt-6">
          <p className=" border-t-2 "></p>
            <div className="flex flex-col">
                <div>
                    {/* what to do here */}
                    <h1 className="mt-5 pb-5 text-3xl text italic  font-semibold text-red-500">WHAT TO DO IN {title.toUpperCase()}?</h1>
                </div>

               <div className="">
                <div className="items-center flex flex-col gap-4 rounded-lg mt-5 pb-7">
                  <div className="row-span-3"><img src={searchResults.images[0].asset._ref.replace("image-", "https://cdn.sanity.io/images/5i9l5w2e/production/").replace("-jpg", ".jpg" )} className="h-40 rounded-lg hover:animate-bounce transition transform-duration-100 ease-out hover:h-80"/></div>
                  <div className="col-span-2 "><img src={searchResults.images[1].asset._ref.replace("image-", "https://cdn.sanity.io/images/5i9l5w2e/production/").replace("-jpg", ".jpg" )} className="h-40 rounded hover:animate-bounce transition transform-duration-100 ease-out hover:h-80"/></div>
                  <div className="row-span-2 col-span-3"><img src={searchResults.images[2].asset._ref.replace("image-", "https://cdn.sanity.io/images/5i9l5w2e/production/").replace("-jpg", ".jpg" )}className="h-40 rounded hover:animate-bounce transition transform-duration-100 ease-out hover:h-80"/></div>
                </div>
               </div>
               <p className=" border-b-2 mb-10"></p>


            </div>

        </section>

        </section>

        <section className="hidden  xl:inline-flex xl:min-w-[200px]">
          <MapGL searchResults={locations} />
        </section>

      </main>

      <Footer />
    </div>
  );
};




export default Product;

// export const getServerSideProps = async () => {
//   const query = '*[_type == "location"]';
//   const map = await client.fetch(query);
//   return {
//     props: {
//       map,
//     },
//   };
// }




export const getServerSideProps = async ({ params: { slug }}) => {
    const query = `*[_type == "location" && slug.current == '${slug}'][0]`;
    const searchResults = await client.fetch(query);

    const location = '*[_type == "location"]';
    const locations = await client.fetch(location);


    return {
      props: {
        searchResults, locations
      },
    };
  }


