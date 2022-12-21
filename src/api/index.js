import { userLogin, sendVC, getInfo, getUserChannel } from './user'
import { getArtByChan } from './article'
import { getRecoChan, syncPerChan, remPerChan } from './channel'
import { getSuggestions, getResultBykw } from './search'
export const userLoginAPI = userLogin
export const sendVCAPI = sendVC
export const getInfoVCAPI = getInfo
export const getUserChannelAPI = getUserChannel
export const getArtByChanAPI = getArtByChan
export const getRecoChanAPI = getRecoChan
export const syncPerChanAPI = syncPerChan
export const remPerChanAPI = remPerChan
export const getSuggestionsAPI = getSuggestions
export const getResultBykwAPI = getResultBykw
