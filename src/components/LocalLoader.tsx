import * as React from 'react'
import Image from 'next/future/image'
import { useNFTApp } from '~/hooks'
import DefiLogo from '~/assets/stake.png'

export const LocalLoader = () => {
	const isNFTApp = useNFTApp()

	return <Image src={DefiLogo} width={72} alt="loading-icon" className="animate-loader" />
}
