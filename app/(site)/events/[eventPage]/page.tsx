"use client"; // Use client to render the page 

import { getEventPage } from "@/backend/sanity-utils";
import { EventPageType } from "@/types/EventPageType";
import {PortableText} from '@portabletext/react'
import Footer from "@/components/footer/footer";
import BackButton from "@/components/UI/backbutton";
import RegistrerButton from "@/components/UI/registrerbutton";
import { useEffect, useState } from "react";
import { redirect } from 'next/navigation';
import getDateTimeFormat from "@/utils/date";
import LoadingPage from "@/components/loadingPage/loadingPage";
import { error } from "console";
import { useRouter } from 'next/navigation'

// Props for the event page 
type Props = {
  params: { eventPage: string }
}

export default function PageForEvent({params}: Props) {
  const [eventPage, setEventPage] = useState<EventPageType | null>(null);

  const slug = params.eventPage;
  const router = useRouter()


  
  useEffect(()=>{
    if(!slug) router.push("/");
    if(!eventPage) {
      getEventPage(slug)
      .then(
        (data) => {
          if(!data){
            router.push("/feilside")
          }
          setEventPage(data)
        })
      .catch(error => console.log("Error catches!", error))}
  },[slug, eventPage, router])
  

  if(!eventPage){
    return <LoadingPage />
  }
  
  // Information time and date formatted correctly 
  let {dateFormat, timeFormat} = getDateTimeFormat(eventPage.datetime)
  let isOver: Boolean = new Date > new Date(eventPage.datetime);

  const EventOverBadge = () => {
    return (
      isOver ? (
        <span className="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-1.5 rounded ">
          Påmelding Lukket!
        </span>
      ) : null
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tl from-gradient-end via-gradient-mid to-gradient-start">
      <main className="text-4xl flex justify-center min-h-screen">
        <div className="bg-slate-100 h-fit w-11/12 mt-2 p-5 md:p-20 md:w-3/4 md:text-6xl">
          <h1 className=" font-bold text-black">{eventPage.title}</h1>

          <h2 className="text-black text-xl my-2 md:text-2xl md:my-5"> 📅 {dateFormat}  |  🕕 {timeFormat} <EventOverBadge /> </h2>

          <hr className="h-1 my-8 border-0 bg-gray-800" />

          <div className="text-lg text-gray-800 mt-5 mx-10">
            <PortableText value={eventPage.content} />
          </div>


          <div className="flex justify-left gap-2">

            <RegistrerButton isEventOverBoolean={isOver ? true : false} urlToForm={eventPage.url} />

            <BackButton link="/" text="Tilbake" />

          </div>
          

        </div>
      </main>
      <Footer />
    </div>
  );
}