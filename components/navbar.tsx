import { auth, UserButton } from '@clerk/nextjs'
import React from 'react'

import { MainNav } from "@/components/main-nav"
import StoreSwitcher from "@/components/store-switcher"
import { redirect } from 'next/navigation'
import prismadb from '@/lib/prismadb'

type Props = {}

const Navbar = async (props: Props) => {
    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in")
    }

    const stores = await prismadb.store.findMany({
        where: {
            userId,
        }
    });

    return (
        <div className='border-b'>
            <div className="flex h-16 items-center px-4">
                <StoreSwitcher
                    items={stores}
                />
                <MainNav className='mx-6' />
                <div className='ml-auto flex items-center space-x-4'>
                    <UserButton afterSignOutUrl='/' />
                </div>
            </div>
        </div>
    )
}

export default Navbar