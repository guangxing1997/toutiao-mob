import { userLogin, sendVC, getInfo, getUserChannel, cancelFocus, addFocus, cancelCol, addCol, cancelLike, addLike, getUserProfile, updateUserProfile, updateUserPhoto } from './user'
import { getArtByChan, getArtById } from './article'
import { getRecoChan, syncPerChan, remPerChan } from './channel'
import { getSuggestions, getResultBykw } from './search'
import { getComments, addCommentLike, deleteCommentLike, addComment } from './comment'
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
export const getArtByIdAPI = getArtById
export const cancelFocusAPI = cancelFocus
export const addFocusAPI = addFocus
export const cancelColAPI = cancelCol
export const addColAPI = addCol
export const cancelLikeAPI = cancelLike
export const addLikeAPI = addLike
export const getCommentsAPI = getComments
export const addCommentLikeAPI = addCommentLike
export const deleteCommentLikeAPI = deleteCommentLike
export const addCommentAPI = addComment
export const getUserProfileAPI = getUserProfile
export const updateUserProfileAPI = updateUserProfile
export const updateUserPhotoAPI = updateUserPhoto
