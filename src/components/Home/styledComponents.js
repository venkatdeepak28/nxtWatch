import styled from 'styled-components'

export const HomepageContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
`
export const BannerContainer = styled.div`
  width: 100%;
  height: 35vh;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  background-position: center;
  margin-top: 1%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  @media (max-width: 767px) {
    width: 126%;
    height: 26vh;
  }
`
export const BannerInnerContainer = styled.div`
  margin-left: 5%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  height: 25vh;
  width: 30vw;
  font-size: 20px;
  font-family: 'Roboto';
  margin-top: 2%;
`
export const BannerLogo = styled.img`
  height: 40px;
`
export const BannerButton = styled.button`
  background-color: transparent;
  font-family: 'Roboto';
  padding: 12px;
`

export const LightVideoContainer = styled.div`
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 2%;
  @media (max-width: 767px) {
    width: 99vw;
  }
`
export const DarkVideoContainer = styled(LightVideoContainer)`
  background-color: #181818;
  color: white;
`
export const LightInputEl = styled.input`
  margin-left: 2%;
  border: 2px solid #909090;
  padding: 8px;
  width: 30vw;
  font-family: 'Roboto';
  font-weight: bold;
  margin-right: 0;
`
export const DarkInputEl = styled(LightInputEl)`
  background-color: #0f0f0f;
  color: white;
`
export const LightSearchButton = styled.button`
  margin-left: 0;
  padding: 6px;
  width: 4vw;
  padding-left: 0;
  height: 4vh;
  border: 2px solid #909090;
  border-left: 0;
`
export const DarkSearchButton = styled(LightSearchButton)`
  background-color: #181818;
  color: white;
`
export const VideoListContainer = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin-top: 2%;
  max-width: 75vw;
  @media (max-width: 767px) {
    max-width: 82vw;
  }
`
export const VideoListEl = styled.li`
  margin-right: 6%;
  margin-bottom: 16px;
  width: 20vw;
  @media (max-width: 767px) {
    width: 35vw;
  }
`
export const VideoThumbnail = styled.img`
  height: 170px;
  @media (max-width: 767px) {
    height: 120px;
  }
`
export const ChannelDetailsCon = styled.div`
  display: flex;
  width: 23vw;
`
export const ChannelLogo = styled.img`
  height: 50px;
  margin-top: 2%;
  margin-right: 3%;
`
