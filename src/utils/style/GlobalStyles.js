import { gray, primaryColor, red, secondaryColor, white, yellow } from "./GlobalVariables";

export const Styles = {
    disableBtn: {
        backgroundColor: secondaryColor,
        borderRadius: 8,
        height: "35px",
    },
    disableBtnText: {
        fontFamily: 'Inter-Medium',
        fontSize: 13,
        color: gray
    },
    disableBtnTextYellow: {
        fontFamily: 'Inter-Medium',
        fontSize: 13,
        color: yellow
    },
    activeBtn: {
        backgroundColor: yellow,
        borderRadius: 8,
        height: "35px",
    },
    activeBtnText: {
        fontFamily: 'Inter-Medium',
        fontSize: 13,
        color: primaryColor
    },
    cancelBtn: {
        fontFamily: 'Inter-Medium',
        fontSize: 13,
        color: white,
        cursor: 'pointer'
    },
    deleteModalText: {
        color: white,
        fontFamily: 'Inter-Regular',
        fontSize: 12
    },
    hrBreak: {
        height: 2, borderWidth: 0, color: secondaryColor, backgroundColor: secondaryColor,
        marginTop: 12, marginBottom: 12
    },
    headingTextWhite: {
        color: white,
        fontFamily: 'Inter-Regular',
        fontSize: 13
    },
    normalLeftTextWhite: {
        textAlign: 'left',
        color: white,
        fontFamily: 'Inter-Regular',
        fontSize: 13
    },
    normalTextWhite: {
        color: white,
        fontFamily: 'Inter-Regular',
        fontSize: 13
    },
    normalTextGray: {
        color: gray,
        fontFamily: 'Inter-Regular',
        fontSize: 13
    },
    sideBarAccountDetails: {
        fontSize: 15,
        letterSpacing: "normal",
        color: primaryColor,
        textAlign: 'center',
    },
    sideBarEmailText: {
        fontSize: 11,
        letterSpacing: "normal",
        color: gray,
        textAlign: 'left'
    },
    sideBarDots: {
        cursor: 'pointer',
        position: 'absolute',
        right: 20
    },
    borderTransparent: {
        backgroundColor: secondaryColor,
        borderColor: 'transparent',
        borderWidth: 1
    },
    borderYellow: {
        backgroundColor: secondaryColor,
        borderColor: yellow,
        borderWidth: 1
    },
    smallTextWhite: {
        color: white,
        fontFamily: 'Inter-Regular',
        fontSize: 11
    },
    smallTextGray: {
        color: gray,
        fontFamily: 'Inter-Regular',
        fontSize: 11
    },
    smallTextPrimary: {
        color: primaryColor,
        fontFamily: 'Inter-Regular',
        fontSize: 11
    },
    smallTextYellow: {
        color: yellow,
        fontFamily: 'Inter-Regular',
        fontSize: 11
    },
    mediumTextPrimary: {
        color: primaryColor,
        fontFamily: 'Inter-Medium',
        fontSize: 12
    },
    errorText: {
        fontFamily: 'Inter-Medium',
        fontSize: 13,
        color: red
    },

}