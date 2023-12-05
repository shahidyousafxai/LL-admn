
// Local Imports
import { Styles } from '../utils/style/GlobalStyles';
import { secondaryColor } from '../utils/style/GlobalVariables'

const DisabledTextField = ({
    className, inputClassName, marginTop, label, value
}) => {

    return <div className={`mt-5 ${className} w-full`}>
        <p style={Styles.smallTextWhite}>
            {label}
        </p>
        <div className={`flex items-center ${inputClassName} h-[44px] ${marginTop ? `mt-${marginTop}` : 'mt-[5px]'} pl-[12px] rounded-lg bg-[${secondaryColor}]`}
        >
            <p style={Styles.normalTextGray}>
                {value}
            </p>
        </div>
    </div>
}

export default DisabledTextField;