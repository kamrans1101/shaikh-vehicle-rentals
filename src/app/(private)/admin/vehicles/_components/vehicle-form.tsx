'use client'

import { vehiclesCategories } from '@/constants'
import { uploadFilesToFirebaseAndReturnsUrls } from '@/helpers/firebase-helpers'
import { addVehicle, editVehicleById } from '@/server-actions/vehicles'
import { Button, Form, Input, Select, Upload } from 'antd'
import React from 'react'
import { message } from 'antd';
import { isNull } from 'util'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';

interface IVehicleFormProps {
    type: 'add' | 'edit',
    vehicleData: any // We will update this later
}

function VehicleForm({ type, vehicleData }: IVehicleFormProps) {

    const [uploadedFiles, setUploadedFiles] = React.useState<any[]>([])
    const [loading, setLoading] = React.useState(false)
    const [existingFileUrls, setExistingUrls] = React.useState<string[]>(vehicleData?.media || [])
    const router = useRouter()
    const onFinish = async (values: any) => {
        try {
            setLoading(true)
            const newMedia = await uploadFilesToFirebaseAndReturnsUrls(uploadedFiles) 
            values.media = [...existingFileUrls, ...newMedia]
            let response: any = null;
            if (type === 'add') {
                response = await addVehicle(values)
                console.log(response)
            } else {
                response = await editVehicleById({ id: vehicleData._id, vehicleData: values })
                console.log(response)
            }

            if (response.success) {
                toast.success(response.message)
                //message.success(response.message);
                router.push("/admin/vehicles")
            } else {
                message.error(response.message)
            }
            console.log(values)
        } catch (error: any) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const onFileRemove = (file: any) => {
        try {
            const isExisting = existingFileUrls.includes(file.url)
            if (isExisting) {
                setExistingUrls(existingFileUrls.filter((url) => url !== file.url))

            } else {
                setUploadedFiles(uploadedFiles.filter((f) => f.uid !== file.uid))
            }

        } catch (error: any) {
            message.error(error.message)
        }
    }

    let selectedMediaFiles: any = [];

    existingFileUrls.forEach((url) => {
        selectedMediaFiles.push({
            uid: url,
            name: url,
            status: "done",
            url
        })
    })

    uploadedFiles.forEach((file) => {
        selectedMediaFiles.push({
            ...file,
            url: URL.createObjectURL(file)
        })  
    })

    return (
        <Form
            layout='vertical'
            onFinish={onFinish}
            initialValues={vehicleData}
        >

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="col-span-4">
                    <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Please input name' }]}>
                        <Input />
                    </Form.Item>
                </div>
                <Form.Item name='category' label='Category'
                    rules={[{ required: true, message: 'Please input category' }]}>
                    <Select placeholder="Select Category" options={vehiclesCategories} />
                </Form.Item>

                <Form.Item name='brand' label='Brand' rules={[{ required: true, message: 'Please input brand' }]}>
                    <Input />
                </Form.Item>

                <Form.Item name='model' label='Model' rules={[{ required: true, message: 'Please input model' }]}>
                    <Input />
                </Form.Item>

                <Form.Item name='rentPerDay' label='Rent Per Hour' rules={[{ required: true, message: 'Please input rent per hour' }]}>
                    <Input />
                </Form.Item>

                <div className="col-span-4">
                    <Upload
                        listType="picture-card"
                        beforeUpload={(file) => {
                            setUploadedFiles([...uploadedFiles, file]);
                            return false;
                        }}
                        fileList={selectedMediaFiles}
                        onRemove={onFileRemove}>
                        <span className="text-xs">
                            Upload Media
                        </span>
                    </Upload>
                </div>

                <div className="col-span-4 flex justify-end gap-5">
                    <Button onClick = {() => router.push("/admin/vehicles")}>
                        Cancel
                    </Button>

                    <Button type="primary" htmlType="submit" loading={loading}>
                        Save
                    </Button>
                </div>
            </div>

        </Form>
    )
}

export default VehicleForm