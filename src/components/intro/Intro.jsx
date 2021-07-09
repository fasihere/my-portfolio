import "./intro.scss"

export default function intro() {
    return (
        <div className="intro" id="intro"> 
            <div className="left">
                <div className="imgContainer">
                    <img src="assets/man.png" alt="a man" />
                </div>
            </div>
            <div className="right">
                <div className="wrapper">
                    <h1>Faseeh Ahmed</h1>
                    <h3>Engineering <span>Design</span> Undergrad</h3>
                </div>
                <a href="#portfolio">
                    <img src="assets/down.png" alt="down arrow icon" />
                </a>
            </div>
        </div>
    )
}
