import { useState } from "react";
import "./works.scss"
export default function Works() {
  const data = [
    {
      id: "1",
      icon: "./assets/game.png",
      title: "Snake Game",
      desc:
        "I made a classic snake game using the pygame library in python. Feel free to check it out the github repo",
      img:"./assets/data/snake.png",
      link:"https://github.com/fasihere/snake-game"
    },
    {
      id: "2",
      icon: "./assets/game.png",
      title: "Sudoku Game",
      desc:
        "I made a sudoku game using the pygame library in python. If you get stuck, keep calm, click the solve button and my algorithm solves it for you!",
      img:"./assets/data/sudoku.png",
      link:"https://github.com/fasihere/sudoku-game"
    },
    {
      id: "3",
      icon: "./assets/product.png",
      title: "Explorer Robot",
      desc:
        "This is a walking robot designed using the Jansen linkage mechanism, done in a team of four as part of an Engineering Design core course",
      img:
        "./assets/data/product.jpg",
        link: "https://github.com/fasihere/Walking-Robot-Design/blob/main/Just%20a%20robot.pdf"
    },
    {
      id: "3",
      icon: "./assets/product.png",
      title: "Logistic Regression (Data Science)",
      desc:
        "This is a logistic regression project, done as part of an IITM data science intro course",
      img:
        "./assets/data/lr.svg",
      link: "https://github.com/fasihere/MFDS-lr-project"
    },
  ];
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleClick = (way) => {
        way === 'left' 
        ? setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : 2)
        : setCurrentSlide(currentSlide < data.length - 1 ? currentSlide + 1 : 0)
    };
    return (
        <div className="works" id="works">
            <div className="slider" style={{ transform: `translateX(-${currentSlide * 100}vw)` }}>
                {data.map((d)=>(<div className="container">
                    <div className="item">
                        <div className="left">
                            <div className="leftContainer">
                                <div className="imgContainer">
                                    <img src={d.icon} alt="" />
                                </div>
                                <h2>{d.title}</h2>
                                <p>{d.desc}</p>
                                <a href={d.link} target="_blank" rel="noopener noreferrer"><span>View Project</span></a>
                            </div>
                        </div>
                        <div className="right">
                            <img src={d.img} alt="" />
                        </div>
                    </div>
                </div>))}
            </div>
            <img src="assets/arrow.png" 
            className="arrow left" 
            alt="" 
            onClick={() => handleClick("left")}
            />
            <img src="assets/arrow.png" 
            className="arrow right" 
            alt="" 
            onClick={() => handleClick()}
            />
        </div> 
    );
}
