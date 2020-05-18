import React from "react"

class MemeGen extends React.Component {
    constructor() {
        super()
        this.state = {
            topText : " ",
            buttomText : " ",
            randomImage : "http://i.imgflip.com/1bij.jpg"
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    componentDidMount() {
        let proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        let targetUrl = 'http://api.imgflip.com/get_memes'

        fetch(proxyUrl + targetUrl)
        .then(response => response.json())
        .then(response => {
            const {memes} = response.data
            // console.log(memes[0])
                this.setState({
                    allMemeImgs : memes
                })
        })
           
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name] : value
        })
    }


    handleSubmit(event) {
        event.preventDefault()
        const randomNum = Math.floor(Math.random() * this.state.allMemeImgs.length )

        const randomMemeImage = this.state.allMemeImgs[randomNum].url

        this.setState({
            randomImage : randomMemeImage
        })
    }

    render() {
        return(
            <div className="main-content"> 
                <form className="meme-form" onSubmit={this.handleSubmit}>

                    <label>
                    Top Text
                        <input 
                            type="text"
                            name="topText"
                            placeholder="Top Text"
                            value={this.state.topText}
                            onChange={this.handleChange}
                        />
                    </label>

                    <label>
                    Buttom Text
                        <input
                            type="text"
                            name="buttomText"
                            placeholder="Buttom Text"
                            value={this.state.buttomText}
                            onChange={this.handleChange}    
                        />  
                    </label>

                    <button >Gen</button>

                </form>

               
                <div className="meme">
                    <img src={this.state.randomImage} alt="Random?"/>
                    <h2 className="Top">{this.state.topText}</h2>
                    <h2 className="Buttom">{this.state.buttomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGen