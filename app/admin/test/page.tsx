import Image from "@/components/shared/Image"
import { prisma } from "@/lib/prisma"

const MainPage = async () => {
    const stats = await prisma.cameFrom.findMany({
        include: {
            _count: true
        }
    })
    console.log(stats)
    return (
        <div></div>
    )
}

export default MainPage