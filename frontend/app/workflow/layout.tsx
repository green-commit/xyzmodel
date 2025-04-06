import Logo from '@/components/partials/Logo'
import { ModeToggle } from '@/components/partials/ThemeModeToggle'
import { Separator } from '@/components/ui/separator'
import React from 'react'

function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col w-full h-screen">
            {children}
            <Separator />
            <footer className="flex items-center justify-between p-2">
                <Logo fontSize="text-xl" iconSize={16} />
                <ModeToggle />
            </footer>
        </div>
    )
}

export default layout