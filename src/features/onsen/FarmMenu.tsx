import { ChainId, CurrencyAmount } from '@dogebark/sdk'
import NavLink from '../../components/NavLink'
import React from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useActiveWeb3React } from '../../hooks'
import { useWalletModalToggle } from '../../state/application/hooks'
import { Chef } from './enum'
import useMasterChef from './useMasterChef'
import { MIST } from '../../config/tokens'

const Menu = ({ positionsLength, farms }) => {
  const { account, chainId } = useActiveWeb3React()
  const { i18n } = useLingui()
  const toggleWalletModal = useWalletModalToggle()

  const { harvestAll } = useMasterChef(Chef.MASTERCHEF)
  const zero = CurrencyAmount.fromRawAmount(MIST[chainId], 0)
  const userFarms = [...(farms || [])].filter((farm) => farm.pending)
  const total = userFarms ? userFarms.reduce((sum, farm) => farm.pendingSushi.add(sum), zero) : zero
  const totalLockedUsd = userFarms ? userFarms.reduce((sum, farm) => (farm.positionUsd || 0) + sum, 0) : 0

  return (
    <div className="space-y-4">
      {account ? (
        <NavLink
          exact
          href={`/farm?filter=portfolio`}
          activeClassName="font-bold bg-transparent border rounded text-high-emphesis border-transparent border-gradient-r-blue-pink-dark-900"
        >
          <a className="flex items-center justify-between px-2 py-3 text-base font-bold border border-transparent rounded cursor-pointer md:px-4 md:py-6 bg-dark-900 hover:bg-dark-800">
            Your Farms
          </a>
        </NavLink>
      ) : (
        <a
          className="flex items-center justify-between px-2 py-3 text-base font-bold border border-transparent rounded cursor-pointer striped-background text-secondary md:px-4 md:py-6 bg-dark-900 hover:bg-dark-800"
          onClick={toggleWalletModal}
        >
          Your Farms
        </a>
      )}

      <div className="hidden w-full h-0 font-bold bg-transparent border border-b-0 border-transparent rounded md:block text-high-emphesis md:border-gradient-r-blue-pink-dark-800 opacity-20" />

      <NavLink
        href="/farm?filter=all"
        activeClassName="font-bold bg-transparent border rounded text-high-emphesis border-transparent border-gradient-r-blue-pink-dark-900"
      >
        <a className="flex items-center justify-between px-2 py-3 text-base font-bold border border-transparent rounded cursor-pointer md:px-4 md:py-6 bg-dark-900 hover:bg-dark-800">
          {i18n._(t`All Farms`)}
        </a>
      </NavLink>

      <NavLink
        href="/farm?filter=past"
        activeClassName="font-bold bg-transparent border rounded text-high-emphesis border-transparent border-gradient-r-blue-pink-dark-900"
      >
        <a className="flex items-center justify-between px-2 py-3 text-base font-bold border border-transparent rounded cursor-pointer md:px-4 md:py-6 bg-dark-900 hover:bg-dark-800">
          {i18n._(t`Past Farms`)}
        </a>
      </NavLink>

      {total.greaterThan(0) && (
        <a
          className="flex items-center justify-between px-4 py-6 text-base font-bold border border-transparent rounded cursor-pointer bg-dark-900 hover:bg-dark-800"
          onClick={async () => await harvestAll(userFarms)}
        >
          {i18n._(t`Harvest all: ${total.toFixed(2)} DOGEBARK`)}
        </a>
      )}

      {totalLockedUsd > 0 && (
        <a
          className="flex items-center justify-between px-4 py-6 text-base font-bold border border-transparent rounded cursor-pointer bg-dark-900 hover:bg-dark-800"
          onClick={async () => {}}
        >
          {i18n._(t`In farms: $${Number(totalLockedUsd).toFixed(2)}`)}
        </a>
      )}

      {/*chainId === ChainId.MAINNET && (
        <>
          <NavLink
            exact
            href={`/farm?filter=kashi`}
            activeClassName="font-bold bg-transparent border rounded text-high-emphesis border-transparent border-gradient-r-blue-pink-dark-900"
          >
            <a className="flex items-center justify-between px-2 py-3 text-base font-bold border border-transparent rounded cursor-pointer md:px-4 md:py-6 bg-dark-900 hover:bg-dark-800">
              Kashi Farms
            </a>
          </NavLink>
          <NavLink
            exact
            href={`/farm?filter=sushi`}
            activeClassName="font-bold bg-transparent border rounded text-high-emphesis border-transparent border-gradient-r-blue-pink-dark-900"
          >
            <a className="flex items-center justify-between px-2 py-3 text-base font-bold border border-transparent rounded cursor-pointer md:px-4 md:py-6 bg-dark-900 hover:bg-dark-800">
              DOGEBARK Farms
            </a>
          </NavLink>
        </>
      )*/}

      {/*(chainId === ChainId.MAINNET || chainId === ChainId.MATIC) && (
        <NavLink
          exact
          href={`/farm?filter=2x`}
          activeClassName="bg-transparent border rounded text-high-emphesis border-transparent border-gradient-r-blue-pink-dark-900"
        >
          <a className="flex items-center justify-between px-2 py-3 text-base font-bold border border-transparent rounded cursor-pointer md:px-4 md:py-6 bg-dark-900 hover:bg-dark-800">
            2x Reward Farms
          </a>
        </NavLink>
      )*/}
      <div className="w-full h-0 font-bold bg-transparent border border-b-0 border-transparent rounded md:hidden text-high-emphesis md:border-gradient-r-blue-pink-dark-800 opacity-20" />
    </div>
  )
}

export default Menu
