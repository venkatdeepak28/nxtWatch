import styled from 'styled-components'

export const HomepageContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
`
export const LightVideoContainer = styled.div`
  background-color: #f9f9f9;
`
export const DarkVideoContainer = styled(LightVideoContainer)`
  background-color: #0f0f0f;
  color: white;
`
export const LightTrendingContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-bottom: 2%;
`
export const DarkTrendingContainer = styled(LightTrendingContainer)`
  background-color: #212121;
  color: white;
`

export const TrendingHeading = styled.h1`
  margin-left: 2%;
`
export const DarkVideoListContainter = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin-left: 0;
  padding-top: 3%;
  max-width: 82vw;
  background-color: #0f0f0f;
  padding-left: 5%;
`
export const LightVideoListContainter = styled(DarkVideoListContainter)`
  background-color: #f4f4f4;
`

export const VideoListEl = styled.li`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  margin-right: 4%;
`
export const VideoThumbnail = styled.img`
  height: 50vh;
`
export const ChannelDetailsCont = styled.div`
  width: 20vw;
  margin-left: 5%;
  margin-left: 0;
`
