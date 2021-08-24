import Button from '../../../components/Button'
import { ChevronLeftIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { t } from '@lingui/macro'
import Typography from '../../../components/Typography'
import { CurrencyLogoArray } from '../../../components/CurrencyLogo'
import Chip from '../../../components/Chip'
import { POOL_TYPES } from '../constants'
import { useLingui } from '@lingui/react'
import { useTridentPoolPageContext } from './context'
import { toHref } from '../../../hooks/useTridentPools'

const Header = () => {
  const { i18n } = useLingui()
  const { pool } = useTridentPoolPageContext()

  return (
    <div className="flex flex-col">
      <div className="flex flex-col bg-dark-900">
        <div className="flex flex-row p-5 justify-between bg-dots-pattern">
          <div className="flex flex-col items-start gap-5">
            <Button
              color="blue"
              variant="outlined"
              size="sm"
              className="rounded-full py-1 pl-2"
              startIcon={<ChevronLeftIcon width={24} height={24} />}
            >
              <Link href={'/trident/pools'}>{i18n._(t`Pools`)}</Link>
            </Button>

            {/*spacer*/}
            <div className="h-2" />
          </div>
          <div className="flex flex-col text-right gap-2">
            <Typography variant="sm">{i18n._(t`APY (Annualized)`)}</Typography>
            <div className="flex flex-col">
              <Typography variant="h3" className="text-high-emphesis" weight={700}>
                {pool.apy}
              </Typography>
              <Typography variant="xxs" className="text-secondary">
                {i18n._(t`Including fees`)}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 mt-[-32px] flex flex-col gap-2">
        <CurrencyLogoArray currencies={pool.tokens} size={64} />
        <div className="flex flex-row gap-2 items-center">
          <Typography variant="h2" className="text-high-emphesis" weight={700}>
            {pool.tokens.map((token) => token.symbol).join('-')}
          </Typography>
          {pool.isFarm && (
            <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.7904 0.209709C13.8911 0.310448 13.9514 0.444652 13.9598 0.586872C14.2861 6.13511 12.6133 10.5787 9.48509 12.4733C8.48307 13.0873 7.33013 13.4106 6.15499 13.4073C6.0744 13.4073 5.9937 13.4059 5.91246 13.403C4.7522 13.3616 3.58099 13.0232 2.42495 12.3978L9.71849 5.10422C9.82746 4.99511 9.88865 4.84719 9.8886 4.69298C9.88856 4.53877 9.82727 4.39089 9.71823 4.28185C9.60919 4.17281 9.46131 4.11153 9.3071 4.11148C9.15289 4.11143 9.00497 4.17262 8.89586 4.28159L1.6023 11.5751C0.976917 10.4191 0.638475 9.24787 0.59713 8.08762C0.54634 6.83095 0.86991 5.58751 1.5268 4.515C3.4214 1.38674 7.86429 -0.286347 13.4132 0.0403245C13.5554 0.0486991 13.6896 0.10897 13.7904 0.209709ZM1.60229 11.5751C1.67406 11.7078 1.74866 11.8403 1.82801 11.9726C1.87712 12.0545 1.94565 12.123 2.02754 12.1721C2.15975 12.2514 2.29227 12.326 2.42493 12.3978L0.993024 13.8297C0.883927 13.9388 0.735964 14.0001 0.581685 14.0001C0.427406 14.0001 0.279448 13.9388 0.170361 13.8297C0.0612741 13.7206 -6.67704e-06 13.5726 5.45671e-10 13.4183C6.68032e-06 13.2641 0.0613004 13.1161 0.170397 13.007L1.60229 11.5751Z"
                  fill="#0993EC"
                />
              </svg>
              <Typography variant="sm" weight={700} className="text-blue">
                {i18n._(t`Farm`)}
              </Typography>
            </>
          )}
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Chip label={POOL_TYPES[pool.type].label} color={POOL_TYPES[pool.type].color} />
          <Typography weight={700} variant="sm">
            {pool.fee} {i18n._(t`Fees`)}
          </Typography>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 px-5 pt-6">
        <Button variant="outlined" color="gradient" className="text-high-emphesis">
          <Link href={`/trident/add/${toHref(pool)}`}>
            {pool.isFarm ? i18n._(t`Add Liquidity / Stake`) : i18n._(t`Add Liquidity`)}
          </Link>
        </Button>
        <Button variant="outlined" color="gradient" className="text-high-emphesis">
          <Link href={`/trident/remove/${toHref(pool)}`}>{i18n._(t`Remove Liquidity`)}</Link>
        </Button>
        <Button variant="outlined" color="gray" className="w-full col-span-2 text-high-emphesis py-3" size="xs">
          {i18n._(t`View Analytics`)}
        </Button>
      </div>
    </div>
  )
}

export default Header
