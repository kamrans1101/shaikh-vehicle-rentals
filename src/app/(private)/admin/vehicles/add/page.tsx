import PageTitle from '@/app/components/page-title'
import React from 'react'
import VehicleForm from '../_components/vehicle-form'

function AddVehicle({vehicleData} : any) {
  return (
    <div>
        <PageTitle title="Add Vehicle"/>
        <VehicleForm 
            type='add'
            vehicleData={vehicleData}
            />
    </div>
  )
}

export default AddVehicle