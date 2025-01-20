'use client'
import { IVehicle } from '@/interfaces'
import React from 'react'
import { useRouter } from 'next/navigation'

export function VehicleCard({vehicle} : {
    vehicle: IVehicle
}) {
    const router = useRouter()
  return (
    <div className="border border-gray-300 border-solid p-5 rounded flex flex-col gap-2 hover:border-primary cursor-pointer">
        <img 
         src={vehicle?.media[0]}
         alt={vehicle.name}
         className="w-full h-48 object-cover rounded"
         onClick={() => router.push(`/vehicles/book/${vehicle._id}`)}
         />
         <h1 className="text-sm font-bold">{vehicle.name}</h1>
         <h1 className="text-xs text-gray-500">{vehicle.rentPerDay} per day</h1>
         <div className="flex justify-between text-gray-500 text-xs">
            <h1> Brand: {vehicle.brand}</h1>
         </div>
    </div>
  )
}

export default VehicleCard