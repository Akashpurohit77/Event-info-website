import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import { Separator } from '../ui/separator';
import NavItems from './NavItems';

const MobileNav = () => {

    return (
        <div className='md:hidden'>
            <Sheet>
                <SheetTrigger className='align-middle'>
                    <Image src="/assets/icons/menu.svg" alt='menu' width={24} height={24} className='cursor-pointer' />
                </SheetTrigger>

                <SheetContent className='flex flex-col gap-6 md:hidden bg-white'>
                    <Image
                        src="/assets/images/logo.svg"
                        alt='logo'
                        width={128}
                        height={38}
                    />
                    <Separator className='border border-gray-50' />
                    <NavItems />
                </SheetContent>
                
            </Sheet>
        </div>
    )
}

export default MobileNav
