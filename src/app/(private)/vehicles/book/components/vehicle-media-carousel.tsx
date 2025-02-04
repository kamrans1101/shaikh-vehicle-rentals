'use client'
import { IVehicle } from '@/interfaces'
import React from 'react'
import { Carousel } from 'antd'

function VehicleMediaCarousel({vehicle} : {
    vehicle: IVehicle
}) {
  return (
    <div>
        <Carousel>
            {vehicle?.media.map((image:string,index) => (
                <img key ={index} src={image} alt={vehicle.name} className="w-[300px] h-[500px] rounded"/>
            ))}
        </Carousel>
    </div>
  )
}

export default VehicleMediaCarousel