class Slider extends React.Component{
    constructor(props) {
        super(props);
        this.state = { items: [], curentSlide: 0};
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.handleNavigate = this.handleNavigate.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
    }




    render(){
        return(
            <div className="slider" onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave}>
                <button className="left-control" onClick={this.handlePrev}></button>
                <button className="right-control" onClick={this.handleNext}></button>
                    <div className="item-list" style={{'transform': 'translate(-'+this.state.curentSlide*100+'%)'}}>
                        {this.props.items.map(item => (
                            <div className='item' key={item.id}>
                                <img src={item.img} alt={item.text}/>
                                <h3 className='item-text'>{item.text}</h3>
                            </div>
                        ))}                    
                    </div> 
                <ul className="navigate-slide">
                                {this.props.items.map(item=> (
                                    <li className='slide-icon' key={item.id} onClick={this.handleNavigate}>
                                        <img src={item.img} alt={item.text}/>
                                    </li>
                                ))}
                </ul>
            </div>
        )
    }

    handleNext(e) {
        if(this.state.curentSlide >= this.props.items.length-1){
            this.setState({curentSlide: 0});
        }
        else{this.setState(state =>({
            curentSlide: state.curentSlide + 1
        }));}
    }
    handlePrev(e) {
        if(this.state.curentSlide <= 0){
            this.setState({curentSlide: this.props.items.length-1});
        }
        else{this.setState(state =>({
            curentSlide: state.curentSlide - 1
        }));}
    }
    handleNavigate(e) {
        let btn = e.target.parentElement
        let btnId = Array.of(...btn.parentElement.children).indexOf(btn);
        if(btnId == this.state.curentSlide){
            return;
        }
        this.setState({curentSlide: btnId});
        console.log(btnId)
    }

    handleEnter(){
        clearInterval(this.interval);
    }
    handleLeave(){
        this.interval = setInterval(() => this.handleNext(), 3000);
    }


    componentDidMount() {
        this.interval = setInterval(() => this.handleNext(), 3000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
}



let items = [
    {
        id:1,
        img:'1.jpg',
        text:'first slide',
    },
    {
        id:2,
        img:'2.jpg',
        text:'second slide',
    },
    {
        id:3,
        img:'3.jpg',
        text:'third slide',
    },
    {
        id:4,
        img:'4.jpg',
        text:'fourth slide',
    },
]



ReactDOM.render(
    <Slider items={items}/>,
    document.getElementById('root')
)