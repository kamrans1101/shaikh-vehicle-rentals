import PageTitle from '@/app/components/page-title'
import { Button } from 'antd'
import React from 'react'
import CategoryFilters from './vehicles/_components/category-filters'

function VehiclesListPage() {
  return (
    <div>
        <div className="flex justify-between">
            <PageTitle title="Vehicles" />
            <Button
             href="/admin/vehicles/add"
             type="primary">
                Add Vehicle
            </Button>
        </div>
    </div>
  )
}

export default VehiclesListPage