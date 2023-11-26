import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class Home extends Component {
  state = {travelList: [], isLoading: true}

  componentDidMount() {
    this.getTravelListApiCall()
  }

  getTravelListApiCall = async () => {
    this.setState({isLoading: true})
    const url = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    const formattedData = data.packages.map(eachItem => ({
      ...eachItem,
      imageUrl: eachItem.image_url,
    }))
    this.setState({isLoading: false, travelList: formattedData})
  }

  render() {
    const {travelList, isLoading} = this.state
    return (
      <div className="bg-cont">
        <h1 className="main-head">Travel Guide</h1>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <ul className="travels-list">
            {travelList.map(eachItem => (
              <li key={eachItem.id} className="list-item">
                <img
                  className="img"
                  src={eachItem.imageUrl}
                  alt={eachItem.name}
                />
                <div className="text-cont">
                  <h1 className="card-head">{eachItem.name}</h1>
                  <p className="card-para">{eachItem.description}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}
export default Home
