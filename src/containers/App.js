import React, {Component} from 'react';
import SearchBox from '../components/SearchBox';
import CardList from '../components/CardList';
import './App.css';
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry';

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchField: ''        
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users').then(response => {
            return response.json();
        })
        .then(users => {
            this.setState({robots: users});
        })
        
    }

    onSearchChange = (event) => {
        this.setState({ searchField: event.target.value })
        
    }

    render() {
        // this.state mozna uzywac przed robots, np this.state.robots.filter() lub ustawic const
        const { robots, searchField } = this.state
        const filteredRobots = robots.filter(robot =>{
        return robot.name.toLowerCase().includes(searchField.toLowerCase())    
        })

        // zamiast if.lenght === 0 mozna zrobic !robots.length i bedzie to samo
        // zamiast if else mozna dac ? jako if na koncu zdania oraz : jako else na koncu
        // zdania za return <h1>Loading</h1>
        if (robots.lenght === 0) {
            return <h1>Loading</h1>
        } else {
            return (
                <div className='f4 tc'>    
                    <h1>Robo Friends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundry>    
                    </Scroll>
                </div>    
            );

        }
    }    
}

export default App;