import {Switch, Route, withRouter, Redirect} from 'react-router-dom'
import {Component} from 'react'

import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoDetails from './components/VideoDetails'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import LanguageContext from './context/NxtWatchContext'

import './App.css'

// Replace your code here
class App extends Component {
  state = {
    activeTheme: 'LI',
    sidebarSelection: 'home',
    savedVideosList: [],
    updatedLikeArr: [],
    updatedDislikeArr: [],
  }

  componentDidMount() {
    const {history} = this.props
    const str = history.location.pathname
    if (str === '/') {
      this.setState({sidebarSelection: 'home'})
    } else {
      const value = str.slice(1, str.length)
      if (
        value !== '' &&
        ['trending', 'gaming', 'saved-videos'].includes(value)
      ) {
        this.setState({sidebarSelection: value})
      }
    }
  }

  changeTheme = () => {
    const {activeTheme} = this.state
    if (activeTheme === 'LI') {
      this.setState({activeTheme: 'DK'})
    } else {
      this.setState({activeTheme: 'LI'})
    }
  }

  changeValue = value => {
    this.setState({sidebarSelection: value})
  }

  updateLikedVideos = obj => {
    const {updatedLikeArr, updatedDislikeArr} = this.state
    const check = updatedLikeArr.some(eachValue => eachValue.id === obj.id)
    const checkDisliked = updatedDislikeArr.some(
      eachValue => eachValue.id === obj.id,
    )

    if (check === false) {
      const updateArr = [...updatedLikeArr, obj]
      if (checkDisliked === true) {
        const filterArr = updatedDislikeArr.filter(
          eachValue => eachValue.id !== obj.id,
        )
        this.setState({updatedLikeArr: updateArr, updatedDislikeArr: filterArr})
      }
      this.setState({updatedLikeArr: updateArr})
    } else {
      const filterLikedArr = updatedLikeArr.filter(
        eachValue => eachValue.id !== obj.id,
      )

      this.setState({updatedLikeArr: filterLikedArr})
    }
  }

  updateDislikedVideos = obj => {
    const {updatedLikeArr, updatedDislikeArr} = this.state
    const check = updatedDislikeArr.some(eachValue => eachValue.id === obj.id)
    const checkLiked = updatedLikeArr.some(eachValue => eachValue.id === obj.id)

    if (check === false) {
      const updatedArr = [...updatedDislikeArr, obj]
      if (checkLiked === true) {
        const filteredArr = updatedLikeArr.filter(
          eachValue => eachValue.id !== obj.id,
        )
        console.log(updatedArr)
        this.setState({
          updatedDislikeArr: updatedArr,
          updatedLikeArr: filteredArr,
        })
      }
      this.setState({updatedDislikeArr: updatedArr})
    } else {
      const filterDislikedArr = updatedDislikeArr.filter(
        eachValue => eachValue.id !== obj.id,
      )
      this.setState({updatedDislikeArr: filterDislikedArr})
    }
  }

  updateSavedVideos = obj => {
    const {savedVideosList} = this.state
    const check = savedVideosList.some(eachValue => eachValue.id === obj.id)
    if (check === false) {
      const updatedArr = [...savedVideosList, obj]
      this.setState({savedVideosList: updatedArr})
    } else {
      const filteredArr = savedVideosList.filter(
        eachValue => eachValue.id !== obj.id,
      )
      this.setState({savedVideosList: filteredArr})
    }
  }

  render() {
    const {
      activeTheme,
      sidebarSelection,
      savedVideosList,
      updatedLikeArr,
      updatedDislikeArr,
    } = this.state

    return (
      <LanguageContext.Provider
        value={{
          activeTheme,
          sidebarSelection,
          savedVideosList,
          updatedLikeArr,
          updatedDislikeArr,
          changeTheme: this.changeTheme,
          changeValue: this.changeValue,
          updateLikedVideos: this.updateLikedVideos,
          updateDislikedVideos: this.updateDislikedVideos,
          updateSavedVideos: this.updateSavedVideos,
        }}
      >
        <Switch>
          <Route path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute exact path="/videos/:id" component={VideoDetails} />
          <ProtectedRoute path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </LanguageContext.Provider>
    )
  }
}

export default withRouter(App)
