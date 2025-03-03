import { Carousel } from 'flowbite-react'

import Image from 'next/image';
import Link from 'next/link';
import { getBanner } from '@/app/api/home/banner/route';
import { BannerListProps } from '@/utils/types/BannerType';
import Skeleton from '@/components/ui/Skeleton';


const Banner = async () => {
    const response = await getBanner('start', 4);
    const bstate: { status: number, msg: BannerListProps[] } = await response.json();
    if (bstate.status === 400) {
        return;
    }

    return (
        <div className="h-28 sm:h-64 xl:h-80 2xl:h-96">
            {bstate.msg.length ? <Carousel>
                {bstate ? bstate.msg.map((item) => {
                    return <Link href={item.bannerurl} target="_blank" key={item.bid} ><Image src={item.bimageurl} alt="" /></Link>
                }) : ''}
            </Carousel> : <Skeleton />}
        </div>
    )
}

export default Banner;