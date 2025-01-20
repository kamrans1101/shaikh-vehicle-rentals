'use client'
import { getDateTimeFormat } from '@/helpers/date-time-formats'
import { IVehicle } from '@/interfaces'
import { Button, message, Table } from 'antd'
import { Edit2, Trash2 } from 'lucide-react'
import React from 'react'
import { useRouter } from 'next/navigation'
import { deleteVehicleById } from '@/server-actions/vehicles'

interface IVehicleTableProps {
    vehicles: IVehicle[]
}

function VehicleTable({ vehicles }: IVehicleTableProps) {
    const router = useRouter()
    const deleteVehicle = async (id: any) => {
        try {
            const response = await deleteVehicleById(id)
            console.log(response)
            router.replace('/admin/vehicles');

        } catch (error: any) {
            message.error(error.message)
        }
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category'
        },
        {
            title: 'Model',
            dataIndex: 'model',
            key: 'model'
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand'
        },
        {
            title: 'Rent Per Day',
            dataIndex: 'rentPerDay',
            key: 'rentPerDay'
        },
        {
            title: 'Added On',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => getDateTimeFormat(date)
        },
        {
            title: 'Action',
            key: 'createdAt',
            render: (text: string, record: IVehicle) => (
                <div className="flex gap-3">
                    <Button size="small" onClick={() => router.push(`/admin/vehicles/edit/${record._id}`)}>
                        <Edit2 size={14} />
                    </Button>
                    <Button size="small" onClick={() => deleteVehicle(record._id)}>
                        <Trash2 size={14} />
                    </Button>
                </div>
            )
        }
    ]

    return (
        <Table dataSource={vehicles} columns={columns} />
    )
}

export default VehicleTable