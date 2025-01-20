'use server'

import { IVehicle } from "@/interfaces"
import VehicleModel from "@/models/vehicle-models"
import { revalidatePath } from "next/cache"

export const addVehicle = async (payload: Partial<IVehicle>) => {
    try {
        await VehicleModel.create(payload)
        revalidatePath('admin/vehicles')
        return {
            success: true,
            message: 'Vehicle added successfully'
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}

export const getAllVehicles = async (filters: any) => {
    try {

        let query = {};
        if(filters.category) {
            query = {category: filters.category}
        }
        const vehicles = await VehicleModel.find(query)

        return {
            success: true,
            data: JSON.parse(JSON.stringify(vehicles))
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}

export const getVehicleById = async (id: string) => {
    try {
        const vehicle = await VehicleModel.findById(id)
        if (!vehicle) {
            return {
                success: false,
                message: 'Vehicle not found'
            }
        }

        return {
            success: true,
            data: JSON.parse(JSON.stringify(vehicle))
        }

    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}

export const editVehicleById = async ({ id, vehicleData }: { id: string, vehicleData: Partial<IVehicle> }) => {
    try {
        await VehicleModel.findByIdAndUpdate(id, vehicleData)
        revalidatePath('admin/vehicles')

        return {
            success: true,
            message: "Vehicle Updated Successfully"
        }

    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}

export const deleteVehicleById = async (id: string) => {
    try {
        const deletedVehicle = await VehicleModel.findByIdAndDelete(id);
        if (!deletedVehicle) {
            console.log('Vehicle not found');
            return { success: false, message: 'Vehicle not found' };
        }

        return {
            success: true,
            message: "Vehicle Deleted Successfully"
        }

    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}