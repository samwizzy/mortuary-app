import React, { useEffect } from "react"
import { useDispatch, connect } from "react-redux"
import { withRouter } from "react-router-dom"
import moment from "moment"
import * as Actions from "../../store/actions"
import VaultDetailsSkeleton from "./VaultSkeleton"

function VaultDetails(props) {
	const { match, vault } = props
	const dispatch = useDispatch()

	console.log(vault, "vault")

	useEffect(() => {
		dispatch(Actions.getVaultById(match.params.id))
	}, [dispatch, match.params.id])

  return (
    <div className="bg-white overflow-hidden sm:rounded-lg px-24">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-bold text-gray-900">Vault Details</h3>
      </div>
      {vault
        ? (
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-600">Vault Number</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{vault?.vaultNumber}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-600">Vault type</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{vault?.vaultType}</dd>
              </div>
              <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-600">Name of deceased</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{vault?.nameOfDeceased}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-600">Email address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{vault?.emailAddress}</dd>
              </div>
              <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-600">Phone number</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{vault?.phoneNumber}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-600">Date Buried</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{moment(vault?.dateBuried).format("Do MMM, YYYY")}</dd>
              </div>
              <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-600">Purchaser one</dt>
                <div className="flex space-x-24">
                  <dd className="mt-1 flex flex-col justify-center text-sm text-gray-900 text-left sm:mt-0 sm:col-span-2">
                    <span className="text-xs font-bold">Name</span>
                    {vault?.purchaserOne?.name}
                  </dd>
                  <dd className="mt-1 flex flex-col justify-center text-sm text-left text-gray-900 sm:mt-0 sm:col-span-2">
                    <span className="text-xs font-bold">Email</span>
                    {vault?.purchaserOne?.email}
                  </dd>
                </div>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-600">Purchaser two</dt>
                <div className="flex space-x-24">
                  <dd className="mt-1 flex flex-col justify-center text-sm text-gray-900 text-left sm:mt-0 sm:col-span-2">
                    <span className="text-xs font-bold">Name</span>
                    {vault?.purchaserTwo?.name}
                  </dd>
                  <dd className="mt-1 flex flex-col justify-center text-sm text-left text-gray-900 sm:mt-0 sm:col-span-2">
                    <span className="text-xs font-bold">Email</span>
                    {vault?.purchaserTwo?.email}
                  </dd>
                </div>
              </div>
              <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-600">Address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {vault?.address}
                </dd>
              </div>
            </dl>
          </div>
        )
        : <VaultDetailsSkeleton />
      }
    </div>
  )
}

const mapStateToProps = ({vaultsApp}) => {
	const { vaults } = vaultsApp
	return {
		vault: vaults.vault
	}
}

export default withRouter(connect(mapStateToProps)(VaultDetails))