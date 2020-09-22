import React from 'react';
import countries from './Countries';
import states from './States';
import './App.css';

export default class AutoCompletedText extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            
            suggestions: [],
            suggestions1:[],
            text: ''
        }
    }

    onTextChange = (e) => {
        const value = e.target.value;
        let suggestions = [];
        let suggestions1 = [];
        if(value.length > 0){
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = countries.sort().filter(v => regex.test(v))
            suggestions1 = states.sort().filter(v => regex.test(v))
        }

        this.setState(() => ({
            suggestions,suggestions1,
            text: value
        }))
    }

    selectedText(value) {
        this.setState(() => ({
            text: value,
            suggestions: [],
            suggestions1: [],
        }))
    }

    renderSuggestions = () => {
        let { suggestions } = this.state;
        let {suggestions1 } = this.state;
        if(suggestions.length === 0 || suggestions1.length === 0){
            return null;
        }
        else{
        return (
            <ul >
                {
                    suggestions.map((item, index) => (<li key={index} onClick={() => this.selectedText(item)}>{item}</li>))
                }

            
            {
                suggestions1.map((item, index) => (<li key={index} onClick={() => this.selectedText(item)}>{item}</li>))
            }

        </ul>
        );
        }
    }
    
    render() {
        const { text, suggestions,suggestions1 } = this.state;
        return(
            
             <div id="notebooks">
                <h2>Countries and States of India <strong>First Letter</strong> Auto Complete</h2>
                <input id="query" type="text" onChange={this.onTextChange} value={text}/>
                
                {this.renderSuggestions()}
                <br></br>
                <br></br><br></br>
                <br></br>
                <span>Country Suggestions: {suggestions.length}<br></br><br></br>
                 States of India Suggestions: {suggestions1.length}</span>
             </div>
            
        );
    }

}