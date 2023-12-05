
// Local Imports
import DisabledTextField from '../../../../../../components/disableInputField.js';
import TextField from '../../../../../../components/inputField.js'


const Payments = ({ newUnit, onChange }) => {
    return (
        <div className='-mt-4 px-3 h-[480px] overflow-y-scroll'>

            {/* Maintenance Fee and Rental Fee Row */}
            <div className="flex items-start justify-start gap-5">

                <div className="item w-1/2">
                    <DisabledTextField label={"Maintenance Fee"} value={newUnit?.maintenanceFee} />
                </div>

                <div className="item w-1/2">
                    <DisabledTextField label={"Monthly Lease Amount"} value={newUnit?.monthlyLeaseAmount} />
                </div>
            </div>

            {/* Insurance Fee and Payer Row */}
            <div className="flex items-start justify-start gap-5">

                <div className="item w-1/2">
                    <DisabledTextField label={"Insurance Fee"} value={newUnit?.lastLogin} />
                </div>

                <div className="item w-1/2">
                    <DisabledTextField
                        label={"Payer"}
                        value={newUnit?.lessee !== '' ? newUnit?.lesseeName : newUnit?.owner !== '' ? newUnit?.ownerName : 'LuxeLocker'}
                    />
                </div>

            </div>


        </div >
    )
}

export default Payments;