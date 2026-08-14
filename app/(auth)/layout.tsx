import type { ReactNode } from "react"
import Image from "next/image"

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex min-h-screen">
            <section className="bg-brand py-10 px-20 w-[35%] flex flex-col justify-between">
                <div className="flex items-center gap-4">
                    <Image src="/favicon.ico" alt="Logo P" width={100} height={100} />
                    <h1 className="h1 text-white">P-Drive</h1>
                </div>

                <div className="space-y-5 text-white">
                    <h2 className="text-[54px] leading-[62px] font-bold">
                    Manage your files the best way
                    </h2>
                    <hr  border-accent="true"/>
                    <p>This is the perfect place to store all of your documents, images, etc...</p>
                </div>

                <div className="flex justify-center mb-5">
                    <Image src="/file.png" alt="Picture of files" width={340} height={340} />
                </div>
            </section>
            {children}
        </div>
    )
}

export default Layout