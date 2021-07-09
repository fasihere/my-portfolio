import "./portfolio.scss"

export default function Portfolio() {

    const list = [
        {
            id: "1",
            title: "Python",
            img:
              "./assets/data/py.jpeg",
          },
          {
            id: "2",
            title: "C++",
            img:
            "/assets/data/cpp.png",
          },
          {
            id: "3",
            title: "Javascript",
            img:
              "/assets/data/js.png",
          },
          {
            id: "4",
            title: "HTML and CSS",
            img:
              "/assets/data/html_css.jpeg",
          },
          {
            id: "5",
            title: "React JS",
            img:
              "/assets/data/react.png",
          },
    ];

    return (
        <div className="portfolio" id="portfolio">
            <h1>Portfolio</h1>
            <div className="container"> 
                {list.map((d)=> (
                    <div className="item">
                        <img src={d.img}  alt="" />
                        <h3>{d.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
