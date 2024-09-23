import React from 'react'

const LanguageContext = React.createContext({
  activeTheme: 'LT',
  sidebarSelection: 'home',
  savedVideosList: [],
  updatedLikeArr: [],
  updatedDislikeArr: [],
  changeTheme: () => {},
  changeValue: () => {},
  updateLikedVideos: () => {},
})

export default LanguageContext
