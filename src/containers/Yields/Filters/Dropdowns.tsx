import { useRouter } from 'next/router'
import { FilterByToken } from './Tokens'
import { FilterByChain } from './Chains'

import { YieldProjects } from './Projects'

import type { IDropdownMenusProps } from './types'
import { YIELDS_SETTINGS } from '~/contexts/LocalStorage'

const BAD_DEBT_KEY = YIELDS_SETTINGS.NO_BAD_DEBT.toLowerCase()

export function YieldFilterDropdowns({
	pathname,
	tokensList,
	selectedTokens,
	chainList,
	selectedChains,
	projectList,
	selectedProjects,
	lendingProtocols,
	selectedLendingProtocols,
	farmProtocols,
	selectedFarmProtocols,

	selectedAttributes,

	nestedMenu,

}: IDropdownMenusProps) {
	const router = useRouter()

	const isBadDebtToggled = selectedAttributes ? selectedAttributes.includes(BAD_DEBT_KEY) : false

	const shouldExlcudeRewardApy = router.query.excludeRewardApy === 'true' ? true : false

	const shouldIncludeLsdApy = router.query.includeLsdApy === 'true' ? true : false

	return (
		<>
			{tokensList && tokensList.length > 0 && (
				<FilterByToken
					tokensList={tokensList}
					selectedTokens={selectedTokens || []}
					pathname={pathname || router.pathname}
					nestedMenu={nestedMenu}
				/>
			)}

			{chainList && chainList.length > 0 && (
				<FilterByChain
					chainList={chainList}
					selectedChains={selectedChains || []}
					pathname={pathname || router.pathname}
					nestedMenu={nestedMenu}
				/>
			)}

			{projectList && projectList.length > 0 && (
				<YieldProjects
					projectList={projectList}
					selectedProjects={selectedProjects || []}
					pathname={pathname || router.pathname}
					label="Projects"
					nestedMenu={nestedMenu}
				/>
			)}

			{lendingProtocols && lendingProtocols.length > 0 && (
				<YieldProjects
					projectList={lendingProtocols}
					selectedProjects={selectedLendingProtocols || []}
					pathname={pathname || router.pathname}
					label="Lending Protocols"
					query="lendingProtocol"
					nestedMenu={nestedMenu}
				/>
			)}

			{farmProtocols && farmProtocols.length > 0 && (
				<YieldProjects
					projectList={farmProtocols}
					selectedProjects={selectedFarmProtocols || []}
					pathname={pathname || router.pathname}
					label="Farm Protocol"
					query="farmProtocol"
					nestedMenu={nestedMenu}
				/>
			)}

	


		</>
	)
}
