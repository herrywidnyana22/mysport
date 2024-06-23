'use client'

import { Award, BookUser, Footprints } from "lucide-react";
import { CardOverViewLayout } from "./card-overview-layout";
import { DialogAddLomba } from "./dialog-add-lomba-layout";

type OverviewLayoutProps = {
  data: {
    totalLomba: number | string,
    totalPeserta: number | string,
    totalPanitia: number | string,
    user: any,
    mostPeserta: any,
    popularCategory: any,
  }
}

export const OverViewLayout = ({
  data
}: OverviewLayoutProps) => {
  

  return ( 
      <div 
        className="
          grid 
          grid-cols-2 
          gap-x-5
        "
      >
          <div>
            <h2 
              className="
                text-2xl 
                font-bold 
                mb-4
              "
            >
              Overview
            </h2>

            <div 
              className="
                grid 
                grid-cols-2 
                gap-4
              "
            >
              <div className="col-span-2">
                <div 
                  className="
                      p-4 
                      rounded-xl
                      bg-green-100 
                    "
                  >
                  <div 
                    className="
                      font-bold 
                      text-xl 
                      text-gray-800 
                      leading-none
                    "
                  >
                        Good day, Kristin
                  </div>
                  <div className="mt-5">
                    <button 
                      type="button" 
                      className="
                        inline-flex 
                        items-center 
                        justify-center 
                        py-2 
                        px-3 
                        text-sm 
                        font-semibold 
                        rounded-xl 
                        transition
                        bg-white 
                        text-gray-800 
                        hover:text-green-500 
                      "
                    >
                      Start tracking
                    </button>
                  </div>
                </div>
              </div>
              <CardOverViewLayout
                label={data.popularCategory}
                subLabel={"Lomba Selesai"}
                icon={Award}
                viewUrl={"/admin/lomba"}
                newAction={<DialogAddLomba/>}
                color="yellow"
              />
              <CardOverViewLayout
                label={data.totalPanitia}
                subLabel={"Total Panitia"}
                icon={BookUser}
                color="purple"
                viewUrl={"/admin/users"}
                // newAction={}
                
              />
              <div className="col-span-2">
                <CardOverViewLayout
                  label={data.totalPeserta}
                  subLabel={"Total Peserta"}
                  icon={Footprints}
                  color="red"
                  viewUrl={"/admin/peserta"}
                  // newAction={() =>{}}
                />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h2 
              className="
                text-2xl 
                font-bold 
                mb-4
              "
            >
              Rekor
            </h2>
             <CardOverViewLayout
                label={data.mostPeserta}
                subLabel={"Peserta Terbanyak"}
                icon={Footprints}
                color="blue"
              />
             <CardOverViewLayout
                label={`${data.popularCategory}`}
                subLabel={"Popular Category"}
                icon={Footprints}
                color="orange"
              />
            
          </div>
        </div>
  );
}