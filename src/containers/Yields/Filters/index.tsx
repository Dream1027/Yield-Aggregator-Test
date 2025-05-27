import * as React from 'react'
import { useRouter } from 'next/router'

import { useMedia } from '~/hooks/useMedia'
import { NestedMenu } from '~/components/NestedMenu'
import { YieldFilterDropdowns } from './Dropdowns'
import type { IYieldFiltersProps } from './types'


import { useIsClient } from '~/hooks'
import { useYieldFilters } from '~/contexts/LocalStorage'
import { ButtonLight } from '~/components/ButtonStyled'
import { Icon } from '~/components/Icon'



export function YieldFiltersV2({
	header,
	poolsNumber,
	projectsNumber,
	chainsNumber,
	tokens,
	noOfStrategies,
	strategyInputsData,
	ltvPlaceholder,
	showSearchOnMobile,
	...props
}: IYieldFiltersProps) {
	const trackingStats =
		poolsNumber && projectsNumber && chainsNumber
			? `Tracking ${poolsNumber + (poolsNumber > 1 ? ' pools' : ' pool')} over ${
					projectsNumber + (projectsNumber > 1 ? ' protocols' : ' protocol')
			  } on ${chainsNumber + (chainsNumber > 1 ? ' chains' : ' chain')}.`
			: noOfStrategies
			? `: ${noOfStrategies} Strategies`
			: null

	const isSmall = useMedia(`(max-width: 639px)`)
	const isClient = useIsClient()

	const { query } = useRouter()

	const lend = typeof query.lend === 'string' ? query.lend : null
	const borrow = typeof query.borrow === 'string' ? query.borrow : null

	return (
		<div className="bg-[var(--cards-bg)] rounded-md">
			
			<div className="flex flex-col gap-4 p-3 rounded-b-md"
						style={{background:'rgb(24 141 18 / 44%)'}}
			>
				

				<div className="flex flex-wrap gap-2 min-h-9 *:flex-1 sm:hidden">
					{isSmall && isClient ? (
						<React.Suspense fallback={<></>}>
							<NestedMenu label="Select Staking Platform">
								<YieldFilterDropdowns {...props} nestedMenu />
							</NestedMenu>
						</React.Suspense>
					) : null}
				</div>
				<div className="hidden justify-center flex-wrap gap-2 min-h-8 sm:flex">
					{!isSmall && isClient ? (
						<React.Suspense fallback={<></>}>
							<YieldFilterDropdowns {...props} />
						</React.Suspense>
					) : null}
				</div>
			</div>
		</div>
	)
}

function useFormatTokensSearchList({ searchData }) {
	const data = React.useMemo(() => {
		const stablecoinsSearch = {
			name: `All USD Stablecoins`,
			symbol: 'USD_Stables',
			logo: 'https://icons.llamao.fi/icons/pegged/usd_native?h=48&w=48'
		}

		const yieldsList =
			searchData.map((el) => [
				`${el.name}`,
				{
					name: `${el.name}`,
					symbol: el.symbol.toUpperCase(),
					logo: el.image2 || null,
					fallbackLogo: el.image || null
				}
			]) ?? []

		return Object.fromEntries([[stablecoinsSearch.name, stablecoinsSearch]].concat(yieldsList))
	}, [searchData])

	return { data }
}

const StrategySearch = ({ lend, borrow, searchData, ltvPlaceholder }) => {
	const { data } = useFormatTokensSearchList({ searchData })

	return (
		<div className="flex flex-col md:flex-row md:items-center gap-2 flex-wrap *:flex-1">
			
			
		</div>
	)
}
