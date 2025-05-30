import * as Ariakit from '@ariakit/react'
import { matchSorter } from 'match-sorter'
import * as React from 'react'
import { Tooltip } from './Tooltip'
import { Icon } from './Icon'

interface ISelectWithCombobox {
	allValues:
		| Array<{ key: string; name: string; help?: string; isCustom?: boolean; customIndex?: number }>
		| Array<string>
	selectedValues: Array<string>
	setSelectedValues: React.Dispatch<React.SetStateAction<Array<string>>>
	label: string
	clearAll?: () => void
	toggleAll?: () => void
	selectOnlyOne?: (value: string) => void
	labelType?: 'regular' | 'smol' | 'none'
	triggerProps?: Ariakit.SelectProps
	customFooter?: React.ReactNode
	onEditCustomColumn?: (idx: number) => void
	onDeleteCustomColumn?: (idx: number) => void
	portal?: boolean
}

export function SelectWithCombobox({
	allValues,
	selectedValues,
	setSelectedValues,
	label,
	clearAll,
	toggleAll,
	selectOnlyOne,
	labelType,
	triggerProps,
	customFooter,
	onEditCustomColumn,
	onDeleteCustomColumn,
	portal
}: ISelectWithCombobox) {
	const [searchValue, setSearchValue] = React.useState('')

	const valuesAreAnArrayOfStrings = typeof allValues[0] === 'string'

	const matches = React.useMemo(() => {
		if (valuesAreAnArrayOfStrings) {
			return matchSorter(allValues as Array<string>, searchValue, {
				baseSort: (a, b) => (a.index < b.index ? -1 : 1),
				threshold: matchSorter.rankings.CONTAINS
			})
		}

		return matchSorter(allValues as Array<{ name: string }>, searchValue, {
			baseSort: (a, b) => (a.index < b.index ? -1 : 1),
			keys: ['name'],
			threshold: matchSorter.rankings.CONTAINS
		})
	}, [valuesAreAnArrayOfStrings, allValues, searchValue])

	const [viewableMatches, setViewableMatches] = React.useState(20)


	return (
		<Ariakit.ComboboxProvider
			resetValueOnHide
			setValue={(value) => {
				React.startTransition(() => {
					setSearchValue(value)
				})
			}}
		>
			<Ariakit.SelectProvider
				value={selectedValues}
				setValue={(values) => {
					setSelectedValues(values)
				}}
			>
				<Ariakit.Select
					className="bg-[var(--btn-bg)] hover:bg-[var(--btn-hover-bg)] focus-visible:bg-[var(--btn-hover-bg)] flex items-center gap-2 py-2 px-3 text-xs rounded-md cursor-pointer text-[var(--text1)] flex-nowrap"
					{...triggerProps}
				>
					{labelType === 'smol' ? (
						<span className="flex items-center gap-1">
							<span className="text-[10px] -my-2 rounded-full min-w-4 flex items-center justify-center border border-[var(--form-control-border)] p-[1px]">
								{selectedValues.length}
							</span>
							<span>{label}</span>
						</span>
					) : labelType === 'regular' && selectedValues.length > 0 ? (
						<>
							<span>{label}: </span>
							<span className="text-[var(--link)]">
								{selectedValues.length > 2
									? `${selectedValues[0]} + ${selectedValues.length - 1} others`
									: selectedValues.join(', ')}
							</span>
						</>
					) : (
						<span>{label}</span>
					)}
					<Ariakit.SelectArrow />
				</Ariakit.Select>
				<Ariakit.SelectPopover
					unmountOnHide
					hideOnInteractOutside
					gutter={6}
					wrapperProps={{
						className: 'max-sm:!fixed max-sm:!bottom-0 max-sm:!top-[unset] max-sm:!transform-none max-sm:!w-full'
					}}
					className="flex flex-col bg-[var(--bg1)] rounded-md max-sm:rounded-b-none z-10 overflow-auto overscroll-contain min-w-[180px] border border-[hsl(204,20%,88%)] dark:border-[hsl(204,3%,32%)] max-sm:drawer h-full max-h-[70vh] sm:max-h-[60vh]"
					portal={portal || false}
				>
					<Ariakit.Combobox
						placeholder="Search..."
						autoFocus
						className="bg-white dark:bg-black rounded-md text-base py-1 px-3 m-3 mb-0"
					/>

					{matches.length > 0 ? (
						<>
							{clearAll || toggleAll ? (
								<span className="sticky z-[1] top-0 flex flex-wrap justify-between gap-1 bg-[var(--bg1)] text-[var(--link)] text-xs border-b border-[var(--form-control-border)]">
									{clearAll ? (
										<button onClick={clearAll} className="p-3">
											Clear
										</button>
									) : null}
									{toggleAll ? (
										<button onClick={toggleAll} className="p-3">
											Toggle all
										</button>
									) : null}
								</span>
							) : null}
							<Ariakit.ComboboxList>
								{matches.slice(0, viewableMatches + 1).map((option) => {
									const isCustom = typeof option === 'object' && option.isCustom
									return (
										<Ariakit.SelectItem
											key={`${label}-${valuesAreAnArrayOfStrings ? option : option.key}`}
											value={valuesAreAnArrayOfStrings ? option : option.key}
											className="group flex items-center gap-2 py-2 px-3 flex-shrink-0 hover:bg-[var(--primary1-hover)] focus-visible:bg-[var(--primary1-hover)] data-[active-item]:bg-[var(--primary1-hover)] cursor-pointer last-of-type:rounded-b-md border-b border-[var(--form-control-border)]"
											render={<Ariakit.ComboboxItem />}
										>
											{valuesAreAnArrayOfStrings ? (
												<span>{option}</span>
											) : option.help ? (
												<Tooltip content={option.help}>
													<span className="mr-1">{option.name}</span>
													<Icon name="help-circle" height={15} width={15} />
												</Tooltip>
											) : (
												<span>{option.name}</span>
											)}
											{isCustom && typeof option.customIndex === 'number' && (
												<span className="flex gap-1 ml-2">
													<button
														type="button"
														tabIndex={-1}
														className="p-1 rounded hover:bg-[var(--btn-hover-bg)]"
														onClick={(e) => {
															e.stopPropagation()
															onEditCustomColumn && onEditCustomColumn(option.customIndex!)
														}}
														title="Edit custom column"
													>
														<Icon name="settings" height={14} width={14} />
													</button>
													<button
														type="button"
														tabIndex={-1}
														className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900"
														onClick={(e) => {
															e.stopPropagation()
															onDeleteCustomColumn && onDeleteCustomColumn(option.customIndex!)
														}}
														title="Delete custom column"
													>
														<Icon name="trash-2" height={14} width={14} />
													</button>
												</span>
											)}
											{selectOnlyOne ? (
												<button
													onClick={(e) => {
														e.stopPropagation()
														selectOnlyOne(valuesAreAnArrayOfStrings ? option : option.key)
													}}
													className="font-medium text-xs text-[var(--link)] underline hidden group-hover:inline-block group-focus-visible:inline-block"
												>
													Only
												</button>
											) : null}
											<Ariakit.SelectItemCheck className="ml-auto h-3 w-3 flex items-center justify-center rounded-sm flex-shrink-0 border border-[#28a2b5]" />
										</Ariakit.SelectItem>
									)
								})}
							</Ariakit.ComboboxList>
							{matches.length > viewableMatches ? (
								<button
									className="w-full py-4 px-3 text-[var(--link)] hover:bg-[var(--bg2)] focus-visible:bg-[var(--bg2)]"
									onClick={() => setViewableMatches((prev) => prev + 20)}
								>
									See more...
								</button>
							) : null}
							{customFooter ? (
								<div className="mt-2 border-t border-[var(--form-control-border)] pt-2">{customFooter}</div>
							) : null}
						</>
					) : (
						<p className="text-[var(--text1)] py-6 px-3 text-center">No results found</p>
					)}
				</Ariakit.SelectPopover>
			</Ariakit.SelectProvider>
		</Ariakit.ComboboxProvider>
	)
}
