import { IUser } from '@/interfaces';
import { getCurrentUserDataFromMongoDB } from '@/server-actions/users';
import { Alert, Drawer, message } from 'antd';
import { Menu } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import MenuItems from './menu-items';
import { usersGlobalStore, IUsersGlobalStore } from '@/store/user-store';
import Spinner from '@/app/components/spinner';
import { useRouter } from 'next/navigation';


function PrivateLayout({ children }: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const { loggedinUserData, setLoggedinUserData } = usersGlobalStore() as IUsersGlobalStore;
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showMenuItems, setShowMenuItems] = useState(false)

    const getData = async () => {
        try {
            const response = await getCurrentUserDataFromMongoDB()
            if (response.success) {
                setLoggedinUserData(response.data as IUser)
                console.log(response.data)
            }
            else {
                setError(response.message)
            }
        } catch (error: any) {
            message.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData();
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner />
            </div>
        )
    }
    if (error) {
        return (
            <Alert message={error} type="error" />
        )
    }
    return (
        <div>
            <div className='flex justify-between items-center bg-primary p-5'>
                <img src="/logo.jpg" className='h-14 w-20 cursor-pointer' onClick={() => router.push("/vehicles")}/>
                <div className="flex gap-5 text-white text-sm">
                    <span>{loggedinUserData?.email}</span>
                    <Menu
                        size={16}
                        className="cursor-pointer"
                        onClick={() => setShowMenuItems(!showMenuItems)} />
                </div>
                {showMenuItems && loggedinUserData && (
                    <Drawer
                        open={showMenuItems}
                        onClose={() => setShowMenuItems(false)}
                        width={300}>
                        <MenuItems loggedInUserData={loggedinUserData} setShowMenuItems={setShowMenuItems}/>
                    </Drawer>
                )}
            </div>
            <div className='p-5'>
                {children}
            </div>
        </div>

    )
}

export default PrivateLayout