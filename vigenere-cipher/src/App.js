import React, {Component} from 'react';
import './App.css';

class App extends Component {
    SPACE = 32;
    TILDE = 126;
    canvasRef;

    constructor(props) {
        super(props);
        this.state = {
            cipher: "",
            plain: "",
            key: ""
        }
        this.canvasRef = React.createRef();
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    encrypt = () => {
        const plain = this.state.plain;
        const key = this.state.key;
        const keySize = key.length;
        let cipher = "";

        if (key === "") {
            alert("Please enter your key!");
            return;
        }
        for (let index = 0; index < plain.length; index++) {
            const k = key.charCodeAt(index % keySize);
            const p = plain.charCodeAt(index);

            if (k > this.TILDE || k < this.SPACE) {
                alert("Invalid input: key contains illegal characters");
                return;
            }
            if (p > this.TILDE) {
                alert("Invalid input: plain text contains illegal characters");
                return;
            }

            if (p >= this.SPACE) {
                let c = k + p - this.SPACE;
                if (c > this.TILDE) {
                    c -= this.TILDE - this.SPACE;
                }
                cipher += String.fromCharCode(c);
            } else {
                cipher += String.fromCharCode(p);
            }
        }
        this.setState({
            cipher: cipher
        });
    }

    decipher = () => {

    }

    onChangeCipher = (event) => {
        this.setState({
            cipher: event.target.value
        });
    }

    onChangeKey = (event) => {
        this.setState({
            key: event.target.value
        })
    }

    onChangePlain = (event) => {
        this.setState({
            plain: event.target.value
        });
    }

    render() {
        return (
            <div className="App">
                <header className="App-title">
                    <h1>
                        Vigenere Cipher
                    </h1>
                </header>
                <body>
                    <textarea value={this.state.plain} onChange={this.onChangePlain}></textarea>
                    <textarea value={this.state.key} onChange={this.onChangeKey}/>
                    <textarea value={this.state.cipher} onChange={this.onChangeCipher}></textarea>
                    <break/>
                    <button onClick={this.encrypt}>encrypt</button>
                    <button onClick={this.decipher}>decipher</button>
                </body>
            </div>
        );
    }
}

export default App;