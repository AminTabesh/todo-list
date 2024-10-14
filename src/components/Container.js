import Footer from "./Footer"
import Header from "./Header"
import Main from "./Main"


function Container() {
    return (
        <div className="rounded-2xl bg-white w-11/12 h-5/6 p-5">
            <Header />
            <Main />
            <Footer />
        </div>
    )
}

export default Container
