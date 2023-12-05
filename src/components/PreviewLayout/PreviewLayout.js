import Appbar from "./Appbar"
import Footer from "./Footer"

const PreviewLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Appbar />
            <div className="flex-1 mt-[82px] max-w-[1200px] items-center justify-center mx-auto">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default PreviewLayout